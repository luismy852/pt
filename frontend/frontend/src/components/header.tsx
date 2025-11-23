"use client"; 
import styles from "./header.module.css";

export default function Login() {

    const cerrarSesion = () => {
        // eliminar items específicos
        localStorage.removeItem("token");
        localStorage.removeItem("program_id");
        localStorage.removeItem("role");

        // opcional: redirigir al login
        window.location.href = "/"; 
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo__contenedor}>
                <img src="/logo.png" alt="" />
                <h1>Bienvenido</h1>
            </div>

            <a href="#" onClick={cerrarSesion}>Cerrar sesión</a>
        </header>
    );
}
