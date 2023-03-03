import React, { useState, useEffect, useRef } from "react";
import { CommandToolbar } from "../CommandToolbar";
import TableSchemaWindow from "./TableSchemaWindow";
import { DuneTableSchema } from "../../common/DuneTableSchema";
import { DuneTablePreview } from "../../common/DuneTablePreview";
import PreviewWindow from "./PreviewWindow";

function App() {
    const toolbar = useRef<CommandToolbar>(new CommandToolbar());

    const [tableSchema, setTableSchema] = useState<DuneTableSchema | null>(null);
    const [tablePreview, setTablePreview] = useState<DuneTablePreview | null>(null);

    const handleMessage = (event: any) => {
        if (event.source !== window)
            return;


        switch (event.data.evt) {
            case "schemaReceived":
                if (event.data.rawData && event.data.tableName) {
                    const duneTable = new DuneTableSchema(event.data.tableName, event.data.rawData);
                    setTableSchema(duneTable);
                }
                break;

            case "previewReceived":
                if (event.data.tableName) {
                    const preview = new DuneTablePreview(event.data.tableName, event.data.rawData, event.data.error != null);
                    setTablePreview(preview);
                }
                break;

            case "lexemChanged":
                if (toolbar.current != null)
                    toolbar.current.lexemButtonsEnabled = !(event.data.lexem == null || event.data.lexem == "");
                break;
        }

    };

    const initToolbar = function () {
        toolbar.current.addCommand("Schema (ctrl-s)", "schema");
        toolbar.current.addCommand("Preview (ctrl-p)", "preview");
        toolbar.current.initAndAttachButtons();
    };

    useEffect(() => {
        initToolbar();
        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return (
        <>
            {tableSchema && <TableSchemaWindow table={tableSchema} onClose={() => setTableSchema(null)} />}
            {tablePreview && <PreviewWindow preview={tablePreview} onClose={() => setTablePreview(null)} />}
        </>
    );
}

export default App;
