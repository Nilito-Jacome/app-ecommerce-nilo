import Offcanvas from "react-bootstrap/Offcanvas";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk, updateRateThunk, purchaseCartThunk, deletedCartThunk } from "../store/slices/cart.slice";
import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const CartsSideBar = ({ show, handleClose }) => {

    const dispatch = useDispatch()
    const carts = useSelector(state => state.cart)

    useEffect( () => {
        dispatch(getCartThunk())
    }, [])

    const decrementRate = cart => {
        if (cart.quantity >1){            
            dispatch(updateRateThunk(cart.id, cart.quantity - 1))
        }
    }

    const incrementRate = cart =>{
        if(cart.quantity>=3){
            window.alert("Are you sure to buy more than three unit of this product. ")
        }
        dispatch(updateRateThunk(cart.id, cart.quantity + 1))
    }

    const deletedCart = cart =>{
        dispatch(deletedCartThunk(cart.id, cart.quantity))
    }

  return (
    <div>
      <Offcanvas placement="end" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Products added to your cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <ul>
                <Col variant="top">
                    {
                        carts.map((item) =>(
                            <li key={item.id}>
                                <Row>
                                    <h1>{item.product.title}</h1>
                                </Row>
                                <Row>
                                    <img src={item.product.images?.[0].url} alt="" className="w-10 img-fluid" />
                                </Row>
                                <Row className="pt-3">
                                    <div className="carro">
                                        <Col>
                                            <small>Quantity</small>
                                            <br />
                                            <Button 
                                                disabled ={item.rate === 1}
                                                onClick = { () => decrementRate(item)}
                                                variant="info"
                                            >
                                                -
                                            </Button>
                                            {item.quantity}
                                            <Button
                                                onClick={() => incrementRate(item)}
                                                variant="info"
                                            >
                                                +
                                            </Button>
                                        </Col>
                                        <Col className="pt-4">
                                            Total Price
                                            <br />
                                            {item.product.price * item.quantity}
                                        </Col>                            
                                        <Col className="pt-4">
                                            <Button
                                                onClick={() => deletedCart(item)}
                                                variant="danger"
                                                
                                            >
                                                Eliminate
                                            </Button>
                                        </Col>   
                                    </div>
                                </Row>
                            </li>
                        ))
                    }                
                </Col>
            </ul>
            <Button 
                onClick={() => dispatch(purchaseCartThunk())}
                className="w-75 mx-auto d-block"
                variant="success"
            >
                Buy
            </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default CartsSideBar;
