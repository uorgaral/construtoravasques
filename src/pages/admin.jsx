import React, {useState} from "react";
import supabase from "../utils/supabase_client";
import {Link, useNavigate } from "react-router-dom"

export default function Login(){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: senha,
        })

        if(error){
            setMessage(error.message);
            return;
        }

        if (data) {
            navigate("/admin/dashboard")
        }

        setEmail("");
        setSenha("");
    };

    return(
        <div>
            <h2>Login</h2>
            {message && <span>{message}</span>}
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="email"
                    required
                />
                <input
                    onChange={(e) => setSenha(e.target.value)}
                    value={senha}
                    type="password"
                    placeholder="senha"
                    required
                />
                <button type="submit">Acessar página de administrador</button>
            </form>
        </div>

    )
}