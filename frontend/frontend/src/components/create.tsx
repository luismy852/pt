"use client";

import { useState } from "react";
import styles from "../components/form.module.css"

export default function CursoForm() {
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = localStorage.getItem("token"); // obtener token

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            description: formData.get("description"),
            start_date: formData.get("start_date"),
            status: formData.get("status")
        };

        try {
            const res = await fetch("http://localhost:4000/course", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // enviar token
                },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                // redirigir a /home
                window.location.href = "/home";
            } else {
                const errorData = await res.json();
                setMensaje("Error: " + (errorData.message || "No se pudo crear el curso"));
            }
        } catch (error) {
            console.error(error);
            setMensaje("Error al conectarse al servidor");
        }
    };

    return (
        <div className={styles.contenedor}>
            {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}

            <form className={styles.form} onSubmit={handleSubmit}>
              
                    <label htmlFor="name">Nombre del curso:</label>
                    <input type="text" id="name" name="name" required />
            

                    <label htmlFor="description">Descripción:</label>
                    <input type="text" id="description" name="description" required />


                    <label htmlFor="start_date">Fecha de inicio:</label>
                    <input type="date" id="start_date" name="start_date" required />



                    <label htmlFor="status">Estado:</label>
                    <select id="status" name="status" defaultValue="active" className={styles.select} required>
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                    </select>


                <div className={styles.contenedor__boton}>
                    <button type="submit">Guardar</button>
                </div>
              
            </form>
        </div>
    );
}
