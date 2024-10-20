import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Demo = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<ul className="list-group">
				{store.readers.map((item, index) => {
					return (
						<li
							key={index}
							className="list-group-item d-flex justify-content-between"
							>
							<p>
								 {item.name}
								 <br />
								 {item.email}
								 <br />
								 {item.id}
							</p>
							<Link to={"/formulario/"+item.id} >
									<button className="btn btn-light"><i className="fas fa-pencil-alt"></i></button>
								</Link> 
							<button className="btn btn-danger" onClick={() => actions.removeReader(item.id)}>
								<i class="fas fa-trash-alt"></i>
							</button>
						</li>
					);
				})}
			</ul>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);};
