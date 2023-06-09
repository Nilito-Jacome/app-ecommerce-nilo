import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navbar } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from "react-redux";
import { filterCategoryThunk } from "../store/slices/product.slice";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import { addToCartThunk } from "../store/slices/cart.slice";
import React from 'react'

const ProductDetail = () => {

    const { id } = useParams()
    const [productDetail, setProductDetail]= useState({})
    const [rate, setRate] = useState(1)
    const dispatch = useDispatch()
    const allProduct = useSelector(state => state.product)
    const productFiltered = allProduct.filter( product => product.id !== parseInt(id))   

    {/* el filter nos ayuda hacer un filtro para discriminar el producto que se busco y no se encuentre en los productos relacionados, parsein nos ayuda a que la comparacion del  product.id con el otro id se lo pueda hacer por que ya esta convertido en un numero */}

    useEffect ( () => {

        axios
            .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)     
            .then(resp => {
                setProductDetail(resp.data)
                dispatch(filterCategoryThunk(resp.data.category.id))
            })
            /*.catch(error => console.error(error))  src={productDetail.images?.[0].url}*/
    }, [])

    const increment = () =>{
        if(rate>=1){
            setRate(rate+1)
            if(rate>=3){
                window.alert("Are you sure to buy more than three unit of this product. ")
            }
        }
    }

    const decrement = () =>{
        if(rate>1){
            setRate(rate - 1)
        }
    }

    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };

    const addToCart = () => {
      const cart = {
        quantity : rate,
        productId: productDetail.id
      }
      dispatch(addToCartThunk(cart))
    }

    return (
      <div>
        <Navbar />
        <Row className="pt-3 ms-5">{productDetail.title}</Row>
        <Row className="pt-4 ms-5">
          <Col className="ms-3 me-3">
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <img
                  className="d-block w-100 img-fluid"
                  src={productDetail.images?.[0].url}
                  alt="First slide"
                />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 img-fluid"
                  src={productDetail.images?.[1].url}
                  alt="Second slide"
                />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 img-fluid"
                  src={productDetail.images?.[2].url}
                  alt="Third slide"
                />
                <Carousel.Caption>                  
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>

          <Col className="ms-3 me-3">
            <Row>
              <h1>{productDetail.title}</h1>
            </Row>
            <Row>
              <small>{productDetail.description}</small>
            </Row>
            <Row>
              <Col className="pt-4">
                <small>Price</small>
                <br />
                {productDetail.price}
              </Col>
              <Col className="pt-4">
                <div className="product-rate">
                  <small>Quantity</small>
                  <br />
                  <button onClick={() => decrement()}>-</button>
                  <span>{rate}</span>
                  <button onClick={() => increment()}>+</button>
                </div>
              </Col>
            </Row>
            <Row className="pt-4">
              <Button 
              className="primary my-3" 
              variant="success"
              onClick={addToCart}
              >
                Add to shopping cart
              </Button>{" "}
            </Row>
          </Col>
        </Row>

        <Row className='pt-3'>
          <h3>Discover similar items</h3>
        </Row>

        <Row className='pt-3'>
            <Col md={12} lg={12}>
                <Row xs={1} md={2} lg={3}>                    
                    {
                        productFiltered.map((product) => (
                            <Col className="mb-3" key={product.id}>
                                <Card className="w-100">
                                    <Link to={`/product/${product.id}`}>
                                    <Card.Img
                                        variant="top"
                                        src={product.images?.[0].url}
                                        style={{ height: "35vh" }}
                                        className="img-fluid"
                                    />
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Row></Row>
                                        <Card.Text>{product.price}</Card.Text>
                                        <Button className="primary my-3" variant="success">
                                        Cart
                                        </Button>{" "}
                                    </Card.Body>
                                    </Link>
                                </Card>
                            </Col>
                        
                        ))
                    }
                </Row>
            </Col>
        </Row>
      </div>
    );
};


export default ProductDetail;

