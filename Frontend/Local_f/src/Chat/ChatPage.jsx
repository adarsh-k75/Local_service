// ChatPage.jsx

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { IoSend } from 'react-icons/io5';
import { FiMoreVertical, FiArrowLeft } from 'react-icons/fi';
import './ChatPage.css'
import { IoCameraOutline } from "react-icons/io5";
export default function ChatPage() {
  const { id } = useParams(); 
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const fileRef = useRef(null);
  const [reciver,setreciver]=useState("")
  const [userStatus, setUserStatus] = useState("offline");

  useEffect(() => {
     const token = localStorage.getItem("access_token");

  let socket;

  api.get(`history/${id}/`, { withCredentials: true })
    .then((response) => {
      setMessages(response.data.messages);
      setCurrentUserId(response.data.current_user);
      setreciver(response.data.reciver)
    });

  socket = new WebSocket(
    `ws://127.0.0.1:8000/ws/chat/${id}/?token=${token}`
  );

  socketRef.current = socket;

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = (e) => {
  const data = JSON.parse(e.data);
    if (data.type === "user_status") {
    if (Number(data.user_id) === Number(id)) {
      setUserStatus(data.status);
    }
    return;
  }


  if (data.type === "count_update") return;

  
   

  setMessages((prev) => [...prev, data]);
  };

  socket.onerror = (err) => {
    console.log("WebSocket error:", err);
  };

  socket.onclose = () => {
    console.log("WebSocket closed");
  };

  return () => {
      if (socket) {
    socket.onmessage = null;
    socket.onerror = null;

    if (
      socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING
    ) {
      socket.close();
    }
  }
  };
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
   if (!input.trim()) return;

  if (!socketRef.current || socketRef.current.readyState !== 1) return;

  socketRef.current.send(JSON.stringify({ message: input }));
  setInput("");
  };

    const handleImageSend = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);
  formData.append("receiver", id);

  try {
    await api.post("chat_image/", formData);

    // clear input
    fileRef.current.value = "";
  } catch (err) {
    console.log(err);
  }
};

  return (
   <div className="chat-wrapper">
      <div className="chat-container">
        
        <div className="chat-header">
          <div className="header-left">
            <FiArrowLeft className="back-icon" />
            <div className="user-avatar"></div>
            <div className="user-info">
              <h3>{reciver}</h3>
              <p>{userStatus === "online" ? "Online" : "Offline"}</p>
            </div>
          </div>
          <FiMoreVertical className="menu-icon" />
        </div>

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
                    {m.image && (
               <img   width="200" src={`http://127.0.0.1:8000${m.image}`}  style={{ width: "200px" ,borderRadius: "10px" }} />
                   )}
                  <span className="message-time">{m.timestamp}</span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef}/>
        </div>

        <div className="input-box-container">
          <div className="input-wrapper">

              <input
                     type="file"
                     ref={fileRef}
                     style={{ display: "none" }}
                     onChange={handleImageSend}
                   />
                  <IoCameraOutline
                     size={24}
                     style={{ cursor: "pointer" }}
                     onClick={() => fileRef.current.click()}
  />
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