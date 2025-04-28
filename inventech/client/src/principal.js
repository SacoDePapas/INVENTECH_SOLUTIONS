import React, { useState, useEffect, useRef } from "react";
import $ from 'jquery';
import './jquery.dataTables.min.css';
import 'datatables.net-dt';
import './notificaciones.css';
import './btnMenuStyle.css';
import './menuStyle.css';
import './popupStyle.css';
// import './popupNotiStyle.css';
// import './tablasStyle.css';

const Inicio = () => {
    const menuHeader = () => {
        return (
            <>
                <header className="mainMenu default">
                    <label className="hamburger responsive" style={{marginTop: "0px"}}>
                        <input type="checkbox" />
                        <svg viewBox="0 0 32 32">
                            <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" />
                            <path className="line" d="M7 16 27 16" />
                        </svg>
                    </label>

                    <section className="menuContainer">
                        <h1 className="eNombre" href="#" style={{fontWeight: "450", color: "white"}}>InvenTech Solutions</h1>
                    </section>
    
                    <section className="nombreUsuario">
                        <div className="parteNombreUsuario">
                            <p className="usuarioName">Francisco Olvera Pérez</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </div>
                        <a id="btnSalir" href="./" style={{textDecoration: "none"}}>Cerrar sesión</a>
                    </section>
                </header>
    
                <header className="mainMenu responsive" style={{ display: 'none' }}>
                    <label className="hamburger">
                        <input type="checkbox" />
                        <svg viewBox="0 0 32 32">
                            <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" />
                            <path className="line" d="M7 16 27 16" />
                        </svg>
                    </label>
    
                    <section className="nombreUsuario">
                        <div className="parteNombreUsuario">
                            <p className="usuarioName">Francisco Olvera Pérez</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                            </svg>
                        </div>
                        <a id="btnSalir" href="./" style={{textDecoration: "none"}}>Cerrar sesión</a>
                    </section>
                </header>
            </>
        );
    }
    const [popupVisible, setPopupVisible] = useState(false);

    const tableRef = useRef(null);

    const abrirPopup = () => setPopupVisible(true);
    const cerrarPopup = () => setPopupVisible(false);

    useEffect(() => {
        if ($.fn.dataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable().destroy();
        }
        $(tableRef.current).DataTable(); // Inicializamos el DataTable
    });

    return (
        <main>
            {menuHeader()}
            {popupVisible && <div className="overlay" onClick={cerrarPopup}></div>}

            {popupVisible && (
                <div className="popupDetalles">
                    <button id="btnCerrarPopup" onClick={cerrarPopup}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h1 className="mainTitulo">Redes</h1>
                    <section className="opcionesContainer">
                        <div className="optionContainer">
                            <div className="tablaContainer">
                                <table id="miTabla3" className="display" ref={tableRef}>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Edad</th>
                                            <th>Ciudad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Juan</td>
                                            <td>25</td>
                                            <td>Ciudad de México</td>
                                        </tr>
                                        <tr>
                                            <td>María</td>
                                            <td>30</td>
                                            <td>Guadalajara</td>
                                        </tr>
                                        <tr>
                                            <td>Carlos</td>
                                            <td>22</td>
                                            <td>Monterrey</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            <section className="cardContainer">
                {['Redes', 'Salones', 'Electronica', 'Mantenimiento'].map((periodo, index) => (
                    <div key={index} className="cardContent" onClick={abrirPopup}>
                        <h1 style={{alignItems: "center"}}>{periodo}</h1>
                        <button class="btnVerDetalles">
                            <h1>Detalles</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                        </button>
                    </div>
                ))}
            </section>
        </main>
    );
};

export default Inicio;
