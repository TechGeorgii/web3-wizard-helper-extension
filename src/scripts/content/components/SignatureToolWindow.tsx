import React, { useState } from 'react';
import Window from './Window';
import { logger } from "../../common/logger"

import "./SignatureToolWindow.css"

function SignatureToolWindow(props: { onClose: () => void }) {
    const { onClose } = props;
    const [results, setResults] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const searchClick = function () {
        setLoading(true);
        setErrorMsg('');

        const params = new URLSearchParams();
        params.append('format', 'json');
        params.append('hex_signature', searchTerm);
        fetch(`https://www.4byte.directory/api/v1/signatures/?${params.toString()}`, {
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
            })
            .catch(error => {
                logger.error(error);
                setErrorMsg('Error loading signatures');
                setLoading(false);
            });
    };

    return (
        <Window
            onClose={onClose} height={390} width={320}
            minConstraints={[270, 230]}
            cancel=".signatureTableDiv">

            <header className='headerPreview'>
                <span>Search Ethereum signature database</span>
            </header>

            <div className='searchBarDiv'>
                <input className='inputSearch' type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
                <button className='searchSigButton' onClick={searchClick}>Search</button>
            </div>

            {(loading || errorMsg != "") && <div className='msgSignatureDiv'>{loading ? "Loading signatures..." : errorMsg}</div>}

            {!loading && results != null &&
                <>
                    <div className='signatureTableDiv'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Text Signature</th>
                                    <th>Bytes Signature</th>
                                </tr>
                            </thead>

                            <tbody>
                                {results.map(row =>
                                    <tr key={row.id}>
                                        <td>{row.text_signature}</td>
                                        <td>{row.hex_signature}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className='signBottomPanel'>
                        <a href="#">Prev</a> 1, 2, 3 <a href="#">Next</a>
                    </div>
                </>
            }
        </Window>
    );
}

export default SignatureToolWindow;
