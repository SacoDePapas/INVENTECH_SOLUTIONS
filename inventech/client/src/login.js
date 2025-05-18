import React, { useState, useRef } from "react";
import "./login.css";
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setRegister] = useState(false);


    const userRef = useRef(null);
    const passRef = useRef(null);

    const handleLoginClick = async() => {
        
        const user = userRef.current?.value;
        const pass = passRef.current?.value; 
        
        try{
            let response;
            response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user,
                    pass: pass

                }),
            });
            const data = await response.json();
        
            if (!response.ok) {
                throw new Error(data.message || 'Error en el registro');
            }
    
            // Success case
            const { default: Swal } = await import('sweetalert2');
            await Swal.fire({
                icon: 'success',
                title: 'Bienvenido',
                text: data.message,
            });
            sessionStorage.setItem('token',data.access_token)
            switch(data.user_role){
                case 'admin':
                    navigate("/admin");
                    break;
                case 'User':
                    navigate("/principal")
                    break;
                case 'Encargado':
                    navigate("/encargado")
                    break;
                default:
                    navigate('/')

            }
        }catch (error) {
            const { default: Swal } = await import('sweetalert2');
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Usuario o contraseña incorrecto',
            });
        }
        
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

    const [organizations, setOrganizations] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const OrgRef1 = useRef(null)
    const OrgRef2 = useRef(null)


    const handleSearch = async () => {
        setDropdownVisible(false);
        setOrganizations([]);
        const orgCode1 = OrgRef1.current?.value;
        const orgCode2 = OrgRef2.current?.value; 
        try{
            if(orgCode1 !== null && orgCode1 !== undefined){
                
                const response = await fetch(`http://localhost:5000/search_org?code=${orgCode1}`);
                const data = await response.json();
                setOrganizations(Array.isArray(data) ? data : []);
                
            }else if (orgCode2 !== null && orgCode2 !== undefined){
                
                const response = await fetch(`http://localhost:5000/search_org?code=${orgCode2}`);
                const data = await response.json();
                setOrganizations(Array.isArray(data) ? data : []);
            }else{
                console.error("No valid search input");
                return;
            }
            setDropdownVisible(true);
            
            
        }catch (error){
            console.error("Error fetching organization data:", error);
            setOrganizations([]);
        }
    }

    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const NameRef = useRef(null)
    const IdRef = useRef(null)
    const orgSelectRef = useRef(null);

    const handleRegisterClick = async () => {
        const password = passwordRef.current?.value || '';
        const confirmPassword = confirmPasswordRef.current?.value || '';
        const Name = NameRef.current?.value || '';
        const selectedOrgId = orgSelectRef.current?.value || '';
        const Id = IdRef.current?.value || '';
        const orgCode1 = OrgRef1.current?.value;
        const orgCode2 = OrgRef2.current?.value;
    

        if (password !== confirmPassword || !password || !confirmPassword) {

            import('sweetalert2').then(Swal => {
                Swal.default.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Las contraseñas no coinciden. Por favor, verifica e intenta de nuevo.',
                });
            });
            return;
        }
        try{
            let response;
            if (orgCode1 !== null && orgCode1 !== undefined) {
                response = await fetch('http://localhost:5000/create_user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: Id,
                        name: Name,
                        password: password,
                        Id_facultad: selectedOrgId,  // For orgCode1
                        Id_Area: ''                 // Empty for orgCode1
                    }),
                });
            } else if (orgCode2 !== null && orgCode2 !== undefined) {
                response = await fetch('http://localhost:5000/create_user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: Id,
                        name: Name,
                        password: password,
                        Id_facultad: '',             // Empty for orgCode2
                        Id_Area: selectedOrgId       // For orgCode2
                    }),
                });
            }else {
                throw new Error('No se proporcionó código de organización');
            } 
            const data = await response.json();
        
            if (!response.ok) {
                throw new Error(data.message || 'Error en el registro');
            }
    
            // Success case
            const { default: Swal } = await import('sweetalert2');
            await Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Tu cuenta ha sido creada exitosamente.',
            });
            
            setShowLogin(true);
            setRegister(false);             
        } catch (error) {
            const { default: Swal } = await import('sweetalert2');
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Hubo un problema al registrar. Por favor, intenta de nuevo.',
            });
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
                                <label>Expediente/Num Empleado</label>
                                <input ref={userRef}id="inputUsuario" type="text" placeholder="Ingresa tu Expediente/Num Empleado" />
                            </div>
                            <div className="parteForm">
                                <label>Contraseña</label>
                                <input ref={passRef} id="inputPass" type="password" placeholder="••••••••" />
                            </div>
                            <button id="btnLogin" onClick={handleLoginClick}>Ingresar</button>
                            <h5 id="btnSeePassC" onClick={handleSeePassCClick}>
                                ¿No tienes cuenta? <strong>Regístrate</strong>
                            </h5>
                            <br /><br /><br /><hr /><br />
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
                                        <label>Expediente</label>
                                        <input ref={IdRef} id="Id" type="text" placeholder="Ingresa tu dirección de correo electronico" />
                                    </div>
                                     <div className="parteForm">
                                        <label>Nombre completo</label>
                                        <input ref={NameRef} id="inputUsuarioC" type="text" placeholder="Ingresa tu nombre completo" />
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
                                            <input ref={OrgRef1} id="inputOrgName" type="text" placeholder="Ingresa la clave" style={{width: "60%"}}/>
                                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleSearch} style={{ cursor: "pointer" }} >
                                            <path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10z" fill="#0D0D0D"/>
                                            </svg>
                                        </div>
                                    </div>
                                    {dropdownVisible && organizations.length > 0 && (

                                        <div className="parteForm">
                                            <select ref={orgSelectRef} id="comboBoxOrgType">
                                                <option value="">Selecciona un Area/Facultad</option>
                                                {organizations.map((org, index) => (
                                                    <option key={index} value={org.id}>{org.name}</option>
                                                ))}
                                            </select>

                                        </div>

                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="parteForm">
                                        <label>Numero Empleado/Tag</label>
                                        <input ref={IdRef} id="Id" type="text" placeholder="Ingresa tu dirección de correo electronico" />
                                    </div>
                                    <div className="parteForm">
                                        <label>Nombre completo</label>
                                        <input ref={NameRef} id="inputUsuarioC" type="text" placeholder="Ingresa tu nombre completo" />
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
                                            <input ref={OrgRef2} id="inputOrgName" type="text" placeholder="Ingresa la clave" style={{width: "60%"}}/>
                                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleSearch} style={{ cursor: "pointer" }}>
                                            <path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10z" fill="#0D0D0D"/>
                                            </svg>
                                        </div>
                                    </div>
                                    {dropdownVisible && organizations.length > 0 && (
                                        <div className="parteForm">
                                            <select ref={orgSelectRef} id="comboBoxOrgType">
                                                <option value="">Selecciona un Area/Facultad</option>
                                                {organizations.map((org, index) => (
                                                    <option key={index} value={org.id}>{org.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
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