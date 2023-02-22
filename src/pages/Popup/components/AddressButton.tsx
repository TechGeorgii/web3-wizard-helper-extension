import React from 'react';
import "../../../static/popup.css"

class AddressButton extends React.Component<{ address: string }> {
    render() {
        const { address } = this.props;

        return (
            <button onClick={() => navigator.clipboard.writeText(address)} className="copyBtn" title="Copy address to clipboard"><img src="icons/copy.svg" /></button>
        );
    }
}

export default AddressButton;
