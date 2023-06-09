import { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "../utils/getConfig";
import ListGroup from 'react-bootstrap/ListGroup';
import { setIsLoading } from "../store/slices/isLoading.slice";
import { useDispatch } from "react-redux";
import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Purchases = () => {

    const [purchases, setPurchases]= useState([])
    const dispatch = useDispatch()

useEffect(() => {
    
    dispatch(setIsLoading(true))
    axios
        .get("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", getConfig())     
        .then((resp) => setPurchases(resp.data))
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))
}, [])

    return (
        <div>
            <h1>Shopping list</h1>
            <ListGroup>
            </ListGroup>
                {
                    purchases.map(item =>(
                        <ListGroup.Item key={item.id}>
                            <Row className="b-1px soli black">
                                <Col md={2}>
                                    {item.product.title}
                                </Col>
                                <Col md={2}>
                                    <img src={item.product.images?.[0].url} alt="" style={{width:80}} className="m-3 img-fluid"/>
                                </Col>
                                <Col md={2}>
                                    Quantity
                                    {item.quantity}
                                </Col>
                                <Col md={2}>
                                    Unit price
                                {item.product.price}
                                </Col>
                                <Col md={2}>
                                Total price
                                {item.product.price * item.quantity}
                                </Col>
                                <Col md={2}>
                                    {item.createdAt}
                                </Col>
                            </Row>                            
                        </ListGroup.Item>
                    ))
                }
        </div>
    );
};

export default Purchases;