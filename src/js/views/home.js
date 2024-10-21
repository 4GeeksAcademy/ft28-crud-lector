import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";

import "../../styles/home.css";
import { Formulario } from "./formulario";
import { Lector } from "./lector";

export const Home = () => (
	<div className="text-center mt-5">
		<h1>Bienvenido a Booksy!</h1>
		<p>
			<img src={rigoImage} />
		</p>	
	</div>
);
