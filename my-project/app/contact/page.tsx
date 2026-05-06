"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Contact() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Tạo object tin nhắn mới
    const newMessage = {
      id: Date.now(),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      date: new Date().toLocaleString("vi-VN"), 
    };

    // LẤY DỮ LIỆU CŨ - THÊM MỚI - LƯU LẠI
    const oldData = localStorage.getItem("all_messages");
    const allMessages = oldData ? JSON.parse(oldData) : [];
    
    allMessages.push(newMessage);
    localStorage.setItem("all_messages", JSON.stringify(allMessages));

    alert("Message sent successfully! Admin will receive your message.");
    form.reset();
  };

  return (
    <div className="container">
      <header className="header">
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/works">Works</Link></li>
            <li><Link href="/contact" className="active">Contact</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li>
              <Link href="/admin">🔐</Link> | <Link href="/login">👤</Link>
              {user && (
                <>
                  {" | "} Xin chào, {user.full_name}
                  {" | "} <button style={{ color: "red", background: "none", border: "none", cursor: "pointer" }} onClick={handleLogout}>Logout</button>
                </>
              )}
            </li>
          </ul>
        </nav>
      </header>

      <section className="main">
        <div className="mail_to">
          <h1>Contact Us</h1>
          <p>Have questions or feedback? We'd love to hear from you!</p>
        </div>

        <div className="contact-form" style={{ marginTop: "20px" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "500px" }}>
            <label>Name:</label>
            <input type="text" name="name" required style={{ padding: "8px" }} />

            <label>Email:</label>
            <input type="email" name="email" required style={{ padding: "8px" }} />

            <label>Phone:</label>
            <input type="tel" name="phone" required style={{ padding: "8px" }} />

            <label>Message:</label>
            <textarea name="message" rows={5} required style={{ padding: "8px" }} />

            <button type="submit" style={{ padding: "10px", background: "#333", color: "#fff", cursor: "pointer" }}>
              Send Message
            </button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 LT Creative Agency. All rights reserved.</p>
      </footer>
    </div>
  );
}