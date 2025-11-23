"use client";
import { useEffect, useState } from "react";
import styles from "../components/vista.module.css"

export default function VistaUsuario() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Estado para feedback: un objeto donde programId → mensaje
  const [feedback, setFeedback] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
          },
          body: JSON.stringify({
            query: `
              query {
                programs(page: 1, filter: "") {
                  total
                  items {
                    id
                    name
                    description
                  }
                }
              }
            `,
          }),
        });

        const data = await res.json();

        if (data.errors) {
          setError("Error en GraphQL");
          console.error(data.errors);
          return;
        }

        setCourses(data.data.programs.items);
      } catch (err) {
        console.error(err);
        setError("Error al conectar con la API");
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // Función para aplicar al curso
  const applyToProgram = async (programId: number) => {
    try {
      const res = await fetch("http://localhost:4000/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ program_id: programId }),
      });

      if (!res.ok) {
        setFeedback((prev) => ({
          ...prev,
          [programId]: "Error al enviar solicitud",
        }));
        return;
      }

      setFeedback((prev) => ({
        ...prev,
        [programId]: "Solicitud enviada con éxito ✔️",
      }));
    } catch (err) {
      console.error(err);
      setFeedback((prev) => ({
        ...prev,
        [programId]: "Error de conexión",
      }));
    }
  };

  if (loading) return <p>Cargando cursos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className={styles.titulo}>Lista de Cursos Disponibles</h1>

      {courses.length === 0 && <p>No hay cursos disponibles.</p>}

<div className={styles.contenedor__curso}>
        {courses.map((course) => (
        <div
          key={course.id}
          className={styles.curso}
        >
          <h2>{course.name}</h2>
          <p>{course.description}</p>

          {feedback[course.id] && (
            <small style={{ color: "green", display: "block", marginBottom: 6 }}>
              {feedback[course.id]}
            </small>
          )}

<div className={styles.contenedor__boton}>
          <button className={styles.boton} onClick={() => applyToProgram(course.id)}>
            Aplicar
          </button>
</div>

        </div>
      ))}
</div>

    </div>
  );
}
