import React from 'react';
import { DuneTableColumn } from "../../common/DuneTableSchema";

import "./SchemaListItem.css"

class SchemaListItem extends React.Component<{ column: DuneTableColumn }> {
    render() {
        const { column } = this.props;

        return (
            <li className='schemaLI'>
                <button
                    className='colBtn' title='Click to copy column name to clipboard'
                    onClick={() => navigator.clipboard.writeText(column.column_name ?? "")}>
                    {column.column_name}
                    <span className='leftSpan' />
                    <span className="typeSpan">{column.data_type}</span>
                </button>
            </li>
        );
    }
}

export default SchemaListItem;
