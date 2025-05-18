import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from 'react-router-dom';
// import $ from 'jquery';
import './notificaciones.css';
import './btnMenuStyle.css';
import './menuStyle.css';
import './popupStyle.css';



const Inicio = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = sessionStorage.getItem('token');
            if (!token) {
              throw new Error('No token found');
            }
    
            const response = await fetch('http://localhost:5000/principal', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            });
    
            if (!response.ok) {
              throw new Error('Unauthorized');
            }
    
            const data = await response.json();
            setUserData(data)
    
          } catch (error) {
            console.error("Error:", error.message);
            if (error.message === 'Unauthorized' || error.message === 'No token found') {
              sessionStorage.removeItem('token');
              navigate('/');
            }
          }
        };
    
        fetchData();
    }, [navigate]);

    const logout = () => {
        sessionStorage.removeItem("token");
        navigate("/")
    };

    const menuHeader = () => {
        return (
            <>
                <header className="mainMenu default">
                    <a href="./principal" className="hamburger responsive" style={{ marginTop: "0px" }}>
                        <input type="checkbox" />
                        <svg viewBox="0 0 32 32">
                            <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" />
                            <path className="line" d="M7 16 27 16" />
                        </svg>
                    </a>
    
                    <section className="menuContainer">
                        <h1 className="eNombre" href="#" style={{ fontWeight: "450", color: "white" }}>InvenTech Solutions</h1>
                    </section>
    
                    <section className="nombreUsuario">
                        <div className="parteNombreUsuario">
                            <p className="usuarioName">{userData ? userData.Name : 'Loading...'}</p>
                            <a href="./perfil">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </a>
         
                        </div>
                        <a id="btnSalir" onClick={logout} style={{ textDecoration: "none" }}>Cerrar sesión</a>
                    </section>
                </header>
    
                <header className="mainMenu responsive" style={{ display: 'none' }}>
                    <a href="./principal" className="hamburger">
                        <input type="checkbox" />
                        <svg viewBox="0 0 32 32">
                            <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" />
                            <path className="line" d="M7 16 27 16" />
                        </svg>
                    </a>
    
                    <section className="nombreUsuario">
                        <div className="parteNombreUsuario">
                            <p className="usuarioName">{userData ? userData.Name: 'Loading...'}</p>
                            <a href="./perfil">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </a>
                        </div>
                        <a id="btnSalir" onClick={logout} style={{ textDecoration: "none" }}>Cerrar sesión</a>
                    </section>
                </header>
            </>
        );
    }
    const [popupVisible, setPopupVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedArea, setSelectedArea] = useState(null);
    const [areaData, setAreaData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const abrirPopup = async (area) =>{
        setSelectedArea(area);
        setIsLoading(true);
        try{
            const response = await fetch(`/get-objetos?area=${area.id}`);
            const data = await response.json();
            setAreaData(data);
            setPopupVisible(true);

        }catch (error){
            console.error("Error fetching area data:", error);
        }finally{
            setIsLoading(false);
        }

    }
    const cerrarPopup = () => {
        setPopupVisible(false);
        setSelectedArea(null);
        setAreaData([]);
    }

    //const abrirPopup = () => setPopupVisible(true);
    //const cerrarPopup = () => setPopupVisible(false);

    // const data = [
    //     { id: "1263", nombre: "Cable Ethernet", descripcion: "10 gigabits con hasta 250 MHz", cantidad: 10 },
    //     { id: "1264", nombre: "Cable HDMI", descripcion: "HDMI 2.1, 8K a 60Hz", cantidad: 5 },
    //     { id: "1265", nombre: "Router TP-Link", descripcion: "TP-Link Archer AX73", cantidad: 3 },
    //     { id: "1266", nombre: "Switch TP-Link", descripcion: "TP-Link TL-SG108E", cantidad: 8 },
    //     { id: "1267", nombre: "Access Point TP-Link", descripcion: "TP-Link EAP245 V3", cantidad: 4 },
    //     { id: "1268", nombre: "Cable de red UTP Cat6", descripcion: "Cable de red UTP Cat6 de 30 metros", cantidad: 15 },
    //     { id: "1269", nombre: "Router Netgear Nighthawk RAX80", descripcion: "Router Netgear Nighthawk RAX80 con Wi-Fi 6 y 8 puertos Ethernet", cantidad: 2 },
    //     { id: "1270", nombre: "Switch Cisco SG350-10-K9-NA", descripcion: "Switch Cisco SG350-10-K9-NA y administración avanzada", cantidad: 6 },
    //     { id: "1271", nombre: "Cable Ethernet", descripcion: "10 gigabits con hasta 250 MHz", cantidad: 10 },
    //     { id: "1272", nombre: "Cable HDMI", descripcion: "HDMI 2.1, 8K a 60Hz", cantidad: 5 },
    //     { id: "1273", nombre: "Router TP-Link", descripcion: "TP-Link Archer AX73", cantidad: 3 },
    //     { id: "1274", nombre: "Switch TP-Link", descripcion: "TP-Link TL-SG108E", cantidad: 8 },
    //     { id: "1275", nombre: "Access Point TP-Link", descripcion: "TP-Link EAP245 V3", cantidad: 4 },
    //     { id: "1276", nombre: "Cable de red UTP Cat6", descripcion: "Cable de red UTP Cat6 de 30 metros", cantidad: 15 },
    //     { id: "1277", nombre: "Router Netgear Nighthawk RAX80", descripcion: "Router Netgear Nighthawk RAX80 con Wi-Fi 6 y 8 puertos Ethernet", cantidad: 2 },
    //     { id: "1278", nombre: "Switch Cisco SG350-10-K9-NA", descripcion: "Switch Cisco SG350-10-K9-NA y administración avanzada", cantidad: 6 },
    // ];

    const columns = [
        { name: 'ID', selector: row => row.id, sortable: true },
        { name: 'Articulo', selector: row => row.nombre, sortable: true },
        { name: 'Descripción', selector: row => row.descripcion, sortable: true },
        { name: 'Cantidad Disponible', selector: row => row.cant_disp, sortable: true },
    ];

    const filteredData = areaData.filter((item) =>
        Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(searchText.toLowerCase())
    );


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
                    <h1 className="mainTitulo">{selectedArea?.name}</h1>

                    <section className="opcionesContainer">
                        <div className="group">
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
                                <g>
                                    <path
                                        d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                                    ></path>
                                </g>
                            </svg>
                            <input className="input" type="search" placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        </div>
                        <div className="optionContainer">
                            {isLoading?(
                                <div className="loadingContainer"> 
                                    <p>Loading data...</p>
                                </div>
                            ):(
                                <div className="tablaContainer">
                                    <DataTable
                                        columns={columns}
                                        data={filteredData}
                                        pagination
                                        highlightOnHover
                                        responsive
                                    />
                            </div>
                            )}

                        </div>
                    </section>
                </div>
            )}

            <section className="cardContainer">
                {userData?.areas.map((area) => (
                    <div key={area.id} className="cardContent" >
                        <h1 style={{alignItems: "center"}}>{area.name}</h1>
                        <button class="btnVerDetalles" onClick={() => abrirPopup(area)} >
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
