"use client";
import { useState } from "react";
import styles from "./login.module.css";
export default function Login() {

  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita recargar la página

    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log(data)
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);
    localStorage.setItem("program_id", data.user.program_id);
    window.location.href = "/home"; 
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
    }
  };

  return (
    <div className={styles.contenedor}>
      <img className={styles.logo} src="/logo.png" alt="" />

      <form className={styles.formulario} onSubmit={handleSubmit}>
        <label htmlFor="user">Usuario:</label>
        <input type="text" id="user"value={username}
          onChange={(e) => setUser(e.target.value)} />

        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password"            value={password}
          onChange={(e) => setPassword(e.target.value)} />

<div className={styles.contenedor__boton}>
        <button>Ingresar</button>

</div>

      </form>
    </div>

    
  );
}