import React from "react";
import CodeMessage from "../code-message";
import TextMessage from "../text-message";
import "./style.css"

export default function (props: IChatItemProps) {
    var str = `private static bool CheckEntityHasInDb(OracleConnection connection, string clientCode, DateTime date)
{
  using (var command = connection.CreateCommand())
  {
    command.CommandText = "SELECT COUNT(*) FROM table WHERE client_code = :clientCode AND date = :date";
    command.Parameters.Add("clientCode", OracleDbType.Varchar2).Value = clientCode;
    command.Parameters.Add("date", OracleDbType.Date).Value = date;
    return (int)command.ExecuteScalar() > 0;
  }
}`;
    return (
        <div className={"chat-item" + (props.isOwner ? " owner" : "")}>
            <div className="chat-item-wrapper">
                <div className="chat-item-avatar">
                    <img src={props.avatar} />
                </div>
                <div className="chat-item-messages">
                    <TextMessage text="Hello Oke Oke" />
                    <CodeMessage languague="csharp" text={str} />
                </div>
            </div>
        </div>
    )
}

interface IChatItemProps {
    isOwner: boolean,
    avatar: string
}