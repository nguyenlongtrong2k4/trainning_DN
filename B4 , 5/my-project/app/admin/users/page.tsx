"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    setCurrentUser(session);

    const savedUsers = JSON.parse(localStorage.getItem("all_users") || "[]");
    setUsers(savedUsers);
  }, []);

  const toggleRole = (email: string) => {
    const updatedUsers = users.map((u) => {
      if (u.email === email) {
        return { ...u, role: u.role === "admin" ? "user" : "admin" };
      }
      return u;
    });

    setUsers(updatedUsers);
    localStorage.setItem("all_users", JSON.stringify(updatedUsers));

    if (email === currentUser?.email) {
      const newMe = updatedUsers.find(u => u.email === email);
      localStorage.setItem("user", JSON.stringify(newMe));
      setCurrentUser(newMe);
    }

    alert("Cập nhật quyền thành công!");
  };

  const deleteUser = (email: string) => {
    if (email === currentUser?.email) {
      alert("Ông không thể tự xóa chính mình!");
      return;
    }

    if (confirm("Xác nhận xóa người dùng này?")) {
      const updatedUsers = users.filter((u) => u.email !== email);
      setUsers(updatedUsers);
      localStorage.setItem("all_users", JSON.stringify(updatedUsers));
    }
  };

  return (
    <div className="container">
      <header className="header">
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/admin">Dashboard</Link></li>
            <li><Link href="/admin/users" className="active">Users</Link></li>
          </ul>
        </nav>
      </header>

      <section className="main">
        <div className="admin-sub-page" style={{margin:"0 auto"}}>
          <h1 style={{ textAlign: "center", color: "#333" }}>Quản lý người dùng</h1>
          <table width="100%" border={1} style={{ borderCollapse: "collapse", marginTop: "20px" , textAlign: "center" , background: "#f9f9f9"}}>
            <thead style={{ background: "#f4f4f4" }}>
              <tr>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Quyền hạn</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={index} style={{ textAlign: "center" }}>
                  <td style={{ padding: "10px" }}>{u.full_name}</td>
                  <td style={{ padding: "10px" }}>{u.email}</td>
                  <td style={{ padding: "10px", fontWeight: "bold" , color: u.role === "admin" ? "green" : "blue" }}>
                    {u.role?.toUpperCase() || "USER"}
                  </td>
                  <td style={{ padding: "10px" }}>
                    <button onClick={() => toggleRole(u.email)} style={{ marginRight: "10px" }}>Đổi quyền</button>
                    <button onClick={() => deleteUser(u.email)} style={{ color: "red" }}>Xóa</button>
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