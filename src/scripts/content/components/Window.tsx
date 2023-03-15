import React, { createRef, useRef } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import "./Window.css"

function Window(props: {
    maxConstraints?: [number, number];
    minConstraints?: [number, number];
    height?: number;
    width?: number;
    onClose: () => void;
    children?: React.ReactNode;
    cancel?: string;
}) {

    return (
        <span id="DuneExtResizable">
            <Draggable
                cancel={".react-resizable-handle" + ((props.cancel ?? "").length != 0 ? "," + props.cancel : "")}
                onMouseDown={function (evt) {
                    if (!evt.currentTarget) {
                        return;
                    }
                    // here div is the component Draggable renders to.
                    // Next we set zIndex of all windows to 100000 except current (set to 100001)
                    const div = evt.currentTarget as any;
                    const allWindows = (document.getElementsByClassName("react-draggable react-draggable-dragged react-resizable") as unknown) as any[];
                    for (let i = 0; i < allWindows.length; i++) {
                        const currentWindow = allWindows[i];
                        currentWindow.style.zIndex = currentWindow == div ? 100001 : 100000;
                    }
                }}
            >

                <ResizableBox
                    width={props.width ?? 200}
                    height={props.height ?? 200}
                    minConstraints={props.minConstraints ?? [100, 100]}
                    maxConstraints={props.maxConstraints}>
                    <>
                        <div className='windowHeader' >
                            <button className="closeBtn" onClick={props.onClose}>[x]</button>
                        </div>

                        <div className='containerDivWindow'>
                            {props.children}
                        </div>
                    </>
                </ResizableBox >

            </Draggable >
        </span>
    );
}

export default Window;
