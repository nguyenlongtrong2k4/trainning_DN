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
        <div className="works">
          <p className="works-title">Our Works</p>
          <hr color="#ccc" />
          <p className="works-intro">Here are some of our recent projects and achievements.</p>

          <div className="projects-container">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project.id} className="project-card">
                  <img 
                    className="project-image"
                    src={project.image || "https://via.placeholder.com/300x200"} 
                    alt={project.title} 
                  />
                  <h2 className="project-title">{project.title}</h2>
                  <p className="project-desc">{project.description}</p>
                </div>
              ))
            ) : (
              <div className="no-projects">
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