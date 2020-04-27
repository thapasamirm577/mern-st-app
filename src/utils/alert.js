import React from "react";
import { Alert } from 'react-bootstrap'

const AlertContainer = (props) => {
    const { alertMsg, alertVariant, handleClose } = props;
    return (
        <Alert variant={alertVariant} onClose={() => handleClose()} dismissible>
            {alertMsg}
        </Alert>
    )
}

export default AlertContainer;
