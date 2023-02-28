import React from 'react';
import Window from './Window';

import "./PreviewWindow.css"

function PreviewWindow(props: { onClose: () => void }) {
    const { onClose } = props;

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
                                <th>time</th>
                                <th>time</th>
                                <th>time</th>
                                <th>time</th>
                                <th>time</th>
                                <th>time</th>
                                <th>time</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td role="cell"><div>2021-07-17 03:18</div></td>
                                <td role="cell"><div>2021-07-17 03:18</div></td>
                                <td role="cell"><div>2021-07-17 03:18</div></td>
                                <td role="cell"><div>121212</div></td>
                                <td role="cell"><div>121212</div></td>
                                <td role="cell"><div>Hello</div></td>
                                <td role="cell"><div>World</div></td>
                            </tr>
                            <tr>
                                <td role="cell"><div>2021-07-17 03:18</div></td>
                                <td role="cell"><div>2021-07-17 03:18</div></td>
                                <td role="cell"><div>2021-07-17 03:18</div></td>
                                <td role="cell"><div>121212</div></td>
                                <td role="cell"><div>121212</div></td>
                                <td role="cell"><div>Hello</div></td>
                                <td role="cell"><div>World</div></td>
                            </tr>
                            <tr>
                                <td role="cell"><div>2021-07-17 03:18</div></td>
                                <td role="cell"><div>2021-07-17 03:18</div></td>
                                <td role="cell"><div>2021-07-17 03:18</div></td>
                                <td role="cell"><div>121212</div></td>
                                <td role="cell"><div>121212</div></td>
                                <td role="cell"><div>Hello</div></td>
                                <td role="cell"><div>World</div></td>
                            </tr>
                            <tr>
                                <td role="cell"><div>2021-07-17 03:18</div></td>
                                <td role="cell"><div>2021-07-17 03:18</div></td>
                                <td role="cell"><div>2021-07-17 03:18</div></td>
                                <td role="cell"><div>121212</div></td>
                                <td role="cell"><div>121212</div></td>
                                <td role="cell"><div>Hello</div></td>
                                <td role="cell"><div>World</div></td>
                            </tr>
                            <tr>
                                <td role="cell"><div>2021-07-17 03:18</div></td>
                                <td role="cell"><div>2021-07-17 03:18</div></td>
                                <td role="cell"><div>2021-07-17 03:18</div></td>
                                <td role="cell"><div>121212</div></td>
                                <td role="cell"><div>121212</div></td>
                                <td role="cell"><div>Hello</div></td>
                                <td role="cell"><div>World</div></td>
                            </tr>
                            <tr>
                                <td role="cell"><div>2021-07-17 03:18</div></td>
                                <td role="cell"><div>2021-07-17 03:18</div></td>
                                <td role="cell"><div>2021-07-17 03:18</div></td>
                                <td role="cell"><div>121212</div></td>
                                <td role="cell"><div>121212</div></td>
                                <td role="cell"><div>Hello</div></td>
                                <td role="cell"><div>World</div></td>
                            </tr>
                            <tr>
                                <td role="cell"><div>2021-07-17 03:18</div></td>
                                <td role="cell"><div>2021-07-17 03:18</div></td>
                                <td role="cell"><div>2021-07-17 03:18</div></td>
                                <td role="cell"><div>121212</div></td>
                                <td role="cell"><div>121212</div></td>
                                <td role="cell"><div>Hello</div></td>
                                <td role="cell"><div>World</div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='rowsCntDiv'>10 rows</div>
            </div>
        </Window>
    );
}

export default PreviewWindow;
