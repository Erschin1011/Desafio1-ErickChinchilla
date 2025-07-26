"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/utils/auth";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const result = registerUser(username, password);
    if (result.success) {
      router.push("/login");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleRegister}>
        <h2>Registro</h2>
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
        <button className="auth-button" type="submit">Registrar</button>
        <p className="auth-switch">
          ¿Ya tienes una cuenta?{" "}
          <span onClick={() => router.push("/login")} className="link">
            Iniciar sesión
          </span>
        </p>
      </form>
    </div>
  );
}
