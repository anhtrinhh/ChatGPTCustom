import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/chat";
import Layout from "./pages/layout";
import Welcome from "./pages/welcome";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chat" element={<Layout />}>
          <Route index element={<Welcome />}></Route>
          <Route path=":chatId" element={<Chat />} />
        </Route>
        <Route path="*" element={<Navigate to="/chat" replace />}></Route>
      </Routes>
    </Router>
  );
}

export default App;