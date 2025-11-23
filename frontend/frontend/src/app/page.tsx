import Image from "next/image";
import styles from "./page.module.css";
import LoginComponent from "../components/login";

export default function Home() {
  return (
    <main>
      <LoginComponent></LoginComponent>
    </main>
  )
}
