"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("all_projects") || "[]");
    setProjects(saved);
  }, []);

  const addProject = (e: React.FormEvent) => {
    e.preventDefault();
    
    const nameInput = document.getElementById("pName") as HTMLInputElement;
    const descInput = document.getElementById("pDesc") as HTMLInputElement;
    const imgInput = document.getElementById("pImg") as HTMLInputElement;

    if (!nameInput.value) return;

    const newItem = { 
      id: Date.now(), 
      title: nameInput.value, 
      description: descInput.value || "Mô tả sản phẩm WhaleShop...", 
      image: imgInput.value || "https://via.placeholder.com/300x200", 
      date: new Date().toLocaleDateString() 
    };

    const newList = [...projects, newItem];
    setProjects(newList);
    localStorage.setItem("all_projects", JSON.stringify(newList));

    nameInput.value = "";
    descInput.value = "";
    imgInput.value = "";
  };

  const deleteProject = (id: number) => {
    if (confirm("Xác nhận xóa dự án này?")) {
      const newList = projects.filter(p => p.id !== id);
      setProjects(newList);
      localStorage.setItem("all_projects", JSON.stringify(newList));
    }
  };

  return (
    <div className="container">
      <header className="header">
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/admin">Dashboard</Link></li>
            <li><Link href="/admin/projects" className="active">Projects</Link></li>
          </ul>
        </nav>
      </header>

      <section className="main">
        <div className="admin-sub-page" style={{margin:"0 auto"}}>
          <h1>Quản lý Dự án </h1>
          
          <form onSubmit={addProject} style={{ marginBottom: "30px", display: "flex", flexDirection: "column", gap: "10px", maxWidth: "500px" }}>
            <input type="text" id="pName" placeholder="Tên dự án (Title)..." required style={{ padding: "10px" }} />
            <input type="text" id="pDesc" placeholder="Mô tả ngắn (Description)..." style={{ padding: "10px" }} />
            <input type="text" id="pImg" placeholder="Link ảnh dự án (Image URL)..." style={{ padding: "10px" }} />
            <button type="submit" className="btn-add" style={{ padding: "10px", background: "#333", color: "#fff", cursor: "pointer" }}>
              + Thêm dự án vào Works
            </button>
          </form>
          
          <table width="100%" border={1} style={{ borderCollapse: "collapse" , background: "#f9f9f9" }}>
            <thead>
              <tr style={{ background: "#f4f4f4" }}>
                <th style={{ padding: "10px" }}>Ảnh dự án</th>
                <th style={{ padding: "10px" }}>Thông tin dự án</th>
                <th style={{ padding: "10px" }}>Ngày tạo</th>
                <th style={{ padding: "10px" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id}>
                  <td style={{ padding: "10px", width: "120px" }}>
                    <img src={p.image} alt={p.title} style={{ width: "100px", height: "60px", objectFit: "cover" }} />
                  </td>
                  <td style={{ padding: "10px" }}>
                    <strong>{p.title}</strong>
                    <p style={{ fontSize: "12px", color: "#666", margin: "5px 0 0" }}>{p.description}</p>
                  </td>
                  <td style={{ padding: "10px" }}>{p.date}</td>
                  <td style={{ padding: "10px" }}>
                    <button onClick={() => deleteProject(p.id)} style={{ color: "red", cursor: "pointer" }}>Xóa</button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 LT Creative Agency. All rights reserved.</p>
      </footer>
    </div>
  );
}