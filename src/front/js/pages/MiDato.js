import React from "react";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { serviceDiseno, serviceMarketing, serviceIt } from "../../img/image.js";
import { Row, Col, Container, Card, Button, Accordion } from "react-bootstrap";
import { CategoryBox } from "../component/categoryBox.jsx";
import { MyFilter } from "../component/myFilter.jsx";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import UserUpdate from "../component/UserUpdate.jsx";

const MiDato = props => {
	const { store, actions } = React.useContext(Context);

	return (
		<>
			<Container>
				<Row>
					<Col md={3} className="mt-5">
						<MyFilter />
					</Col>
					<Col md={9} className="mt-5">
						<UserUpdate />
					</Col>
				</Row>
				<div className="transBox" />
			</Container>
		</>
	);
};

export default withRouter(MiDato);

MiDato.propTypes = {
	match: PropTypes.objecto,
	category: PropTypes.string
};
