import React from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import "./Window.css"

function Window(props: {
    maxConstraints?: [number, number];
    onClose: () => void;
    children?: React.ReactNode
}) {
    return (
        <Draggable cancel='.react-resizable-handle'>
            <ResizableBox width={200} height={200} minConstraints={[100, 100]} maxConstraints={props.maxConstraints ?? [600, 600]}>
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
