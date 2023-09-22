import React, { useState, useEffect, CSSProperties } from "react";

interface AlertProps {
    message: string;
    type: "success" | "info" | "warning" | "error";
    onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const alertStyle: CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "1rem",
        textAlign: "center",
        zIndex: 100,
        transition: "transform 0.3s ease-in-out",
        transform: show ? "translateY(0)" : "translateY(-100%)",
        backgroundColor:
            type === "success"
                ? "#48BB78"
                : type === "info"
                ? "#4299E1"
                : type === "warning"
                ? "#F6E05E"
                : "#FC8181",
    };

    return (
        <div style={alertStyle}>
            {message}
        </div>
    );
};

export default Alert;
