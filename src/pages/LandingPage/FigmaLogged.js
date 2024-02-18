import React from "react";
import { Helmet } from "react-helmet";
import './css/Figmalogged.css';

import NavBar from "../../components/NavBar/NavBar";


export const FigmaLogged = (props) => {
    return (
        <div
            className="featurPage-root"
        >
            <Helmet>
                <meta name="description" content="Figma Plugin access granted." />
                <title>Openstrokeicons - figma</title>
            </Helmet>
            <NavBar/>
        </div>
    );
};