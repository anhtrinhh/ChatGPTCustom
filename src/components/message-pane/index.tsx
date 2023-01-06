import React, { FormEvent, KeyboardEvent, useEffect, useRef } from "react";
import "./style.css";

export default function (props: IMessagePaneProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const enterKey = "ENTER";
    const shiftKey = "SHIFT";
    let shiftDown = false;

    useEffect(() => {
        if (textareaRef.current)
            handleAutoHeight(textareaRef.current);
    });

    function handleKeyDown(evt: KeyboardEvent<HTMLTextAreaElement>) {
        const key = evt.key;
        const el = evt.target as HTMLTextAreaElement;
        if (key) {
            setTimeout(() => {
                switch (key.toUpperCase()) {
                    case enterKey:
                        if (!shiftDown) {
                            if (props.onSend)
                                props.onSend(el.value);
                            el.value = '';
                        }
                        break;
                    case shiftKey:
                        shiftDown = true;
                        break;
                }
                handleAutoHeight(el);
            }, 0);
        }
    }

    function handleKeyUp(evt: KeyboardEvent<HTMLTextAreaElement>) {
        const key = evt.key;
        if (key) {
            switch (key.toUpperCase()) {
                case shiftKey:
                    shiftDown = false;
                    break;
            }
        }
    }

    function handleOnSubmit(evt : FormEvent) {
        evt.preventDefault();
        if (props.onSend && textareaRef.current){
            props.onSend(textareaRef.current.value);
            textareaRef.current.value = '';
            handleAutoHeight(textareaRef.current);
        }
    }

    function handleAutoHeight(element: HTMLTextAreaElement) {
        element.style.height = "1rem";
        element.style.height = element.scrollHeight + "px";
    }

    return (<form className="message-pane" onSubmit={handleOnSubmit}>
        <div className="message-pane-wrapper">
            <textarea onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                style={{ height: "1rem" }}
                ref={textareaRef}
                defaultValue={props.defaultMessage}
            ></textarea>
            <button>
                <svg viewBox="0 0 24 24">
                    <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"></path>
                </svg>
            </button>
        </div>
    </form>)
}

interface IMessagePaneProps {
    onSend?: OnSendHandler,
    defaultMessage?: string
}

type OnSendHandler = { onSend(message: string): void }["onSend"];