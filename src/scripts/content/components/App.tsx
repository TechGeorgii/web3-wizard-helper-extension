import React, { useState, useEffect, useRef } from "react";
import { CommandToolbar } from "../CommandToolbar";
import TableSchemaWindow from "./TableSchemaWindow";
import DuneTable from "../../common/DuneTable";
import PreviewWindow from "./PreviewWindow";

function App() {
    const toolbar = useRef<CommandToolbar>(new CommandToolbar());

    const [duneTable, setDuneTable] = useState<DuneTable | null>(null);
    const [showPreview, setShowPreview] = useState(false);

    const handleMessage = (event: any) => {
        if (event.source !== window)
            return;


        switch (event.data.evt) {
            case "schemaReceived":
                if (event.data.rawData && event.data.tableName) {
                    const duneTable = new DuneTable(event.data.tableName, event.data.rawData);
                    setDuneTable(duneTable);
                }
                break;

            case "previewReceived":
                setShowPreview(true);
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
            {duneTable && <TableSchemaWindow table={duneTable} onClose={() => setDuneTable(null)} />}
            {showPreview && <PreviewWindow onClose={() => setShowPreview(false)} />}
        </>
    );
}

export default App;
