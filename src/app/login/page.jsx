"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/utils/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const result = loginUser(username, password);
    if (result.success) {
      router.push("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        {error && <p className="error">{error}</p>}
        <input
          className="auth-input"
          placeholder="Usuario"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="auth-input"
          placeholder="Contraseña"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth-button" type="submit">Entrar</button>
        <p className="auth-switch">
          ¿No tienes una cuenta?{" "}
          <span onClick={() => router.push("/register")} className="link">
            Crear cuenta
          </span>
        </p>
      </form>
    </div>
  );
}
