import React from "react";
import "./style.css";

export default function (props : ITextMessageProps) {
    return (
        <div className="text-message">
            <p>{props.text}</p>
        </div>
    )
}

interface ITextMessageProps {
    text: string
}