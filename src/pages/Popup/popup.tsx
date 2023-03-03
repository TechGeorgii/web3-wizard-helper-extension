import { useState } from "react";
import React, { MouseEvent } from 'react';
import AddressButton from './components/AddressButton'
import "./popup.css"

function Popup(props: { extEnabled: boolean }) {
  const [supportAuthorMode, setSupportAuthorMode] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState("text tooltip");
  const [extEnabled, setExtEnabled] = useState(props.extEnabled);

  const toggleExtClick = function (event: MouseEvent<HTMLButtonElement>) {
    setShowTooltip(false);

    chrome.storage.local.set({ extEnabled: !extEnabled }).then(() => {
      setExtEnabled(!extEnabled);
    });

    setShowTooltip(true);
    setTooltipText(extEnabled ? "Extension disabled. Reload Dune pages to take effect" : "Extension enabled. Reload Dune pages to take effect")
    setTimeout(() => {
      setShowTooltip(false);
    }, 4000);
  };

  return (
    <>
      <h3>🧙 Web3 Wizard Helper for Dune Analytics</h3>

      {extEnabled && <>If you're experiencing problems – temporarily disable extension and check<br /><br /> </>}
      <button
        onClick={toggleExtClick}>
        {extEnabled ? "Disable extension" : "Enable extension"}
      </button>

      {showTooltip && (
        <div className="tooltip">{tooltipText}</div>
      )}

      <br /><br />

      Cheatsheet:
      <br />
      • <img src="icons/schema.svg" className="popupCheatsheetImg" /> / ctrl + s – table schema <br />
      • <img src="icons/preview.svg" className="popupCheatsheetImg" /> / ctrl + p – preview table <br />

      <br />

      <a href='https://docs.google.com/forms/d/e/1FAIpQLSduytYvhNdmMhJxFmBiCdb9NgRHzm8GMwdPzAReYstowdVdIA/viewform' target="_blank">Report bug / request feature</a>

      <br /><br />

      {
        !supportAuthorMode && (
          <a href="#" onClick={() => setSupportAuthorMode(true)}>Support author</a>)
      }

      {
        supportAuthorMode && (
          <>
            If Web3 Wizard Helper saves your time, please consider donation


            <br /><br />
            • BTC – <AddressButton address="bc1qq0pz6m0uz0wjyw62x4tperqg5shdm4mz6y85gx" />

            <br />
            • ERC20 – <AddressButton address="0x8866e8533209e4366F2A3bBbCc6f5f479b96cA10" />

            <br />
            • TRC20 – <AddressButton address="TE2SYJ2ka2mezzeQf6suvQkE2P5X7NAoja" />

            <br />
            <br />
            Thank you!
            <br />
            &nbsp;
          </>
        )
      }
    </>
  )
}

export default Popup;
