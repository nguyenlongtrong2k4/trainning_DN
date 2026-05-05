"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const emailInput = (document.getElementById("username") as HTMLInputElement).value;
    const passwordInput = (document.getElementById("password") as HTMLInputElement).value;

    if (emailInput === "admin1@gmail.com" && passwordInput === "123456") {
      localStorage.setItem("user", JSON.stringify({
        full_name: "Administrator",
        email: "admin1@gmail.com",
        role: "admin"
      }));
      alert("Đăng nhập Administrator thành công!");
      window.location.href = "/admin"; 
      return;
    }

    const allUsers = JSON.parse(localStorage.getItem("all_users") || "[]");
    const foundUser = allUsers.find(
      (u: any) => u.email === emailInput && u.password === passwordInput
    );

    if (foundUser) {
      const sessionData = {
        full_name: foundUser.full_name,
        email: foundUser.email,
        role: foundUser.role || "user" 
      };

      localStorage.setItem("user", JSON.stringify(sessionData));

      if (sessionData.role === "admin") {
        alert("Đăng nhập Admin thành công!");
        window.location.href = "/admin";
      } else {
        alert("Đăng nhập thành công!");
        window.location.href = "/";
      }
    } else {
      alert("Tài khoản không tồn tại hoặc sai mật khẩu!");
    }
  };

  return (
    <div className="container">
      <header className="header">
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/admin">🔐 Admin</Link></li>
            <li><Link href="/login">👤 Login</Link></li>
          </ul>
        </nav>
      </header>

      <section className="main">
        <div className="login">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Email:</label>
              <input type="email" id="username" placeholder="admin1@gmail.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" required />
            </div>
            <button type="submit">Login</button>
          </form>
          <p>Chưa có tài khoản? <Link href="/register">Đăng ký ngay</Link></p>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 LT Creative Agency. All rights reserved.</p>
      </footer>
    </div>
  );
}