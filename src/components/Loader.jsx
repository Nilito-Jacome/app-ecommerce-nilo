import Spinner from 'react-bootstrap/Spinner';
import React from 'react'

const Loader = () => {
    return (
        <div className="Loader-container">
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="border" variant="danger" />           
        </div>
    );
};

export default Loader;