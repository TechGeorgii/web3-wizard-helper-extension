import React from 'react';
import Window from './Window';

import "./PreviewWindow.css"

function PreviewWindow(props: { onClose: () => void, columns: string[], data: any }) {
    const { onClose, columns, data } = props;

    return (
        <Window onClose={onClose} cancel=".previewTable,.headerPreview" maxConstraints={[1200, 1200]} height={330} width={550}>
            <div className='tablePreviewHover'>
                <header className="headerPreview">
                    <span className='tablePreviewSpan'>Table preview</span>
                    <span>arbitrum.blocks</span>
                </header>

                <div>
                    <table className='previewTable'>
                        <thead>
                            <tr>
                                {columns.map(col => <th key={col}>{col}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {Array(data.length).fill(0).map((_, i) => i).
                                map(i =>
                                    <tr >
                                        {columns.map(col =>
                                            <td key={col} role="cell">
                                                {data[i][col]}
                                            </td>)}
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

                <div className='rowsCntDiv'>10 rows</div>
            </div>
        </Window>
    );
}

export default PreviewWindow;
