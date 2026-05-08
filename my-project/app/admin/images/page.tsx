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
    setUrlInput(""); 
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
    alert("Đã copy link ảnh!");
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
        <div className="admin-sub-page img-lib-container">
          <p className="img-lib-title">Thư viện Hình ảnh</p>
          <hr color="#ccc" />
          <p className="img-lib-subtitle">
            Dán link ảnh vào đây để lưu trữ và sử dụng cho các dự án WhaleShop.
          </p>

          <form onSubmit={handleAddImage} className="img-add-form">
            <input 
              type="text" 
              placeholder="Dán URL hình ảnh vào đây (ví dụ: https://...)" 
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="img-input-url"
            />
            <button type="submit" className="btn-img-submit">
              Thêm vào kho
            </button>
          </form>
          
          <div className="img-grid">
            {images.length > 0 ? (
              images.map((img, index) => (
                <div key={index} className="image-card">
                  <img 
                    src={img} 
                    alt={`Item ${index}`} 
                    className="img-preview-item"
                    onClick={() => copyToClipboard(img)}
                    title="Click để copy link"
                  />
                  <div className="img-card-actions">
                    <button 
                      onClick={() => copyToClipboard(img)} 
                      className="btn-copy-url"
                    >
                      Copy Link
                    </button>
                    <button 
                      onClick={() => deleteImage(index)} 
                      className="btn-delete-img"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-lib-msg">
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