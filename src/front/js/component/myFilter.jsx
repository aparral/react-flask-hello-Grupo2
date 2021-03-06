import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.scss";
import "../../styles/index.scss";
import { Card, Button, Accordion, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export const MyFilter = () => {
	const [state, setState] = React.useState(" ");
	let { pathname } = useLocation();
	const { store, actions } = useContext(Context);
	const item = store.serviceRegistrado;

	return (
		<>
			{/* <Nav.Link as={Link} to="/home" >Home</Nav.Link> */}
			<Nav justify variant="tabs" defaultActiveKey="/home" className="flex-column">
				<h3>Bienvenid@ {store.user.userName} </h3>
				<Nav.Item>
					<Nav.Link
						as={Link}
						to="/MiDato"
						className={`flex-column text-left navFilter + ${pathname == "/MiDato" ? "selected" : ""}`}
						onClick={() => setState("dato")}>
						<i className="fas fa-user-circle"></i> Mis Datos
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						as={Link}
						to="/MiServicio"
						className={`flex-column text-left navFilter + ${pathname == "/MiServicio" ? "selected" : ""}`}
						onClick={() => setState("service")}>
						<i className="fas fa-briefcase"></i> Mis Servicios
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						as={Link}
						to="/registerservice"
						className={`flex-column text-left navFilter + ${state == "register" ? "selected" : " "}`}
						onClick={() => setState("register")}>
						<i className="fas fa-edit"></i> Registrar nuevo servicio
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						as={Link}
						to="/MiCompra"
						className={`flex-column text-left navFilter + ${pathname == "/MiCompra" ? "selected" : ""}`}
						onClick={() => setState("service")}>
						<i className="fas fa-shopping-cart"></i> Mis Compras
					</Nav.Link>
				</Nav.Item>
			</Nav>
		</>
	);
};

{
	/* <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            <i className="fas fa-chevron-right" /> Mis Datos
						</Accordion.Toggle>
                    </Card.Header>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            <i className="fas fa-chevron-right" /> Mis Servicios
						</Accordion.Toggle>
                    </Card.Header>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                            <i className="fas fa-chevron-right" /> Registrar nuevo servicio
						</Accordion.Toggle>
                    </Card.Header>
                </Card>
            </Accordion> */
}
