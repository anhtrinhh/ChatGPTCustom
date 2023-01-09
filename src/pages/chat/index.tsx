import { Configuration, OpenAIApi } from "openai";
import React, { MouseEvent, UIEvent, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ChatItem from "../../components/chat-item";
import MessagePane from "../../components/message-pane";
import { MessageType } from "../../contexts/modal.context";
import "./style.css";

export default function () {
    const bottomBtnRef = useRef<HTMLButtonElement>(null);
    const chatItemsDivRef = useRef<HTMLDivElement>(null);
    const params = useParams();
    console.log(params);
    let messagesData = [
        { type: MessageType.text, text: "Hello hello oke." }, {
            type: MessageType.code, languague: "csharp", text: `private static bool CheckEntityHasInDb(OracleConnection connection, string clientCode, DateTime date)
        {
          using (var command = connection.CreateCommand())
          {
            command.CommandText = "SELECT COUNT(*) FROM table WHERE client_code = :clientCode AND date = :date";
            command.Parameters.Add("clientCode", OracleDbType.Varchar2).Value = clientCode;
            command.Parameters.Add("date", OracleDbType.Date).Value = date;
            return (int)command.ExecuteScalar() > 0;
          }
        }`}
    ];

    function handleSend(message: string) {
        console.log(message)
    }

    useEffect(() => {
        if (chatItemsDivRef.current) {
            const chatItemsDiv = chatItemsDivRef.current;
            setTimeout(() => {
                setScrollBottom(chatItemsDiv);
            }, 1000);
        }
        callOpenAIApi().then(res => console.log(res))
    });

    async function callOpenAIApi() {
        const configuration = new Configuration({
            organization: "org-tzBFkHsIBnBtVcQiHhRcchFm",
            apiKey: "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",
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Help me optimize following code: 
            private static int[] GetPartitionsFromConfiguration(string partitionsConfiguration)
        {
            if (!string.IsNullOrEmpty(partitionsConfiguration))
            {
                List<int> partitions = new List<int>();
                partitionsConfiguration = partitionsConfiguration.Replace(" ", string.Empty);
                string[] partitionsArgs = partitionsConfiguration.Split(",");
                foreach (string partitionStr in partitionsArgs)
                {
                    bool rs = int.TryParse(partitionStr, out int partition);
                    if (rs && partition >= 0 && !partitions.Contains(partition))
                        partitions.Add(partition);
                }
                return partitions.ToArray();
            }
            return Array.Empty<int>();
        }`,
            max_tokens: 2048,
            temperature: 0
        });
        return response;
    }


    function handleScroll(evt: UIEvent) {
        const target = evt.target as HTMLDivElement;
        if (target && (target.offsetHeight + target.scrollTop >= target.scrollHeight)) {
            if (bottomBtnRef.current && bottomBtnRef.current.style.display !== "none")
                bottomBtnRef.current.style.display = "none";
        } else {
            if (bottomBtnRef.current && bottomBtnRef.current.style.display === "none")
                bottomBtnRef.current.style.display = "inline";
        }
    }

    function handleScrollToBottom(evt: MouseEvent) {
        if (chatItemsDivRef.current)
            setScrollBottom(chatItemsDivRef.current);
    }

    function setScrollBottom(el: HTMLDivElement) {
        el.scrollTo({
            behavior: "smooth",
            top: el.scrollHeight
        });
    }

    return (
        <div className="chat-layout">
            <div className="chat-items" onScroll={handleScroll} ref={chatItemsDivRef}>
                <ChatItem isOwner={true} messagesData={messagesData} avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXp3DxP80ArpRzsB0XWBG9Ow5GeuefbLrUHw&usqp=CAU" />
                <ChatItem isOwner={false} messagesData={messagesData} avatar="https://www.w3schools.com/w3images/avatar6.png" />
                <ChatItem isOwner={false} messagesData={messagesData} avatar="https://www.w3schools.com/w3images/avatar6.png" />
                <ChatItem isOwner={true} messagesData={messagesData} avatar="https://www.w3schools.com/w3images/avatar6.png" />
                <ChatItem isOwner={false} messagesData={messagesData} avatar="https://www.w3schools.com/w3images/avatar6.png" />
                <ChatItem isOwner={true} messagesData={messagesData} avatar="https://www.w3schools.com/w3images/avatar6.png" />
                <div className="chat-item-end"></div>
            </div>
            <div className="chat-pane">
                <MessagePane onSend={handleSend} />
            </div>
            <button className="chat-bottom-btn" type="button" ref={bottomBtnRef} onClick={handleScrollToBottom}>
                <svg viewBox="0 0 24 24">
                    <path d="m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
                </svg>
            </button>
        </div>
    );
}