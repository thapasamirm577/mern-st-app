import React from "react";
import { Alert } from 'react-bootstrap'

const AlertContainer = (props) => {
    const { alertMsg, alertVariant } = props;
    return (
        <Alert variant={alertVariant}>
            {alertMsg}
        </Alert>
    )
}

export default AlertContainer;
