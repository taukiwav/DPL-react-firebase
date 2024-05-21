import React from 'react'
import './Button.css'
import { Link } from 'react-router-dom'

const STYLES = ['btn--primary', 'btn--outline','btn--alt']

const SIZES = ['btn--medium, btn--large']

export const Button = ({
    children, 
    type, 
    onClick, 
    buttonStyle, 
    buttonSize,
    linkTo /* added to make button an easily reusable component*/
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    return(
        <Link to= {linkTo} className='btn-mobile'>
            <button
            className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            /*figure out what the above line does
            -update fixed it with back ticks instead of quotes*/
            onClick={onClick}
            type={type}
            >
                {children}
            </button>
        </Link>
    )
}