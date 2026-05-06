"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Works() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("all_projects");
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  }, []);

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
            </li>
          </ul>
        </nav>
      </header>

      <section className="main">
        <div className="works">
          <h1>Our Works</h1>
          <p>Here are some of our recent projects and achievements.</p>

          <div className="work-list" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" ,background: "#8a6868", padding: "20px", borderRadius: "8px"}}>
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project.id} className="work-card">
                  <img style={{ width: "100%", height: "200px", objectFit: "cover" }}
                    src={project.image || "https://via.placeholder.com/300x200"} 
                    alt={project.title} 
                  />
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "50px" }}>
                <p>Chưa có dự án nào được đăng tải.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 LT Creative Agency. All rights reserved.</p>
      </footer>
    </div>
  );
}