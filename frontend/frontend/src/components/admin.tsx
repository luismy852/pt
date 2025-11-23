"use client";
import Link from "next/link";
import styles from "./admin.module.css";
import { useEffect, useState } from "react";

export default function Admin() {
    const [cursos, setCursos] = useState([]);
    const [pendientes, setPendientes] = useState([]);
    const [usuarios, setUsuarios] = useState([]); // nueva
    const [mensaje, setMensaje] = useState("");

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    // cargar cursos
    const fetchCursos = async () => {
        try {
            const res = await fetch("http://localhost:4000/course", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            setCursos(data);
        } catch (error) {
            console.error("Error cargando cursos:", error);
        }
    };

    // cargar request pendientes
    const fetchPendientes = async () => {
        try {
            const res = await fetch("http://localhost:4000/request?status=pendiente", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            setPendientes(data);
        } catch (error) {
            console.error("Error cargando solicitudes:", error);
        }
    };

    // cargar usuarios con program_id asignado
    const fetchUsuarios = async () => {
        try {
            const res = await fetch("http://localhost:4000/users", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();

            // filtrar solo usuarios con program_id y role 'user'
            const filtrados = data.filter((u: any) => u.program_id !== null && u.role === "user");
            setUsuarios(filtrados);
        } catch (error) {
            console.error("Error cargando usuarios:", error);
        }
    };

    // eliminar curso
    const borrarCurso = async (id: number) => {
        if (!confirm("¿Seguro que deseas eliminar este curso?")) return;

        try {
            await fetch(`http://localhost:4000/course/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            setMensaje("Curso eliminado");
            fetchCursos();
        } catch (e) {
            console.error("Error eliminando curso:", e);
        }
    };

    // asignar request
    const asignar = async (id: number) => {
        try {
            await fetch(`http://localhost:4000/request/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status: "aprobado" })
            });
            setMensaje("Solicitud asignada");
            fetchPendientes();
            fetchUsuarios(); // actualizar lista de usuarios asignados
        } catch (e) {
            console.error("Error asignando curso:", e);
        }
    };

    useEffect(() => {
        fetchCursos();
        fetchPendientes();
        fetchUsuarios(); // cargar usuarios al iniciar
    }, []);

    return (
        <div>
            <h1 className={styles.titulo}>Administrador</h1>
            {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}

            <div className={styles.create}>
                <h2>Cursos</h2>
                <Link href="/form" className={styles.create__boton} >Crear curso</Link>
            </div>
            
            <div className={styles.cursos}>
            {cursos.map((curso: any) => (
                <div className={styles.curso} key={curso.id}>
                    <p>{curso.name}</p>
                    <div className={styles.opciones}>
                    <Link href={`/edit/${curso.id}`} className={styles.edit}>Editar</Link>
                    <button onClick={() => borrarCurso(curso.id)}>X</button>
                    </div>

                </div>
            ))}
            </div>


            <h2 className={styles.sub}>Estudiantes por asignar</h2>
            <div className={styles.peticiones}>
                {pendientes.length === 0 && <p>No hay solicitudes pendientes</p>}
                {pendientes.map((req: any) => (
                <div className={styles.peticion} key={req.id}>
                    <p>Estudiante: {req.user_id}</p>
                    <p>Curso ID: {req.program_id}</p>
                    <button onClick={() => asignar(req.id)}>Asignar</button>
                </div>
            ))}
            </div>


            <h2 className={styles.sub}>Estudiantes asignados</h2>

            <div className={styles.asignados}>
            {usuarios.length === 0 && <p>No hay estudiantes asignados</p>}
            {usuarios.map((u: any) => (
                <div className={styles.asignado} key={u.id}>
                    <p>Nombre: {u.full_name}</p>
                    <p>Curso ID: {u.program_id}</p>
                </div>
            ))}
            </div>

        </div>
    );
}
