import React from "react";
import { motion } from "framer-motion";
import { AddIconWhite } from '../../../assets/svg';
export const FloatingButton = ({ onClick }) => {
    const Button = (
        <motion.button
            style={styles.btn}
            className="floating-button"
            onClick={onClick}
            animate={
                { rotate: [0, 30, 90, 120, 180, 210, 240, 270, 300, 330, 360] }
            }
        >
            <AddIconWhite stroke='white' style={styles.add} ></AddIconWhite>
        </motion.button>
    );

    return Button;
};


const styles = {
    add: {
        color: 'while',
        width: '40px',
        height: '40px'
    },
    btn: {
        border: 0,
        bottom: '30px',
        right: '30px',
        position: 'fixed',
        width: '60px',
        height: '60px',
        flexShrink: 0,
        borderRadius: '100px',
        background: '#7238FA',
        boxShadow: '1px 4px 4px 1px rgba(0, 0, 0, 0.25)',
        cursor: 'pointer'
    }
}
