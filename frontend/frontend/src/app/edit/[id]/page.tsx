"use client";

import { useParams } from "next/navigation";
import FormEdit from "../../../components/edit";
import Header from "../../../components/header";

export default function Edit() {
    const params = useParams();
    const id = Number(params.id); // obtiene el id desde la URL
    console.log(id)

    return (
        <div>
            <Header />
            <FormEdit id={id} />
        </div>
    );
}
