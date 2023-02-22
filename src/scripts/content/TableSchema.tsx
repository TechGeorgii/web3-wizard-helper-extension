import React from 'react';
import Draggable from 'react-draggable';
import "../../static/content.css"

class TableSchema extends React.Component<{ text: string }> {
    render() {
        const { text } = this.props;

        return (
            <Draggable handle=".windowHeader">
                <div className='draggableDiv'>
                    <div className='windowHeader'>
                    </div>
                    {text}
                </div >
            </Draggable >
        );
    }
}

export default TableSchema;
