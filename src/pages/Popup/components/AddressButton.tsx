import React from 'react';
import "./AddressButton.css"

function AddressButton(props: { address: string }) {
    const { address } = props;

    return (
        <button onClick={() => navigator.clipboard.writeText(address)
        } className="copyBtn" title="Copy address to clipboard" > <img src="icons/copy.svg" /></button >
    );
}

export default AddressButton;
