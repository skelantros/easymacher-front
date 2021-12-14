import React from 'react';
import classes from './EMButton.module.css';

const EMButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.emBtn}>
            {children}
        </button>
    );
};

export default EMButton;