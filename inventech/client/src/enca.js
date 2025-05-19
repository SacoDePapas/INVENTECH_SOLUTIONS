import React, { useState, useEffect  } from "react";
import DataTable from "react-data-table-component";
import './enca.css';

const Radio = () => {
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
                        <a id="btnSalir" href="./" style={{ textDecoration: "none" }}>Cerrar sesión</a>
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
                        <a id="btnSalir" href="./" style={{ textDecoration: "none" }}>Cerrar sesión</a>
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
    const [formData, setFormData] = useState({ expediente: '', detalles: '', cantidad: 1 });
    const [selectedOption, setSelectedOption] = useState("tabs");
    const [userData, setUserData] = useState(null);
    const [search, setSearch] = useState("");
    const [data, setData] = useState({
        tabs: [
            { id: "1263", name: "Cable Ethernet", descripcion: "10 gigabits con hasta 250 MHz", cantidad: 10 },
            { id: "1264", name: "Cable HDMI", descripcion: "HDMI 2.1, 8K a 60Hz", cantidad: 5 },
            { id: "1265", name: "Router TP-Link", descripcion: "TP-Link Archer AX73", cantidad: 3 },
            { id: "1266", name: "Switch TP-Link", descripcion: "TP-Link TL-SG108E", cantidad: 8 },
            { id: "1267", name: "Access Point TP-Link", descripcion: "TP-Link EAP245 V3", cantidad: 4 },
            { id: "1268", name: "Cable de red UTP Cat6", descripcion: "Cable de red UTP Cat6 de 30 metros", cantidad: 15 },
            { id: "1269", name: "Router Netgear Nighthawk RAX80", descripcion: "Router Netgear Nighthawk RAX80 con Wi-Fi 6 y 8 puertos Ethernet", cantidad: 2 },
            { id: "1270", name: "Switch Cisco SG350-10-K9-NA", descripcion: "Switch Cisco SG350-10-K9-NA y administración avanzada", cantidad: 6 },
            { id: "1271", name: "Cable Ethernet", descripcion: "10 gigabits con hasta 250 MHz", cantidad: 10 },
            { id: "1272", name: "Cable HDMI", descripcion: "HDMI 2.1, 8K a 60Hz", cantidad: 5 },
            { id: "1273", name: "Router TP-Link", descripcion: "TP-Link Archer AX73", cantidad: 3 },
            { id: "1274", name: "Switch TP-Link", descripcion: "TP-Link TL-SG108E", cantidad: 8 },
            { id: "1275", name: "Access Point TP-Link", descripcion: "TP-Link EAP245 V3", cantidad: 4 },
            { id: "1276", name: "Cable de red UTP Cat6", descripcion: "Cable de red UTP Cat6 de 30 metros", cantidad: 15 },
            { id: "1277", name: "Router Netgear Nighthawk RAX80", descripcion: "Router Netgear Nighthawk RAX80 con Wi-Fi 6 y 8 puertos Ethernet", cantidad: 2 },
            { id: "1278", name: "Switch Cisco SG350-10-K9-NA", descripcion: "Switch Cisco SG350-10-K9-NA y administración avanzada", cantidad: 6 },
        ],
        and: [
            { id: "1263", name: "Cable Ethernet", descripcion: "10 gigabits con hasta 250 MHz", cantidad: 10 },
            { id: "1264", name: "Cable HDMI", descripcion: "HDMI 2.1, 8K a 60Hz", cantidad: 5 },
            { id: "1265", name: "Router TP-Link", descripcion: "TP-Link Archer AX73", cantidad: 3 },
            { id: "1266", name: "Switch TP-Link", descripcion: "TP-Link TL-SG108E", cantidad: 8 },
            { id: "1267", name: "Access Point TP-Link", descripcion: "TP-Link EAP245 V3", cantidad: 4 },
        ],
        more: [
            { id: "1263", name: "Cable Ethernet", expediente: "307040", cantidad: 1 },
            { id: "1264", name: "Cable HDMI", expediente: "306290", cantidad: 5 },
            { id: "1265", name: "Router TP-Link", expediente: "305046", cantidad: 3 },
            { id: "1266", name: "Switch TP-Link", expediente: "286589", cantidad: 1 },
            { id: "1267", name: "Access Point TP-Link", expediente: "312025", cantidad: 4 },
        ]
    });

    const [editData, setEditData] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setUserData({ Name: "Encargado" });
        }, 500);
    }, []);

    // const handleRadioChange = (value) => {
    //     setSelectedOption(value);
    //     setFormData({ name: "", area: "" });
    //     setEditData(null);
    // };

    const getData = () => data[selectedOption] || [];

    // const filteredData = getData().filter(item =>
    //     item.name.toLowerCase().includes(search.toLowerCase())
    // );
    const filteredData = getData().filter((item) =>
        Object.values(item).join(' ').toLowerCase().includes(searchText.toLowerCase())
    );

    const handleEdit = (row) => {
        setFormData({ name: row.name, area: row.area || "" });
        setEditData(row);
    };

    const handleRadioChange = (option) => {
        setSelectedOption(option);
    };

    const abrirPopup = async (area) => {
        setSelectedArea(area);
        setIsLoading(true);
        try {
        const response = await fetch(`/get-objetos?area=${area.id}`);
        const data = await response.json();
        setAreaData(data);
        setPopupVisible(true);
        } catch (error) {
        console.error("Error fetching area data:", error);
        } finally {
        setIsLoading(false);
        }
    };

    const cerrarPopup = () => {
        setPopupVisible(false);
        setSelectedArea(null);
        setAreaData([]);
        setFormData({ expediente: '', detalles: '', cantidad: 1 });
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async () => {
        try {
        const res = await fetch('/registrar-prestamo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            ...formData,
            areaId: selectedArea.id
            })
        });
        if (res.ok) {
            alert("Préstamo registrado exitosamente");
            cerrarPopup();
        } else {
            alert("Error al registrar préstamo");
        }
        } catch (err) {
        console.error(err);
        }
    };

    const handleDelete = (id) => {
        const newData = getData().filter(item => item.id !== id);
        setData(prev => ({
            ...prev,
            [selectedOption]: newData
        }));
        if (editData?.id === id) {
            setEditData(null);
            setFormData({ name: "", area: "" });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name.trim()) return;

        if (editData) {
            const updatedData = getData().map(item =>
                item.id === editData.id ? { ...item, name: formData.name, area: formData.area } : item
            );
            setData(prev => ({
                ...prev,
                [selectedOption]: updatedData
            }));
        } else {
            const newId = Math.max(0, ...getData().map(d => d.id)) + 1;
            const newItem = {
                id: newId,
                name: formData.name,
                area: formData.area
            };
            setData(prev => ({
                ...prev,
                [selectedOption]: [...getData(), newItem]
            }));
        }

        setFormData({ name: "", area: "" });
        setEditData(null);
    };

    const conditionalRowStyles = [
        {
            when: row => editData && row.id === editData.id,
            style: {
                backgroundColor: "#ffeaea",
                border: "1px solid #eeeeee"
            }
        }
    ];

    const getActionsCell = (row) => {
        if (selectedOption === "tabs") {
            return (
                <button type="button" class="button-add" onClick={() => setPopupVisible(true)}>
                    <span class="button__text">Registrar</span>
                    <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                </button>
            );
        }
        if (selectedOption === "and") {
            return (
                <>
                <button onClick={() => handleEdit(row)} className="editBtn">
                    <svg height="1em" viewBox="0 0 512 512">
                        <path
                        d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                        ></path>
                    </svg>
                </button>
                
                <button onClick={() => handleDelete(row.id)} className="btn-eliminar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 0 69 14" className="svgIcon bin-top">
                        <g clipPath="url(#clip0_35_24)">
                        <path fill="black"  d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"></path>
                        </g>
                        <defs>
                        <clipPath id="clip0_35_24">
                            <rect fill="white" height="14" width="69"></rect>
                        </clipPath>
                        </defs>
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 57" className="svgIcon bin-bottom">
                        <g clipPath="url(#clip0_35_22)">
                        <path fill="black" d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"></path>
                        </g>
                        <defs>
                        <clipPath id="clip0_35_22">
                            <rect fill="white" height="57" width="69"></rect>
                        </clipPath>
                        </defs>
                    </svg>
                </button>
                </>
            );
        }
        if (selectedOption === "more") {
            return (
                <button onClick={() => handleDelete(row.id)} className="btn-eliminar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 0 69 14" className="svgIcon bin-top">
                        <g clipPath="url(#clip0_35_24)">
                        <path fill="black"  d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"></path>
                        </g>
                        <defs>
                        <clipPath id="clip0_35_24">
                            <rect fill="white" height="14" width="69"></rect>
                        </clipPath>
                        </defs>
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 57" className="svgIcon bin-bottom">
                        <g clipPath="url(#clip0_35_22)">
                        <path fill="black" d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"></path>
                        </g>
                        <defs>
                        <clipPath id="clip0_35_22">
                            <rect fill="white" height="57" width="69"></rect>
                        </clipPath>
                        </defs>
                    </svg>
                </button>
            );
        }
        return null;
    };

    let columns = [];
    if (selectedOption === "tabs" || selectedOption === "and") {
        columns = [
            { name: "ID", selector: row => row.id, sortable: true },
            { name: "Nombre", selector: row => row.nombre || row.name, sortable: true },
            { name: "Descripción", selector: row => row.descripcion || "", sortable: true },
            { name: "Cantidad disponible", selector: row => row.cantidad !== undefined ? row.cantidad : "", sortable: true },
            {
                name: "Acciones",
                cell: getActionsCell,
            },
        ];
    } else if (selectedOption === "more") {
        columns = [
            { name: "ID", selector: row => row.id, sortable: true },
            { name: "Nombre", selector: row => row.nombre || row.name, sortable: true },
            { name: "Expediente", selector: row => row.expediente || "", sortable: true },
            { name: "Cantidad", selector: row => row.cantidad !== undefined ? row.cantidad : "", sortable: true },
            {
                name: "Acciones",
                cell: getActionsCell,
            },
        ];
    }

    return (
        <main>
            {menuHeader()}
            <div className="Container">
                <br />
                {selectedOption === "and" && (
                    <div className="form-reg" style={{ display: "flex", justifyContent: "space-between", width: "90%" }}>
                        <form className="form" style={{ display: "flex", gap: "10px", width: "100%" }} onSubmit={handleSubmit}>
                            <input className="input" type="text" placeholder="Ingresa el nombre completo" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{flex: 1, width: "50%", borderColor: editData ? "#ff0000" : undefined, boxShadow: editData ? "0 0 0 1px #ff0000" : undefined}}/>
                            <input className="input" type="text" placeholder="Ingresa la descripción" value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} style={{flex: 1, width: "50%", borderColor: editData ? "#ff0000" : undefined, boxShadow: editData ? "0 0 0 1px #ff0000" : undefined}}/>
                            <input className="input" type="number" placeholder="Cantidad disponible" value={formData.cantidad || ""} onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })} style={{flex: 1, width: "50%", borderColor: editData ? "#ff0000" : undefined, boxShadow: editData ? "0 0 0 1px #ff0000" : undefined}}/>
                            <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                                <button type="submit" className="btn-enviar">
                                    {editData ? "Actualizar" : "Registrar"}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                <hr style={{ width: "90%", margin: "20px auto", border: "1px solid #e0e0e0" }} />
                <br /><br />
                <input className="input search" type="search" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                <br />
                <div className="radio-inputs">
                    {["tabs", "and", "more"].map(option => (
                        <label className="radio" key={option}>
                            <input type="radio" name="radio" checked={selectedOption === option} onChange={() => handleRadioChange(option)}/>
                            <span className="name">
                                <span>{option === "tabs" ? "Disponible" : option === "and" ? "Inventario" : option === "more" ? "Prestamos" : ""}</span>
                            </span>
                        </label>
                    ))}
                    {popupVisible && <div className="overlay" onClick={cerrarPopup}></div>}
                    {popupVisible && (
                        <div className="popupDetalles" style={{ display: "flex", flexDirection: "column", width: "60%" , height: "auto", padding: "5rem", borderRadius: "5%"}}>
                            <button id="btnCerrarPopup" onClick={cerrarPopup}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <section className="opcionesContainer">
                                <div className="formPopup" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <h1 style={{ fontSize: "2rem", fontWeight: "400", color: "#000", textAlign: "center"}}>Registrar Préstamo</h1>
                                    <br />
                                    <h4 style={{ fontSize: "1rem", fontWeight: "400", color: "#000"}}>Expediente</h4>
                                    <input className="input" type="text" name="expediente" placeholder="Ingrese el expediente" value={formData.expediente} onChange={handleFormChange} style={{border: " 1px solid #000"}}/>
                                    <h4 style={{ fontSize: "1rem", fontWeight: "400", color: "#000"}}>Detalles</h4>
                                    <input className="input" type="text" name="detalles" placeholder="Ingrese los detalles" value={formData.detalles}onChange={handleFormChange} style={{border: " 1px solid #000"}}/>
                                    <h4 style={{ fontSize: "1rem", fontWeight: "400", color: "#000"}}>Cantidad</h4>
                                    <input className="input" type="number" name="cantidad" placeholder="Ingrese la cantidad" min={1} value={formData.cantidad} onChange={handleFormChange} style={{border: " 1px solid #000", width: "20%", paddingLeft: "1rem"}}/>
                                    <div className="btnsPopup" style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", paddingTop: "5rem" }}>
                                            <button type="submit" className="btn-enviar" onClick={handleFormSubmit}>Registrar</button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}
                    {selectedOption === 'tabs' && userData?.areas && (
                        <section className="cardContainer">
                        {userData.areas.map((area) => (
                            <div key={area.id} className="cardContent">
                                <h1>{area.name}</h1>
                                <button className="btnVerDetalles" onClick={() => abrirPopup(area)}>
                                    Detalles
                                </button>
                                <h1>{area.name}</h1>
                            </div>
                        ))}
                        </section>
                    )}
                </div>
                <div className="content">
                    <div className="table-container" style={{ padding: "20px" }}>
                        <DataTable
                            columns={columns}
                            data={getData()}
                            pagination
                            highlightOnHover
                            responsive
                            conditionalRowStyles={conditionalRowStyles}
                        />
                    </div>
                </div> 
            </div>
        </main>
    );
};

export default Radio;
