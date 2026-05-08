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
    if (confirm("Delete this message?")) {
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
        <div className="admin-sub-page messages-container">
          <p className="messages-title">Hộp Thư Góp Ý ({messages.length})</p>
          <hr color="#ccc" />
          <p className="messages-subtitle">
            Đây là nơi bạn có thể xem và quản lý tất cả các tin nhắn liên hệ từ khách hàng.
          </p>
          
          <table width="100%" border={1} className="messages-table">
            <thead className="messages-table-head">
              <tr>
                <th className="messages-table-cell">Khách hàng</th>
                <th className="messages-table-cell">Liên hệ</th>
                <th className="messages-table-cell">Nội dung</th>
                <th className="messages-table-cell">Thời gian</th>
                <th className="messages-table-cell">Hành động</th>
              </tr>
            </thead>
            <tbody className="messages-table-body">
              {messages.length > 0 ? (
                messages.map((m) => (
                  <tr key={m.id}>
                    <td className="messages-table-cell">{m.name}</td>
                    <td className="messages-table-cell">{m.email}<br/>{m.phone}</td>
                    <td className="messages-table-cell">{m.message}</td>
                    <td className="messages-table-cell">{m.date}</td>
                    <td className="messages-table-cell">
                      <button onClick={() => deleteMessage(m.id)} className="btn-delete-msg">Xóa</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="no-messages-cell">Không có tin nhắn nào.</td>
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