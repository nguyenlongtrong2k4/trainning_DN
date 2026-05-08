"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ServicesPage() {
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
              <Link href="/admin">🔐</Link> | <Link href="/login">👤</Link>
              {user && (
                <>
                  {" | "} Hello, {user.full_name || user.name}
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

      <section className="services-detail">
        <p className="services-title">Specialized Solutions</p>
        <p className="services-subtitle">
          Tailored strategies for your business journey.
        </p>
        <hr color="#ccc" />

        <div className="service-grid">
          <div className="service-card"> 
            <p className="service-card-title">Startup Package</p>
            <p className="service-card-desc">
              Everything you need to launch your brand from scratch. We handle the technical details while you focus on your vision.
            </p>
            <ul className="card-details">
              <li>Brand Identity & Logo</li>
              <li>Responsive Landing Page</li>
              <li>Social Media Setup</li>
              <li>Basic SEO Setup</li>
            </ul>
          </div>

          <div className="service-card">
            <p className="service-card-title">Growth Package</p>
            <p className="service-card-desc">
              Scale your existing business with advanced digital tools and high-performance web applications.
            </p>
            <ul className="card-details">
              <li>E-commerce Solutions</li>
              <li>Custom Web Applications</li>
              <li>Advanced UI/UX Audit</li>
              <li>Performance Optimization</li>
            </ul>
          </div>

          <div className="service-card">
            <p className="service-card-title">Full Support</p>
            <p className="service-card-desc">
              Dedicated maintenance and continuous updates to keep your business running smoothly in the digital era.
            </p>
            <ul className="card-details">
              <li>24/7 Technical Support</li>
              <li>Monthly Updates</li>
              <li>Security Monitoring</li>
              <li>Content Management</li>
            </ul>
          </div>
        </div>

        <div className="process-flow">
          <p className="process-title">Our Working Process</p>
          <hr color="#ccc" />
          <div className="process-container">
            <div className="process-step">
              <h3 className="step-number">01</h3>
              <p className="step-label">Consultation</p>
              <p className="step-desc">Understanding your goals.</p>
            </div>
            <div className="process-step">
              <h3 className="step-number">02</h3>
              <p className="step-label">Planning</p>
              <p className="step-desc">Detailed project roadmap.</p>
            </div>
            <div className="process-step">
              <h3 className="step-number">03</h3>
              <p className="step-label">Execution</p>
              <p className="step-desc">Designing & Coding.</p>
            </div>
            <div className="process-step">
              <h3 className="step-number">04</h3>
              <p className="step-label">Final Launch</p>
              <p className="step-desc">Quality check & Go live.</p>
            </div>
          </div>
        </div>

        <div className="cta-container">
            <Link href="/contact" className="btn-box">
                Talk to Us
            </Link>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 LT Creative Agency. All rights reserved.</p>
      </footer>
    </div>
  );
}