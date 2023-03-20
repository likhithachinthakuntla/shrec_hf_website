import { Button, IconButton } from '@mui/material';
import React from 'react';
import './Popup.css';
import { IoCloseSharp } from "react-icons/io5";

function Popup(props) {
    const { onClose } = props;
    return (
        <div className="popup">
            <h2 style={{ float: "left" }}>Create a Project</h2>
            <div style={{ paddingTop: "10px", marginRight: "-20px" }}>
                <IconButton aria-label="Close" size="medium" style={{ float: "right" }} onClick={onClose}>
                    <IoCloseSharp fontSize="inherit" />
                </IconButton>
            </div>
            <form>
                <input
                    type="text"
                    required
                    placeholder='Enter new project name'>
                </input>
                <select>
                    <option value="textClassification(Binary)">Text Classification (Binary)</option>
                    <option value="textClassification(Multi-class)">Text Classification (Multi-class)</option>
                </select>
            </form>
            <Button variant='contained' onClick={onClose} style={{ float: "right" }}>
                SUBMIT
            </Button>
        </div>
    );
}

export default Popup;
