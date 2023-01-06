import React from "react";
import { MessageType } from "../../contexts/modal.context";
import CodeMessage from "../code-message";
import TextMessage from "../text-message";
import "./style.css"

export default function (props: IChatItemProps) {
    const messageComponents : Array<JSX.Element>  = [];
    props.messagesData.forEach((data, index) => {
        switch(data.type) {
            case MessageType.code:
                messageComponents.push(<CodeMessage key={index} languague={data.languague} text={data.text} />)
                break;
            case MessageType.text:
                messageComponents.push(<TextMessage key={index} text={data.text} />)
                break;
        }
    })
    return (
        <div className={"chat-item" + (props.isOwner ? " owner" : "")}>
            <div className="chat-item-wrapper">
                <div className="chat-item-avatar">
                    <img src={props.avatar} />
                </div>
                <div className="chat-item-messages">
                    {messageComponents}
                </div>
            </div>
        </div>
    )
}

interface IChatItemProps {
    isOwner: boolean,
    avatar: string,
    messagesData: Array<IMessageProps>
}

interface IMessageProps {
    type: MessageType,
    languague?: string,
    text: string
}