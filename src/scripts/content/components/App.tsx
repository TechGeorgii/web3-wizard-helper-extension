import React, { useState, useEffect, useRef } from "react";
import { CommandToolbar } from "../CommandToolbar";
import { DuneTableSchema } from "../../common/DuneTableSchema";
import { DuneTablePreview } from "../../common/DuneTablePreview";
import TableSchemaWindow from "./TableSchemaWindow";
import SignatureToolWindow from "./SignatureToolWindow"
import PreviewWindow from "./PreviewWindow";

function App() {
    const toolbar = useRef<CommandToolbar>(new CommandToolbar());

    const [tableSchema, setTableSchema] = useState<DuneTableSchema | null>(null);
    const [tablePreview, setTablePreview] = useState<DuneTablePreview | null>(null);
    const [showSignatureToolWindow, setShowSignatureToolWindow] = useState(false);

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

            case "cmd":
                if (event.data.command == "signature") {
                    setShowSignatureToolWindow(true);
                }
                break;
        }

    };

    const initToolbar = function () {
        toolbar.current.addCommand("Schema (ctrl-s)", "schema");
        toolbar.current.addCommand("Preview (ctrl-p)", "preview");
        toolbar.current.addCommand("Signature tool", "signature", false);
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
            {showSignatureToolWindow && <SignatureToolWindow onClose={() => setShowSignatureToolWindow(false)} />}
        </>
    );
}

export default App;
