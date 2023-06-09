import Offcanvas from "react-bootstrap/Offcanvas";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk, updateRateThunk, purchaseCartThunk, deletedCartThunk } from "../store/slices/cart.slice";
import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
                                    <Col>
                                        <small>Quantity</small>
                                        <br />
                                        <button 
                                            disabled ={item.rate === 1}
                                            onClick = { () => decrementRate(item)}
                                        >
                                            -
                                        </button>
                                        {item.quantity}
                                        <button
                                            onClick={() => incrementRate(item)}
                                        >
                                            +
                                        </button>
                                    </Col>
                                    <Col>
                                        Total Price
                                        <br />
                                        {item.product.price * item.quantity}
                                    </Col>                            
                                    <Col>
                                        <button
                                            onClick={() => deletedCart(item)}
                                        >
                                            Eliminate
                                        </button>
                                    </Col>   
                                </Row>
                            </li>
                        ))
                    }                
                </Col>
            </ul>
            <button 
                onClick={() => dispatch(purchaseCartThunk())}
            >
                Buy
            </button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default CartsSideBar;
