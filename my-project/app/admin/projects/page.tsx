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
        description: pDesc || "Mô tả dự án...",
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
        <div className="admin-sub-page admin-sub-page-content">
          <p className="admin-page-title">
            {editId ? "Chỉnh sửa Dự án" : "Quản lý Dự án"}
          </p>
          <hr color="#ccc" />
          
          <form onSubmit={handleSubmit} className="admin-project-form">
            <input 
              type="text" 
              placeholder="Tên dự án (Title)..." 
              required 
              className="admin-project-input"
              value={pName} 
              onChange={(e) => setPName(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Mô tả ngắn (Description)..." 
              className="admin-project-input"
              value={pDesc} 
              onChange={(e) => setPDesc(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Link ảnh dự án (Image URL)..." 
              className="admin-project-input"
              value={pImg} 
              onChange={(e) => setPImg(e.target.value)} 
            />
            <div className="admin-form-btn-group">
                <button 
                  type="submit" 
                  className="btn-project-submit"
                  style={{ background: editId ? "#28a745" : "#333" }} // Màu nền đổi theo state nên giữ lại inline
                >
                {editId ? "Cập nhật dự án" : "+ Thêm dự án vào Works"}
                </button>
                {editId && (
                    <button 
                      type="button" 
                      onClick={() => { setEditId(null); setPName(""); setPDesc(""); setPImg(""); }} 
                      className="btn-project-cancel"
                    >
                    Hủy sửa
                    </button>
                )}
            </div>
          </form>

          <table width="100%" border={1} className="admin-project-table">
            <thead>
              <tr className="admin-table-header">
                <th className="admin-table-cell">Ảnh dự án</th>
                <th className="admin-table-cell">Thông tin dự án</th>
                <th className="admin-table-cell">Ngày tạo</th>
                <th className="admin-table-cell">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((p) => (
                  <tr key={p.id} className="admin-table-row">
                    <td className="admin-table-cell" style={{ width: "120px", textAlign: "center" }}>
                      <img src={p.image} alt={p.title} className="project-img-preview" />
                    </td>
                    <td className="admin-table-cell">
                      <strong>{p.title}</strong>
                      <p className="project-desc-text">{p.description}</p>
                    </td>
                    <td className="admin-table-cell" style={{ textAlign: "center" }}>{p.date}</td>
                    <td className="admin-table-cell" style={{ textAlign: "center" }}>
                      <button onClick={() => startEdit(p)} className="btn-edit-action">Sửa</button>
                      <button onClick={() => deleteProject(p.id)} className="btn-delete-action">Xóa</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="admin-table-row">
                  <td colSpan={4} className="admin-table-cell" style={{ padding: "20px", textAlign: "center" }}>
                    Chưa có dự án nào.
                  </td>
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