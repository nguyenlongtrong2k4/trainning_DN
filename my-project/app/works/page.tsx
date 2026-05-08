"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Works() {
  const [projects, setProjects] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedProjects = localStorage.getItem("all_projects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      localStorage.removeItem("user");
      setUser(null);
      window.location.href = "/login";
    }
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
        <div className="works">
          <h1 style={{ marginBottom: "10px" , margin:"0 auto" }}>Our Works</h1>
          <p style={{ marginBottom: "30px" }}>Here are some of our recent projects and achievements.</p>

          <div className="work-list" style={{ 
            display: "flex", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: "10px", 
            background: "#8d7e7e", 
            padding: "10px", 
            borderRadius: "8px" 
          }}>
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project.id} className="work-card" style={{ background: "#fff", padding: "15px", borderRadius: "8px", color: "#333" }}>
                  <img 
                    style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "4px" }}
                    src={project.image || "https://via.placeholder.com/300x200"} 
                    alt={project.title} 
                  />
                  <h2 style={{ fontSize: "1.2rem", margin: "15px 0 10px" }}>{project.title}</h2>
                  <p style={{ fontSize: "14px", color: "#666" }}>{project.description}</p>
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "50px", gridColumn: "1 / -1", color: "#fff" }}>
                <p>No projects have been posted yet...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="footer" >
        <p>© 2026 LT Creative Agency. All rights reserved.</p>
      </footer>
    </div>
  );
}