"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("messages") || "[]");
    setMessages(saved);
  }, []);

  const deleteMessage = (index: number) => {
    const newList = messages.filter((_, i) => i !== index);
    setMessages(newList);
    localStorage.setItem("messages", JSON.stringify(newList));
  };

  return (
    <div className="container">
      <header className="header">
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/admin">Dashboard</Link></li>
            <li><Link href="/admin/messages" className="active">Messages</Link></li>
          </ul>
        </nav>
      </header>

      <section className="main">
        <div className="admin-sub-page">
          <h1>Tin nhắn từ khách hàng</h1>
          {messages.length === 0 ? (
            <p>Hòm thư đang trống.</p>
          ) : (
            messages.map((m, i) => (
              <div key={i} style={{ border: "1px solid #ddd", padding: "15px", marginBottom: "15px", position: "relative" }}>
                <p><strong>Email:</strong> {m.email}</p>
                <p><strong>Nội dung:</strong> {m.content}</p>
                <button 
                  onClick={() => deleteMessage(i)} 
                  style={{ position: "absolute", top: "10px", right: "10px", color: "red" }}
                >
                  Xóa
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 LT Creative Agency. All rights reserved.</p>
      </footer>
    </div>
  );
}