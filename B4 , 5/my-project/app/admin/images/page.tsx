"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminImages() {
  const [images, setImages] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("all_images") || "[]");
    setImages(saved);
  }, []);

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    const newList = [...images, urlInput.trim()];
    setImages(newList);
    localStorage.setItem("all_images", JSON.stringify(newList));
    setUrlInput(""); // Xóa nội dung ô nhập sau khi thêm
  };

  const deleteImage = (index: number) => {
    if (confirm("Xóa ảnh này khỏi thư viện?")) {
      const newList = images.filter((_, i) => i !== index);
      setImages(newList);
      localStorage.setItem("all_images", JSON.stringify(newList));
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("Đã copy link ảnh! Giờ ông sang trang Projects dán vào ô Image URL nhé.");
  };

  return (
    <div className="container">
      <header className="header">
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/admin">Dashboard</Link></li>
            <li><Link href="/admin/images" className="active">Images</Link></li>
            <li><Link href="/admin/projects">Projects</Link></li>
          </ul>
        </nav>
      </header>

      <section className="main">
        <div className="admin-sub-page" style={{ margin: "0 auto", maxWidth: "900px" }}>
          <h1 style={{ marginBottom: "10px" }}>Thư viện Hình ảnh</h1>
          <p style={{ color: "#666", marginBottom: "20px" }}>
            Dán link ảnh vào đây để lưu trữ và sử dụng cho các dự án WhaleShop.
          </p>
          
          {/* Form thêm ảnh mới thay cho prompt */}
          <form onSubmit={handleAddImage} style={{ marginBottom: "30px", display: "flex", gap: "10px" }}>
            <input 
              type="text" 
              placeholder="Dán URL hình ảnh vào đây (ví dụ: https://...)" 
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              style={{ flex: 1, padding: "12px", borderRadius: "4px" }}
            />
            <button type="submit" style={{ padding: "10px 25px", cursor: "pointer", background: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold" }}>
              Thêm vào kho
            </button>
          </form>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px", marginBottom: "40px" }}>
            {images.length > 0 ? (
              images.map((img, index) => (
                <div key={index} className="image-card" style={{ padding: "10px", textAlign: "center", borderRadius: "8px", background: "#fff", boxShadow: "0 2px 5px rgba(0,0,0,0.05)"  }}>
                  <img 
                    src={img} 
                    alt={`Item ${index}`} 
                    style={{ width: "100%", height: "160px", objectFit: "cover", cursor: "pointer", borderRadius: "4px" }} 
                    onClick={() => copyToClipboard(img)}
                    title="Click để copy link"
                  />
                  <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", gap: "5px" }}>
                    <button 
                      onClick={() => copyToClipboard(img)} 
                      style={{ flex: 1, fontSize: "12px", cursor: "pointer", padding: "5px", background: "#f0f0f0", border: "1px solid #ddd" }}
                    >
                      Copy Link
                    </button>
                    <button 
                      onClick={() => deleteImage(index)} 
                      style={{ fontSize: "12px", color: "#fff", background: "#ff4d4f", border: "none", cursor: "pointer", padding: "5px 10px", borderRadius: "3px" }}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px", color: "#999", border: "2px dashed #eee" }}>
                Thư viện hiện đang trống. Hãy thêm ảnh đầu tiên!
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