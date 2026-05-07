"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false); 
  
  const [pName, setPName] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pImg, setPImg] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("all_projects") || "[]");
    setProjects(saved);
    setIsLoaded(true); 
  }, []);

  const saveToLocal = (list: any[]) => {
    setProjects(list);
    localStorage.setItem("all_projects", JSON.stringify(list));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName) return;

    if (editId) {
      const updatedList = projects.map((p) =>
        p.id === editId
          ? { ...p, title: pName, description: pDesc, image: pImg || p.image }
          : p
      );
      saveToLocal(updatedList);
      setEditId(null);
    } else {
      const newItem = {
        id: Date.now(),
        title: pName,
        description: pDesc || "Mô tả sản phẩm WhaleShop...",
        image: pImg || "https://via.placeholder.com/300x200",
        date: new Date().toLocaleDateString(),
      };
      saveToLocal([...projects, newItem]);
    }

    setPName("");
    setPDesc("");
    setPImg("");
  };

  const deleteProject = (id: number) => {
    if (confirm("Xác nhận xóa dự án này?")) {
      const newList = projects.filter((p) => p.id !== id);
      saveToLocal(newList);
    }
  };

  const startEdit = (p: any) => {
    setEditId(p.id);
    setPName(p.title);
    setPDesc(p.description);
    setPImg(p.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isLoaded) return <div className="container">Đang tải dữ liệu...</div>;

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
        <div className="admin-sub-page" style={{ margin: "0 auto" }}>
          <h1>{editId ? "Chỉnh sửa Dự án" : "Quản lý Dự án"}</h1>

          <form onSubmit={handleSubmit} style={{ marginBottom: "30px", display: "flex", flexDirection: "column", gap: "10px", maxWidth: "500px" }}>
            <input 
              type="text" 
              placeholder="Tên dự án (Title)..." 
              required 
              style={{ padding: "10px", border: "1px solid #ccc" }} 
              value={pName} 
              onChange={(e) => setPName(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Mô tả ngắn (Description)..." 
              style={{ padding: "10px", border: "1px solid #ccc" }} 
              value={pDesc} 
              onChange={(e) => setPDesc(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Link ảnh dự án (Image URL)..." 
              style={{ padding: "10px", border: "1px solid #ccc" }} 
              value={pImg} 
              onChange={(e) => setPImg(e.target.value)} 
            />
            <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" style={{ flex: 1, padding: "10px", background: editId ? "#28a745" : "#333", color: "#fff", cursor: "pointer", border: "none" }}>
                {editId ? "Cập nhật dự án" : "+ Thêm dự án vào Works"}
                </button>
                {editId && (
                    <button type="button" onClick={() => { setEditId(null); setPName(""); setPDesc(""); setPImg(""); }} style={{ padding: "10px", background: "#ccc", cursor: "pointer", border: "none" }}>
                    Hủy sửa
                    </button>
                )}
            </div>
          </form>

          <table width="100%" border={1} style={{ borderCollapse: "collapse", background: "#f9f9f9" }}>
            <thead>
              <tr style={{ background: "#f4f4f4" }}>
                <th style={{ padding: "10px" }}>Ảnh dự án</th>
                <th style={{ padding: "10px" }}>Thông tin dự án</th>
                <th style={{ padding: "10px" }}>Ngày tạo</th>
                <th style={{ padding: "10px" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((p) => (
                  <tr key={p.id}>
                    <td style={{ padding: "10px", width: "120px", textAlign: "center" }}>
                      <img src={p.image} alt={p.title} style={{ width: "100px", height: "60px", objectFit: "cover" }} />
                    </td>
                    <td style={{ padding: "10px" }}>
                      <strong>{p.title}</strong>
                      <p style={{ fontSize: "12px", color: "#666", margin: "5px 0 0" }}>{p.description}</p>
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>{p.date}</td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      <button onClick={() => startEdit(p)} style={{ color: "blue", cursor: "pointer", marginRight: "10px", background: "none", border: "none" }}>Sửa</button>
                      <button onClick={() => deleteProject(p.id)} style={{ color: "red", cursor: "pointer", background: "none", border: "none" }}>Xóa</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ padding: "20px", textAlign: "center" }}>Chưa có dự án nào.</td>
                </tr>
              )}
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