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
            <h1 className="titu">Shopping list</h1>
            <ListGroup>
            </ListGroup>
                {
                    purchases.map(item =>(
                        <ListGroup.Item key={item.id}>
                            <div className="shoping">
                                <Row className="pt-1 ms-1 me-5">
                                    <Col xs={2}>
                                        {item.product.title}
                                    </Col>
                                    <Col xs={2}>
                                        <img src={item.product.images?.[0].url} alt="" style={{width:100}} className="m-3 img-fluid"/>
                                    </Col>
                                    <Col xs={2}>
                                        <span>Quantity</span>
                                        <br />
                                        {item.quantity}
                                    </Col>
                                    <Col xs={2}>
                                        <span>Unit price</span>
                                        <br />
                                    {item.product.price}
                                    </Col>
                                    <Col xs={2}>
                                        <span>Total price</span>
                                    <br />
                                    {item.product.price * item.quantity}
                                    </Col>
                                    <Col xs={2}>
                                        <span>Fecha</span>
                                        {item.createdAt}
                                    </Col>
                                </Row>                            
                            </div>
                        </ListGroup.Item>
                    ))
                }
        </div>
    );
};

export default Purchases;