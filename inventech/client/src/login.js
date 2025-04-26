import React, { useState } from "react";
import "./login.css";

const Login = () => {
    const [showLogin, setShowLogin] = useState(true);

    const handleLoginClick = () => {
        window.location.reload();
    };

    const handleSeePassCClick = () => {
        setShowLogin(false);
    };

    const handleRegresarClick = () => {
        setShowLogin(true);
    };

    const handlePassCClick = () => {
        setShowLogin(true);
    };

    return (
        <div className="container">
            <div className="left-section">
                {showLogin ? (
                    <div className="parteSection login">
                        <h2 style={{ textAlign: "center" }}>Inicia sesión</h2>
                        <p>Ingresa tu información para continuar</p>
                        <section className="formContainer">
                            <div className="parteForm">
                                <label>Usuario</label>
                                <input id="inputUsuario" type="text" placeholder="Ingresa tu usuario" />
                            </div>
                            <div className="parteForm">
                                <label>Contraseña</label>
                                <input id="inputPass" type="password" placeholder="••••••••" />
                            </div>
                            <button id="btnLogin" onClick={handleLoginClick}>Ingresar</button>
                            <h5 id="btnSeePassC" onClick={handleSeePassCClick}>
                                ¿Olvidaste tu contraseña? <strong>Cambia tu contraseña</strong>
                            </h5>
                            <p className="correoAyuda">
                            ¿Quieres registrar tu organización? <br /><br />
                                <strong>Contactanos</strong>
                            </p>
                        </section>
                    </div>
                ) : (
                    <div className="parteSection passC">
                        <svg
                            id="btnRegresar"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                            onClick={handleRegresarClick}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        <h2 style={{ textAlign: "center" }}>Cambiar contraseña</h2>
                        <p>Ingresa tu información para continuar</p>
                        <section className="formContainer">
                            <div className="parteForm">
                                <label>Usuario</label>
                                <input id="inputUsuarioC" type="text" placeholder="Ingresa tu usuario" />
                            </div>
                            <div className="parteForm">
                                <label>Nueva contraseña</label>
                                <input id="inputPassC" type="password" placeholder="••••••••" />
                            </div>
                            <div className="parteForm">
                                <label>Confirmar contraseña</label>
                                <input id="inputPassC" type="password" placeholder="••••••••" />
                            </div>
                            <button id="btnPassC" onClick={handlePassCClick}>Cambiar</button>
                            <p className="correoAyuda">
                            </p>
                        </section>
                    </div>
                )}
            </div>
            <div className="right-section">
                <div className="grid-overlay"></div>
            </div>
        </div>
    );
};

export default Login;