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
                  {" | "} Hello, {user.full_name || user.name}
                  {user.role === "admin" && (
                    <>
                      {" | "} <Link href="/admin">Admin</Link>
                    </>
                  )}
                  {" | "}
                  <button className="btn-logout" onClick={handleLogout}>
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
          <p className="contact-title">Contact Us</p>
          <hr color="#ccc" />
          <p>
            Have questions, suggestions, or feedback about our services? 
            We’re always happy to hear from you! Whether you need support, 
            want to learn more about our projects, or simply want to share 
            your thoughts, feel free to get in touch with our team anytime. 
            We’ll do our best to respond as quickly as possible.
          </p>
        </div>
        <div className="contact-form">
          <form onSubmit={handleSubmit} className="contact-form-container">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required className="contact-input" />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required className="contact-input" />

            <label htmlFor="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" required className="contact-input" />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows={5} required className="contact-input" />

            <button type="submit" className="btn-submit">
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