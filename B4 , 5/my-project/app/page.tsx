"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
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
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/works">Works</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>

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
        <div className="main_1">
          <img src="/image/image.jpg" alt="" />
        </div>

        <div className="main_2">
          <div className="item_main_2">
            <div className="main-text">
              <div className="line-1">This year</div>
              <div className="line-2">Start your own business</div>
            </div>

            <div className="bottom-right">
              <div className="info">Check out for more info</div>
              <Link href="/contact" className="btn-box">
                Click Here
              </Link>
            </div>

            <div className="decor-lines">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="socials">
              <a href="#">
                <img src="/image/fb.jpg" alt="Facebook" />
              </a>
              <a href="#">
                <img src="/image/wa.jpg" alt="WhatsApp" />
              </a>
              <a href="#">
                <img src="/image/yt.jpg" alt="YouTube" />
              </a>
              <a href="#">
                <img src="/image/ig.jpg" alt="Instagram" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="services">
        <h2>Our Services</h2>
        <div className="service-list">
          <div className="service-card">
            <h3>Web Design</h3>
            <p>Modern and user-friendly website design.</p>
          </div>

          <div className="service-card">
            <h3>Branding</h3>
            <p>Building brand and corporate identity.</p>
          </div>

          <div className="service-card">
            <h3>Marketing</h3>
            <p>Modern online marketing solutions.</p>
          </div>
        </div>
      </section>

      <section className="featured-works">
        <h2>Featured Projects</h2>
        <div className="work-list">
          <div className="work-card">
            <img src="/image/project1.jpg" alt="" />
            <h3>E-commerce Website</h3>
          </div>

          <div className="work-card">
            <img src="/image/project2.jpg" alt="" />
            <h3>Creative Portfolio</h3>
          </div>
        </div>
      </section>

      <section className="about-preview">
        <h2>About LT Creative Agency</h2>
        <p>
          LT Creative Agency is a creative agency specializing in web design, branding, and digital marketing solutions for businesses.
        </p>
      </section>

      <footer className="footer">
        <p>© 2026 LT Creative Agency. All rights reserved.</p>
      </footer>
    </div>
  );
}