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
              <span></span><span></span><span></span>
            </div>
            <div className="socials">
              <a href="https://www.facebook.com/longtrongcutedjproducer.99999">
                <img src="/image/fb.webp" alt="Facebook" />
              </a>
              <a href="#">
                <img src="/image/ws.png" alt="WhatsApp" />
              </a>
              <a href="https://www.youtube.com/@TrongNguyen-cf8kr">
                <img src="/image/yt.png" alt="YouTube" />
              </a>
              <a href="https://www.instagram.com/longtrong_0505/">
                <img src="/image/ig.png" alt="Instagram" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="services">
        <p style={{ textAlign: 'left', fontSize: '60px' , margin:"0 auto"}}>Our Services</p>
          <div className="service-list">
            <div className="service-card">
              <h2>Web Design & Development</h2>
                <p>
                  We create high-performance, responsive websites tailored to your brand. 
                  From landing pages to complex e-commerce platforms, our designs focus on 
                  delivering seamless user experiences and driving conversions.
                </p>
                <ul style={{ textAlign: 'left', fontSize: '18px', marginTop: '10px', color: '#666' }}>
                  <li>UI/UX Design</li>
                  <li>Responsive Layouts</li>
                  <li>E-commerce Solutions</li>
                </ul>
              </div>

            <div className="service-card">
              <h2>Branding & Identity</h2>
                <p>
                  Building a strong brand starts with a compelling story. We help define your 
                  visual identity, including logo design, color palettes, and typography, 
                  ensuring your business stands out and stays memorable in the market.
                </p>
                <ul style={{ textAlign: 'left', fontSize: '18px', marginTop: '10px', color: '#666' }}>
                  <li>Logo & Visual Style</li>
                  <li>Brand Strategy</li>
                  <li>Creative Direction</li>
                </ul>
            </div>

            <div className="service-card">
              <h2>Digital Marketing</h2>
                <p>
                  Accelerate your growth with data-driven marketing strategies. We specialize 
                  in SEO, social media management, and targeted ad campaigns to connect your 
                  brand with the right audience at the right time.
                </p>
                <ul style={{ textAlign: 'left', fontSize: '18px', marginTop: '10px', color: '#666' }}>
                  <li>SEO Optimization</li>
                  <li>Social Media Strategy</li>
                  <li>Content Marketing</li>
                </ul>
            </div>
          </div>
      </section>
      <section className="featured-works">
        <p style={{ textAlign: 'left', fontSize: '60px' ,margin:"0 auto"}}>Featured Projects</p>
        <div className="work-list">
          <div className="work-card">
            <div className="work-content">
              <h2>E-commerce Fashion Platform</h2>
              <ul style={{ textAlign: 'left', fontSize: '18px', marginTop: '10px', color: '#666' }}>
                <li>
                A complete online shopping solution featuring secure payment gateways, 
                user authentication, and a dynamic product management system designed 
                to provide a seamless experience across all devices.
                </li>
              </ul>
              
            </div>
          </div>

          <div className="work-card">
            <div className="work-content">
              <h2>Creative Agency Portfolio</h2>
              <ul style={{ textAlign: 'left', fontSize: '18px', marginTop: '10px', color: '#666' }}>
              <li>
                A minimalist and modern portfolio layout focused on visual storytelling. 
                We implemented smooth scroll animations and high-quality image galleries 
                to showcase creative works in the most professional way possible.
              </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <p>© 2026 LT Creative Agency. All rights reserved.</p>
      </footer>
    </div>
  );
}