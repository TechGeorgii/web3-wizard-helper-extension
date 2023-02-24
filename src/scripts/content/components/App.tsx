import React, { useState, useEffect, useRef } from "react";
import { CommandToolbar } from "../CommandToolbar";
import TableSchema from "../components/TableSchema";
import DuneTable from "../../common/DuneTable";

function App() {
    const toolbar = useRef<CommandToolbar>(new CommandToolbar());

    const [duneTable, setDuneTable] = useState<DuneTable | null>(null);

    const handleMessage = (event: any) => {
        if (event.source !== window || event.data.evt !== "schemaReceived"
            || !event.data.rawData
            || !event.data.tableName) {
            return;
        }
        const duneTable = new DuneTable(event.data.tableName, event.data.rawData);
        setDuneTable(duneTable);
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

    function handleClose(): void {
        setDuneTable(null);
    }

    return (
        <>
            {duneTable && <TableSchema table={duneTable} onClose={handleClose} />}
        </>
    );
}

export default App;
