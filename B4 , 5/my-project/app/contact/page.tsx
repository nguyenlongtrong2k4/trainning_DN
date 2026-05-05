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

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    alert(`Đã gửi thành công!
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}`);

    form.reset();
  };

  return (
    <div className="container">
      <header className="header">
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/works">Works</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/about">About Us</Link></li>

            <li>
              <Link href="/admin">🔐</Link> |{" "}
              <Link href="/login">👤</Link>

              {user && (
                <>
                  {" | "}
                  Xin chào, {user.full_name || user.name}

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
          <p>If you have any questions, please feel free to contact us.</p>
          <ul>
            <li>
              Email:
              <a href="mailto:nguyenlongtrong2k4a6@gmail.com">
                nguyenlongtrong2k4a6@gmail.com
              </a>
            </li>
            <li>Phone: +84867679704</li>
            <li>Address: 53 Phan Dinh Phung, Thai Nguyen City, Vietnam</li>
          </ul>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
            <br /><br />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <br /><br />

            <label htmlFor="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" required />
            <br /><br />

            <label htmlFor="message">Message:</label>
            <br />
            <textarea id="message" name="message" rows={5} cols={30} required />
            <br /><br />

            <input type="submit" value="Submit" />
          </form>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 LT Creative Agency. All rights reserved.</p>
      </footer>
    </div>
  );
}