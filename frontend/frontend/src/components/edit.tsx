"use client";

import { useState, useEffect } from "react";
import styles from "../components/form.module.css"


interface Curso {
    name: string;
    description: string;
    start_date: string;
    status: string;
}

interface Props {
    id: number; // id del curso a editar
}

export default function EditCursoForm({ id }: Props) {
    const [curso, setCurso] = useState<Curso | null>(null); // null mientras carga
    const [mensaje, setMensaje] = useState("");

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    // cargar información del curso
    useEffect(() => {
        const fetchCurso = async () => {
            try {
                const res = await fetch(`http://localhost:4000/course/${id}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const data = await res.json();

                if (Array.isArray(data) && data.length > 0) {
                    const cursoData = data[0];
                    setCurso({
                        name: cursoData.name,
                        description: cursoData.description,
                        start_date: cursoData.start_date.split("T")[0], // formatear para input date
                        status: cursoData.status
                    });
                } else {
                    console.error("Curso no encontrado");
                    setMensaje("Curso no encontrado");
                }
            } catch (error) {
                console.error("Error cargando curso:", error);
                setMensaje("Error al cargar el curso");
            }
        };

        fetchCurso();
    }, [id, token]);

    if (!curso) return <p>Cargando curso...</p>; // mensaje mientras carga

    // manejar submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:4000/course/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(curso)
            });

            if (res.ok) {
                window.location.href = "/home";
            } else {
                const errorData = await res.json();
                setMensaje("Error: " + (errorData.message || "No se pudo actualizar el curso"));
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
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={curso.name}
                        onChange={(e) => setCurso({ ...curso, name: e.target.value })}
                        required
                    />
  

                
                    <label htmlFor="description">Descripción:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={curso.description}
                        onChange={(e) => setCurso({ ...curso, description: e.target.value })}
                        required
                    />
              

              
                    <label htmlFor="start_date">Fecha de inicio:</label>
                    <input
                        type="date"
                        id="start_date"
                        name="start_date"
                        value={curso.start_date}
                        onChange={(e) => setCurso({ ...curso, start_date: e.target.value })}
                        required
                    />
                

             
                    <label htmlFor="status">Estado:</label>
                    <select
                        id="status"
                        name="status"
                        value={curso.status}
                        onChange={(e) => setCurso({ ...curso, status: e.target.value })}
                        required
                    >
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                    </select>
            

<div className={styles.contenedor__boton}>

    <button type="submit">Actualizar</button>
</div>
                
            </form>
        </div>
    );
}
