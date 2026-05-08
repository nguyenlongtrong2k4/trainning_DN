"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    
    const data = localStorage.getItem("user");
    
    if (!data) {
      router.push("/login");
      return;
    }

    const parsed = JSON.parse(data);
    
    if (parsed.role === "admin") {
      setUser(parsed);
    } else {
      alert("Quyền hiện tại: " + parsed.role + " - Không vào được!");
      router.push("/");
    }
  }, [router]);

  if (!user) return <h1 style={{color: "white", padding: "20px"}}>Đang kiểm tra quyền Admin...</h1>;

  return (
    <div className="container admin-page">
      <header className="header">
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/works">Works</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/admin" className="active">Admin Dashboard</Link></li>
          </ul>
        </nav>
        <div className="user-info">
          <span>Hello, <b>{user.full_name}</b></span>
          <button style={{ marginLeft: "20px", border: "1px solid #ccc", padding: "5px 10px", background: "none", cursor: "pointer", color: "red" }}
            className="btn-logout" 
            onClick={() => { 
              localStorage.removeItem("user"); 
              window.location.href = "/login"; 
            }}
          >
            Đăng xuất
          </button>
        </div>
      </header>

      <section className="main">
        <div className="admin">
            <h1>Hệ Thống Quản Trị</h1>
            <div className="admin-menu">
                <div className="admin-card">
                <h3>Quản lý Dự án</h3>
                <Link href="/admin/projects">
                    <button type="button">Thêm mới</button>
                </Link>
                </div>
                
                <div className="admin-card">
                <h3>Thư viện hình ảnh</h3>
                <Link href="/admin/images">
                    <button type="button">Upload</button>
                </Link>
                </div>

                <div className="admin-card">
                <h3>Tin nhắn</h3>
                <Link href="/admin/messages">
                    <button type="button">Kiểm tra</button>
                </Link>
                </div>

                <div className="admin-card">
                <h3>Thành viên</h3>
                <Link href="/admin/users">
                    <button type="button">Quản lý</button>
                </Link>
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