import React from "react";
import PropTypes from 'prop-types';

import s from "./Button.module.css"

function Button({increasePage}) {
        return (
            <button className={s.button} onClick={() => { increasePage() }} type="button">Load More</button>
        );
}

export default Button;

Button.propTypes = {
    increasePage: PropTypes.func
}