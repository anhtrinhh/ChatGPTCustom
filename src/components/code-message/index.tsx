import React, { useRef } from "react";
import "./style.css"
import Editor from "@monaco-editor/react";

export default function (props: IChatMessageProps) {
    const timespan = 3000;
    const svgDonePath = "M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z";
    const svgCopyPath = "M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z";
    const svgPathRef = useRef<SVGPathElement>(null);

    function handleCopy(evt: React.MouseEvent) {
        evt.preventDefault();
        if (svgPathRef.current) {
            let svgPathEl = svgPathRef.current as SVGPathElement;
            svgPathEl.setAttribute("d", svgDonePath);
            navigator.clipboard.writeText(props.text);
            setTimeout(() => svgPathEl.setAttribute("d", svgCopyPath), timespan);
        }
    }

    function handleEditorDidMount(editor: any, monaco: any) {
        let height = editor.getContentHeight()
        const lineHeight = 19;
        editor.getDomNode().style.height = `${height}px`;
        editor.layout();
        const viewLinesEls = editor.getDomNode().getElementsByClassName('view-lines');
        if (viewLinesEls) {
            const viewLinesEl = viewLinesEls[0];
            height = viewLinesEl.childElementCount * lineHeight;
            editor.getDomNode().style.height = `${height}px`;
            editor.layout();
        }
    }

    return (
        <div className="code-message">
            <div className="code-messsage-copy">
                <button onClick={handleCopy}>
                    <svg viewBox="0 0 24 24" height="1em" width="1em">
                        <path ref={svgPathRef} d={svgCopyPath}></path>
                    </svg>
                    <span>Copy code</span>
                </button>
            </div>
            <div>
                <Editor onMount={handleEditorDidMount}
                    defaultLanguage={props.languague}
                    theme="vs-dark"
                    defaultValue={props.text}
                    height="100%"
                    options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        wordWrap: "on",
                        contextmenu: false,
                        lineNumbers: "on",
                        folding: true,
                        scrollbar: {
                            handleMouseWheel: false,
                            vertical: "hidden",
                            verticalScrollbarSize: 0
                        }
                    }}
                />
            </div>
        </div>
    )
}

interface IChatMessageProps {
    languague: string,
    text: string
};