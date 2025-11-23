"use client";
import { useEffect, useState } from "react";

import HeaderComponent from "../../components/header";
import VistaUser from "../../components/vistaUsuario";
import VistaUserAsig from "../../components/vistaUsuarioAsignado";
import Admin from "../../components/admin";

export default function Home() {
  const [role, setRole] = useState<string | null>(null);
  const [programId, setProgramId] = useState<string | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    const savedProgramId = localStorage.getItem("program_id");

    setRole(savedRole);
    setProgramId(savedProgramId);
  }, []);

  const renderView = () => {
    if (!role) return <p>Cargando...</p>;

    if (role === "admin") return <Admin />;

    if (role === "user") {
      if (programId === null || programId === "null") {
        return <VistaUser />;
      } else {
        return <VistaUserAsig />;
      }
    }

    return <p>Rol no reconocido</p>;
  };

  return (
    <main>
      <HeaderComponent />
      {renderView()}
    </main>
  );
}
