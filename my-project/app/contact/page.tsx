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

    const newMessage = {
      id: Date.now(),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      date: new Date().toLocaleString("vi-VN"), 
    };

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
            <li><Link href="/works" className="active">Works</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li>
              <Link href="/admin">🔐</Link> | <Link href="/login">👤</Link>
              {user && (
                    <>
                    {" | "}
                    Hello, {user.full_name || user.name}

                    {user.role === "admin" && (
                        <>
                        {" | "}
                        <Link href="/admin">Admin</Link>
                        </>
                    )}

                    {" | "}
                    <button style={{ border: "1px solid #ccc", padding: "2px 10px", background: "none", cursor: "pointer", color: "red" }} onClick={handleLogout}>
                      Logout
                    </button>
                    </>
                )}
            </li>
          </ul>
        </nav>
      </header>
      <section className="main">
        <div className="mail_to">
          <h1>Contact Us</h1>
          <p>
            Have questions, suggestions, or feedback about our services? 
            We’re always happy to hear from you! Whether you need support, 
            want to learn more about our projects, or simply want to share 
            your thoughts, feel free to get in touch with our team anytime. 
            We’ll do our best to respond as quickly as possible.
          </p>
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