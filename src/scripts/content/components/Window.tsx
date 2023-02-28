import React from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import "./Window.css"

function Window(props: {
    maxConstraints?: [number, number];
    height?: number;
    width?: number;
    onClose: () => void;
    children?: React.ReactNode;
    cancel?: string;
}) {
    return (
        // cancel – append what's passed here to window handle
        <Draggable cancel={".react-resizable-handle" + ((props.cancel ?? "").length != 0 ? "," + props.cancel : "")}>
            <ResizableBox width={props.width ?? 200} height={props.height ?? 200} minConstraints={[100, 100]} maxConstraints={props.maxConstraints ?? [600, 600]}>
                <>
                    <div className='windowHeader' >
                        <button className="closeBtn" onClick={props.onClose}>[x]</button>
                    </div>

                    {props.children}
                </>
            </ResizableBox >
        </Draggable>
    );
}

export default Window;
