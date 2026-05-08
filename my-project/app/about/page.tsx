"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function About() {
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
        <div className="about">
          <p className="about-title">About Us</p>
          <hr color="#ccc" />
          <div className="about-content">
            <p>
              We are a company dedicated to providing high-quality products
              and services to our customers. Our mission is to create
              innovative solutions that meet the needs of our clients and
              help them achieve their goals.
            </p>
            <p>
              Our team consists of experienced professionals who are
              passionate about their work and committed to delivering
              excellence. We value integrity, creativity, and collaboration
              in everything we do.
            </p>
            <p>
              Thank you for visiting our website. We look forward to
              working with you!
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 LT Creative Agency. All rights reserved.</p>
      </footer>
    </div>
  );
}