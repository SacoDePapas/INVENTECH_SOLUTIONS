import React, { useState, useRef } from "react";
import "./login.css";

const Login = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setRegister] = useState(false);


    const handleLoginClick = () => {
        window.location.reload();
    };

    const handleSeePassCClick = () => {
        setShowLogin(false);
    };

    const handleRegresarClick = () => {
        setShowLogin(true);
    };

    const handleToggleOrganization = () => {
        setRegister(!showRegister);
    };

    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const handleRegisterClick = () => {
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (password !== confirmPassword || password === "" || confirmPassword === "") {
            import('sweetalert2').then(Swal => {
                Swal.default.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Las contraseñas no coinciden. Por favor, verifica e intenta de nuevo.',
                });
            });
        } else {
            import('sweetalert2').then(Swal => {
                Swal.default.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    text: 'Tu cuenta ha sido creada exitosamente.',
                });
            });
            setShowLogin(true);
            setRegister(false);
        }
    };

    return (
        <div className="container">
            <div className="left-section">
                {showLogin ? (
                    <div className="parteSection login">
                        <h2 style={{ textAlign: "center" }}>Inicia sesión</h2>
                        <br />
                        <hr />
                        <br />
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
                                ¿No tienes cuenta? <strong>Regístrate</strong>
                            </h5>
                            <br /><br /><br /><hr /><br />
                            <h5 id="btnCorreoContacto"></h5>
                            <h5 id="btnCorreoContacto">
                                <a href="mailto:mail@outlook.com" style={{ textDecoration: "none", color: "inherit" }}>
                                    ¿Quieres registrar tu organización?  <strong>  Contactanos</strong>
                                </a>
                            </h5>
                        </section>
                    </div>
                ) : (
                    <div className="parteSection register">
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

                        <h2 style={{ textAlign: "left" }}>
                            {showRegister ? "Registro de Organización Escolar" : "Registro de Organización"}
                        </h2>

                        <h5 id="btnSeePassC" onClick={handleToggleOrganization} style={{ textAlign: "left" }}>
                            {showRegister ? "Ingresar como " : "Ingresar como "}
                            <strong>{showRegister ? "Organización" : "Organización Escolar"}</strong>
                        </h5>
                        <br /> <hr /> <br />
                        <section className="formContainer">
                            {showRegister ? (
                                <>
                                     <div className="parteForm">
                                        <label>Nombre completo</label>
                                        <input id="inputUsuarioC" type="text" placeholder="Ingresa tu nombre completo" />
                                    </div>
                                    <div className="parteForm">
                                        <label>Correo electronico</label>
                                        <input id="inputName" type="text" placeholder="Ingresa tu dirección de correo electronico" />
                                    </div>
                                    <div className="parteForm">
                                        <label>Expediente</label>
                                        <div style={{ display: "flex", alignItems: "center"}}>
                                            <input id="inputOrgName" type="text" placeholder="Ingresa el expediente" style={{width: "70%"}}/>
                                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10z" fill="#0D0D0D"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="parteForm">
                                        <label>Contraseña</label>
                                        <input ref={passwordRef} id="inputPassC" type="password" placeholder="••••••••" />
                                    </div>
                                    <div className="parteForm">
                                        <label>Confirmar contraseña</label>
                                        <input ref={confirmPasswordRef} id="inputPassConfirmC" type="password" placeholder="••••••••" />
                                    </div>
                                    <div className="parteForm">
                                        <label>Clave organización</label>
                                        <div style={{ display: "flex", alignItems: "center"}}>
                                            <input id="inputOrgName" type="text" placeholder="Ingresa la clave" style={{width: "60%"}}/>
                                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10z" fill="#0D0D0D"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="parteForm">
                                        <select id="comboBoxOrgType">
                                            <option value="ingenieria">Facultad de Ingenieria</option>
                                            <option value="ingenieria">Facultad de Ingenieria</option>
                                            <option value="nonprofit">--</option>
                                        </select>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="parteForm">
                                        <label>Nombre completo</label>
                                        <input id="inputUsuarioC" type="text" placeholder="Ingresa tu nombre completo" />
                                    </div>
                                    <div className="parteForm">
                                        <label>Correo electronico</label>
                                        <input id="inputName" type="text" placeholder="Ingresa tu dirección de correo electronico" />
                                    </div>
                                    <div className="parteForm">
                                        <label>Contraseña</label>
                                        <input ref={passwordRef} id="inputPassC" type="password" placeholder="••••••••" />
                                    </div>
                                    <div className="parteForm">
                                        <label>Confirmar contraseña</label>
                                        <input ref={confirmPasswordRef} id="inputPassConfirmC" type="password" placeholder="••••••••" />
                                    </div>
                                    <div className="parteForm">
                                        <label>Clave organización</label>
                                        <div style={{ display: "flex", alignItems: "center"}}>
                                            <input id="inputOrgName" type="text" placeholder="Ingresa la clave" style={{width: "60%"}}/>
                                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10z" fill="#0D0D0D"/>
                                            </svg>
                                        </div>
                                    </div>
                                </>
                            )}
                            <button id="btnRegister" onClick={handleRegisterClick}>Registrarse</button>
                        </section>
                    </div>
                )}
            </div>
            <div className="right-section">
                <div className="logo-container">
                    <h1 className="logo-text1">Inventario bajo control</h1>
                    <h1 className="logo-text2">Disponibilidad y reportes</h1>
                    <h1 className="logo-text3">en tiempo real.</h1>
                    <br /> <br />
                    <img src={require('./img/cajas.jpg')} alt="Logo" className="logo" />
                </div>
            </div>
        </div>
    );
};

export default Login;