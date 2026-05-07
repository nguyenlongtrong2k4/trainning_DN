"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("all_messages");
    if (data) {
      setMessages(JSON.parse(data));
    }
  }, []);

  const deleteMessage = (id: number) => {
    if (confirm("Xóa tin nhắn này?")) {
      const newList = messages.filter((m) => m.id !== id);
      setMessages(newList);
      localStorage.setItem("all_messages", JSON.stringify(newList));
    }
  };

  return (
    <div className="container">
      <header className="header">
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/admin">Dashboard</Link></li>
            <li><Link href="/admin/messages" className="active">Messages</Link></li>
            <li><Link href="/admin/projects">Projects</Link></li>
          </ul>
        </nav>
      </header>

      <section className="main">
        <div className="admin-sub-page" style={{ margin: "0 auto", maxWidth: "900px" }}>
          <h1>Hộp Thư Góp Ý ({messages.length})</h1>
          
          <table width="100%" border={1} style={{ borderCollapse: "collapse", marginTop: "20px", textAlign: "left" }}>
            <thead style={{ background: "#f4f4f4" }}>
              <tr>
                <th style={{ padding: "10px" }}>Khách hàng</th>
                <th style={{ padding: "10px" }}>Liên hệ</th>
                <th style={{ padding: "10px" }}>Nội dung</th>
                <th style={{ padding: "10px" }}>Thời gian</th>
                <th style={{ padding: "10px" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {messages.length > 0 ? (
                messages.map((m) => (
                  <tr key={m.id}>
                    <td style={{ padding: "10px" }}>{m.name}</td>
                    <td style={{ padding: "10px" }}>{m.email}<br/>{m.phone}</td>
                    <td style={{ padding: "10px" }}>{m.message}</td>
                    <td style={{ padding: "10px" }}>{m.date}</td>
                    <td style={{ padding: "10px" }}>
                      <button onClick={() => deleteMessage(m.id)} style={{ color: "red", cursor: "pointer" }}>Xóa</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "30px" }}>Không có tin nhắn nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 LT Creative Agency. All rights reserved.</p>
      </footer>
    </div>
  );
}