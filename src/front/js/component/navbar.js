import React, { useContext, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Form, FormControl, Navbar, Nav, Col, Container } from "react-bootstrap";
import { logoAzul } from "../../img/image";
import { LoginModal } from "./Login";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

const MyNavbar = props => {
	const { store, actions } = useContext(Context);
	console.log(store.user);
	useEffect(() => {
		actions.getToken();
	}, []);

	if (
		props.location.pathname === "/" ||
		props.location.pathname === "/register" ||
		props.location.pathname === "/registerservice"
	) {
		return " ";
	} else {
		return (
			<>
				<nav className="navbar navbar-light my-3">
					<Container>
						<Col md={5}>
							<Link to="/home">
								<img
									src={logoAzul}
									width="110"
									height="33"
									className="d-inline-block align-top mt-2"
									alt="cotec logo"
								/>
							</Link>
						</Col>
						<Col sm={6} md={4} className="hidden-sm">
							<Form inline className="Buscar sb d-flex float-right mt-2 hidden-sm">
								<FormControl type="text" placeholder="Buscar" className="mr-sm-4 search" />
								<Button variant="btn" onChange={event => props.handledChange(event)}>
									<i className="fas fa-search pr-3" />
								</Button>
							</Form>
						</Col>
						<Col sm={6} md={3}>
							<div className="ml-auto">
								<LoginModal user={store.user} />
							</div>
						</Col>
					</Container>
				</nav>
				<Navbar className="shadow" bg="light" expand="lg" style={{ borderBottom: "1px solid #A7A7A8 " }}>
					<Container>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="navbar-nav justify-content-between w-100">
								<Nav.Link href="/category/Desarrollo-IT" className="h5 text-dark">
									Desarrolloar/IT
								</Nav.Link>
								<Nav.Link href="/category/Diseño" className="h5 text-dark">
									Diseño
								</Nav.Link>
								<Nav.Link href="/category/Marketing" className="h5 text-dark">
									Contabilidad
								</Nav.Link>
								<Nav.Link href="/category/Contabilidad" className="h5 text-dark">
									Marketing
								</Nav.Link>
								<Nav.Link href="/category/Leyes" className="h5 text-dark">
									Ley/Derecho
								</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</>
		);
	}
};
export default withRouter(MyNavbar);

MyNavbar.propTypes = {
	location: PropTypes.object
};
