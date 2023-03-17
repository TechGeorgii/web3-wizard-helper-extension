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

      <div className="blocksDiv toggleDiv">
        <div>
          {extEnabled && <>If you're experiencing problems – temporarily disable extension and check </>}
        </div>
        <button
          onClick={toggleExtClick}>
          {extEnabled ? "Disable extension" : "Enable extension"}
        </button>

        {showTooltip && (
          <div className="tooltip">{tooltipText}</div>
        )}
      </div>


      <div className="blocksDiv">
        Cheatsheet:

        <ul>
          <li><img src="icons/schema.svg" className="popupCheatsheetImg" /> / ctrl + s – table schema</li>
          <li><img src="icons/preview.svg" className="popupCheatsheetImg" /> / ctrl + p – preview table</li>
        </ul>
      </div>


      <div className="blocksDiv">
        <div>
          <a href="#" onClick={() => { window.open('https://docs.google.com/forms/d/e/1FAIpQLSduytYvhNdmMhJxFmBiCdb9NgRHzm8GMwdPzAReYstowdVdIA/viewform', "_blank") }}>Report bug / request feature</a>
        </div>
      </div>

      <div className="blocksDiv">
        {
          !supportAuthorMode && (
            <div>
              <a href="#" onClick={() => setSupportAuthorMode(true)}>Support author</a>
            </div>)
        }

        {
          supportAuthorMode && (
            <div>
              If Web3 Wizard Helper saves your time, please consider donation

              <ul>
                <li>BTC – <AddressButton address="bc1qq0pz6m0uz0wjyw62x4tperqg5shdm4mz6y85gx" /></li>
                <li>ERC20 – <AddressButton address="0x8866e8533209e4366F2A3bBbCc6f5f479b96cA10" /></li>
                <li>TRC20 – <AddressButton address="TE2SYJ2ka2mezzeQf6suvQkE2P5X7NAoja" /></li>
              </ul>

              Thank you!
            </div>
          )
        }
      </div>

      <div className="blocksDiv">
        <div className="socialDiv">
          <div>
            <a target="_blank" href="https://twitter.com/TechGeorgii"> <img className="socialImg" src="icons/twitter.png" /></a>
          </div>
          <div>
            <a target="_blank" href="https://github.com/TechGeorgii/web3-wizard-helper-extension"> <img className="socialImg" src="icons/github.png" /></a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Popup;
