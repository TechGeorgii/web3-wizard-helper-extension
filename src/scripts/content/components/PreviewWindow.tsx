import React from 'react';
import Window from './Window';

import "./PreviewWindow.css"
import { DuneTablePreview } from '../../common/DuneTablePreview';

function PreviewWindow(props: { onClose: () => void, preview: DuneTablePreview }) {
    const { onClose } = props;
    const { columns, data, tableName, error, loading } = props.preview;

    return (
        <Window onClose={onClose}
            cancel=".previewTable,.headerPreview"
            maxConstraints={[1200, 415]} minConstraints={[230, 170]}
            width={550} height={415} >
            <div className='tablePreviewHover'>
                <header className="headerPreview">
                    <span className='tablePreviewSpan'>Table preview</span>
                    <span>{tableName}</span>
                </header>

                {columns && data &&
                    <>
                        <div className='tableContainer'>
                            <table className='previewTable'>
                                <thead>
                                    <tr className="previewTr">
                                        {columns.map(col => <th key={col} className="prTh">{col}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array(data.length).fill(0).map((_, i) => i).
                                        map(i =>
                                            <tr key={i} className="previewTr">
                                                {columns.map(col =>
                                                    <td key={col} role="cell" className='tdPreview'>
                                                        {data[i][col]}
                                                    </td>)}
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className='bottomDiv'>
                            <div className='rowsCntDiv'>{data.length} rows</div>
                        </div>
                    </>
                }

                {!(columns && data) && <div className="messageDiv">
                    {loading ? "Loading..." : (error ?? "Cannot load preview. Network error or table does not exist")}
                </div>}
            </div>
        </Window >
    );
}

export default PreviewWindow;
