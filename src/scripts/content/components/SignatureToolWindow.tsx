import React, { useEffect, useState } from 'react';
import Window from './Window';
import { logger } from "../../common/logger"

import "./SignatureToolWindow.css"
import "./PreviewWindow.css"    // it is a bad hack, but let's release earlier and refactor later.

function SignatureToolWindow(props: { onClose: () => void }) {
    const { onClose } = props;
    const [results, setResults] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');
    const [curUrl, setCurUrl] = useState("");

    useEffect(() => {
        if (curUrl == "") // first load, do nothing.
            return;

        setLoading(true);
        setErrorMsg('');

        fetch(curUrl, {
            "credentials": "omit",
            "mode": "cors"
        })
            .then(response => {
                if (response.ok)
                    return response.json();
                throw `error: ${response.status} is returned`;
            })
            .then(data => {
                setLoading(false);
                setResults(data.results);
                setPrevUrl(data.previous ?? "");
                setNextUrl(data.next ?? "");
            })
            .catch(error => {
                logger.error(error);
                setErrorMsg('Error loading signatures');
                setLoading(false);
            });
    }, [curUrl]);

    const searchClick = function () {
        const params = new URLSearchParams();
        params.append('format', 'json');
        params.append('hex_signature', searchTerm);
        setCurUrl(`https://www.4byte.directory/api/v1/signatures/?${params.toString()}`);
    };

    return (
        <Window
            onClose={onClose} height={390} width={430}
            minConstraints={[270, 230]}
            cancel=".signatureTableDiv,.inputSearch,.searchSigButton">

            <header className='headerPreview'>
                <span>Search Ethereum signature database</span>
            </header>

            <div className='searchBarDiv'>
                <input className='inputSearch' type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="0xa9059cbb" />
                <button className='searchSigButton' onClick={searchClick}>Search</button>
            </div>

            {(loading || errorMsg != "") && <div className='msgSignatureDiv'>{loading ? "Loading signatures..." : errorMsg}</div>}

            {!loading && results != null &&
                <>
                    <div className='signatureTableDiv'>
                        <table>
                            <thead>
                                <tr className="previewTr">
                                    <th className='prTh'>Text Signature</th>
                                    <th className='prTh'>Bytes Signature</th>
                                </tr>
                            </thead>

                            <tbody>
                                {results.map(row =>
                                    <tr key={row.id} className="previewTr">
                                        <td className='tdPreview'>{row.text_signature}</td>
                                        <td className='tdPreview'>{row.hex_signature}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className='signBottomPanel'>
                        {prevUrl != "" && <a href="#" className='pagingLink' onClick={() => setCurUrl(prevUrl)}>Prev</a>}
                        {nextUrl != "" && <a href="#" className='pagingLink' onClick={() => setCurUrl(nextUrl)}>Next</a>}
                    </div>
                </>
            }
        </Window>
    );
}

export default SignatureToolWindow;
