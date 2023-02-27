import React from 'react';
import Window from './Window';

import "./PreviewWindow.css"

function PreviewWindow(props: { onClose: () => void }) {
    const { onClose } = props;

    return (
        <Window onClose={onClose} maxConstraints={[1200, 1200]}>
            <div className='tablePreviewHover'>

                <header className="headerPreview">
                    <div>
                        <div>
                            <a className="aPreview" href="#"><span>Table preview</span><span>arbitrum.blocks</span></a>
                        </div>
                    </div>
                </header>

                {/* visual result */}
                <div>
                    <table className='previewTable'>
                        <thead>
                            <tr>
                                <th><button type="button" title="Toggle SortBy" className='previewHeaderBtn'><div>time</div></button></th>
                                <th><button type="button" title="Toggle SortBy" className='previewHeaderBtn'><div>time</div></button></th>
                                <th><button type="button" title="Toggle SortBy" className='previewHeaderBtn'><div>time</div></button></th>
                                <th><button type="button" title="Toggle SortBy" className='previewHeaderBtn'><div>time</div></button></th>
                                <th><button type="button" title="Toggle SortBy" className='previewHeaderBtn'><div>time</div></button></th>
                                <th><button type="button" title="Toggle SortBy" className='previewHeaderBtn'><div>time</div></button></th>
                                <th><button type="button" title="Toggle SortBy" className='previewHeaderBtn'><div>time</div></button></th>
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
            </div>
        </Window>
    );
}

export default PreviewWindow;
