import React from "react";
import { Outlet } from "react-router-dom";
import Conversation from "../../components/conversation";
import "./style.css";

export default function () {
    return (
        <div className="home-layout">
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <div className="sidebar-newchat">
                        <svg viewBox="0 0 24 24">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                        </svg>
                        <span>New chat</span>
                    </div>
                    <div className="sidebar-conversations">
                        <Conversation isActive={true} name="New chat" />
                        <Conversation isActive={false} name="New chat" />
                        <Conversation isActive={false} name="New chat" />
                    </div>
                </nav>
            </div>
            <div className="main">
                <Outlet />
            </div>
        </div>
    );
}