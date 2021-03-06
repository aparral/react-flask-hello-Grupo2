import React from "react";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { PersonCategory } from "./personCategory.jsx";
import { personA, personB, personC, personD } from "../../img/image.js";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import Aos from "aos";
import "aos/dist/aos.css";

export const PersonBox = props => {
	React.useEffect(() => {
		Aos.init({ duration: 1200 });
	}, []);

	return (
		<>
			<Jumbotron className="whiteBox align-item-top p-3 mt-" data-aos="slide-up">
				<Container>
					<h2 className="mb-3 mt-5 text-center">{props.title}</h2>
					<Row className="row-cols-1 row-cols-sm-2 row-cols-md-4 align-items-center scroll ">
						<Col md={3}>
							<PersonCategory img={personA} name="Pedro Paredes" title="Consultor" valor="$10.000/hora" />
						</Col>
						<Col md={3}>
							<PersonCategory
								img={personB}
								name="Marcia Canales"
								title="Programadora"
								valor="$250.000/proyecto"
								numero="3"
							/>
						</Col>
						<Col md={3}>
							<PersonCategory
								img={personC}
								name="Federico Ruiz-Tagle"
								title="Diseñador de Logos"
								valor="$40.000/proyecto"
								numero="3"
							/>
						</Col>
						<Col md={3}>
							<PersonCategory
								img={personD}
								name="Felipe Morales"
								title="Arquitectura TI"
								valor="$25.000/hora"
								numero="3"
							/>
						</Col>
					</Row>
				</Container>
			</Jumbotron>
		</>
	);
};

PersonBox.propTypes = {
	name: PropTypes.string,
	title: PropTypes.string,
	valor: PropTypes.string
};
