"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const fullName = (document.getElementById("fullName") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const address = (document.getElementById("address") as HTMLInputElement).value;
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value;

    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    const allUsers = JSON.parse(localStorage.getItem("all_users") || "[]");

    const isExist = allUsers.some((u: any) => u.email === email || u.username === username);
    if (isExist) {
      alert("Email hoặc Username đã được sử dụng!");
      return;
    }

    const newUser = {
      full_name: fullName,
      phone,
      email,
      address,
      username,
      password,
      role: "user",
    };

    allUsers.push(newUser);
    localStorage.setItem("all_users", JSON.stringify(allUsers));

    alert("Đăng ký thành công! Mời bạn đăng nhập.");
    router.push("/login");
  };

  return (
    <div className="container">
      <header className="header">
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/works">Works</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li>
              <Link href="/admin">🔐</Link> | <Link href="/login">👤</Link>
              {user && (
                <>
                  {" | "} Hello, {user.full_name}
                  {" | "} <button onClick={handleLogout} style={{ color: "red", background: "none", border: "none", cursor: "pointer" }}>Logout</button>
                </>
              )}
            </li>
          </ul>
        </nav>
      </header>

      <section className="main">
        <div className="register">
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name:</label>
              <input type="text" id="fullName" required />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input type="tel" id="phone" required />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" id="email" required />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input type="text" id="address" required />
            </div>
            <div className="form-group">
              <label>Username:</label>
              <input type="text" id="username" required />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" id="password" required />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input type="password" id="confirmPassword" required />
            </div>
            <button type="submit">Register</button>
          </form>
          <p>Đã có tài khoản? <Link href="/login">Đăng nhập</Link></p>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 LT Creative Agency. All rights reserved.</p>
      </footer>
    </div>
  );
}