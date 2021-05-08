import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormControl, Col, Container, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

const SearchBar = props => {
	const { store, actions } = useContext(Context);
	const [isOpen, setIsOpen] = useState(false);
	const { id } = props;
	const item = store.searchInfo;

	const handledChange = e => {
		setIsOpen(true);
		e.preventDefault();
		let { search } = e.target;
		actions.searchInfo(search.value);
	};

	useEffect(() => {
		document.addEventListener("mousedown", () => {
			setIsOpen(false);
		});
	}, []);

	return (
		<>
			<Form onSubmit={e => handledChange(e)} inline className="sb float-left mt-2 d-none d-lg-block d-xl-block">
				<FormControl
					type="search"
					placeholder="Buscar"
					className="search"
					name="search"
					style={{ width: "85%", transition: "none" }}
				/>
				<Button variant="btn" className="p-0" type="submit">
					<i className="fas fa-search pr-3" />
				</Button>
			</Form>
			<ListGroup
				className="searchDopdown mt-3 float-right d-none d-lg-block d-xl-block"
				style={{ marginLeft: "30px" }}>
				{/* {!!store.searchInfo && store.searchInfo.length === 0 ? ( */}
				{isOpen === true && !!store.searchInfo && store.searchInfo.length === 0 ? (
					<ListGroup>
						<ListGroup.Item action>No hay servicio correspondiente</ListGroup.Item>
					</ListGroup>
				) : (
					isOpen === true &&
					!!store.searchInfo &&
					store.searchInfo.map(item => {
						return (
							<ListGroup.Item key={item.id} href={"/servicio/category/" + item.id} action>
								{item.name_servicio}
								<Button variant="btn" className="p-0" type="submit">
									<i className="fas fa-search pr-3" />
								</Button>
							</ListGroup.Item>
						);
					})
				)}
			</ListGroup>
		</>
	);
};

export default SearchBar;

SearchBar.propTypes = {
	id: PropTypes.number
};
