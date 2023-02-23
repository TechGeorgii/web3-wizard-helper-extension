import React from 'react';
import { DuneTableColumn } from "../../common/DuneTable";

import "../../../static/schemaTable.css"

class SchemaListItem extends React.Component<{ column: DuneTableColumn }> {
    render() {
        const { column } = this.props;

        return (
            <li className='schemaLI'>
                <button className='colBtn'>
                    {column.column_name}
                    <span className='leftSpan' />
                    <span className="typeSpan">{column.data_type}</span>
                </button>
            </li>
        );
    }
}

export default SchemaListItem;
