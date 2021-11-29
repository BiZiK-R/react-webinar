import React from "react";
import propTypes from 'prop-types';
import cn from 'classnames';
import './button.css';

function Button({children, theme, onClick}) {
    return (
        <button className={cn("Button", theme ? `Button_${theme}` : '')} onClick={onClick}>
            {children}
        </button>
    )
}

Button.propTypes = {
    children: propTypes.node.isRequired,
    onClick: propTypes.func.isRequired,
}
  
Button.defaultProps = {
    children: '',
    theme: '',
    onClick: () => {},
}

export default Button;