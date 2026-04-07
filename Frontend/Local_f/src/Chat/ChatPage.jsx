// ChatPage.jsx

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { IoSend } from 'react-icons/io5';
import { FiMoreVertical, FiArrowLeft } from 'react-icons/fi';
import './ChatPage.css'
export default function ChatPage() {
   const { id } = useParams(); // other_user_id
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    // ✅ FETCH HISTORY
    api.get(`history/${id}/`, {
      withCredentials: true,
    })
    .then((response) => {
      setMessages(response.data.messages);   
      console.log(response.data.messages)
      setCurrentUserId(response.data.current_user);
    });

    // ✅ WEBSOCKET
    socketRef.current = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/${id}/?token=${token}`
    );

    socketRef.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, data]);
    };

    return () => socketRef.current.close();
  }, [id]);

  // ✅ AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ SEND MESSAGE
  const sendMessage = () => {
    if (!input.trim()) return;

    socketRef.current.send(JSON.stringify({ message: input }));
    setInput("");
  };

  return (
   <div className="chat-wrapper">
      <div className="chat-container">
        
        {/* Chat Header */}
        <div className="chat-header">
          <div className="header-left">
            <FiArrowLeft className="back-icon" />
            <div className="user-avatar"></div>
            <div className="user-info">
              <h3>Service Pro</h3>
              <p>Online</p>
            </div>
          </div>
          <FiMoreVertical className="menu-icon" />
        </div>

        {/* Message Area */}
        <div className="chat-box">
          {messages.map((m, i) => {
            const isMe = Number(m.sender_id) === Number(currentUserId);;
            return (
              <div
                key={i}
                className={`message-row ${isMe ? "me-row" : "other-row"}`}
              >

                <div className={`message-bubble ${isMe ? "me" : "other"}`}>
                  {m.message}
                  <span className="message-time">12:45 PM</span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-box-container">
          <div className="input-wrapper">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button className="send-btn" onClick={sendMessage}>
              <IoSend size={20} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}