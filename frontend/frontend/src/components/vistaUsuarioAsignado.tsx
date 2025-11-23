"use client";
import { useEffect, useState } from "react";
import styles from "../components/vista.module.css"

export default function Login() {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const programId = localStorage.getItem("program_id");

    if (programId) {
      fetch(`http://localhost:4000/course/${programId}`)
        .then(res => res.json())
        .then(data => {
          // data es un array, tomamos la posición 0
          if (Array.isArray(data) && data.length > 0) {
            setCourse(data[0]);
          }
        })
        .catch(err => console.error("Error:", err));
    }
  }, []);

  return (
    <div className={styles.contenedor}>
      <h1>Felicidades</h1>
      <p>Has sido asignado:</p>

      <h2>{course ? course.name : "Cargando curso..."}</h2>

      <p>Muy pronto tendrás información de este curso</p>
    </div>
  );
}
