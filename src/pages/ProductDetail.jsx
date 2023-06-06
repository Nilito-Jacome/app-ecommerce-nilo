import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navbar } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';

const ProductDetail = () => {

    const { id } = useParams()
    const [productDetail, setProductDetail]= useState({})
    const [rate, setRate] = useState(1)

    useEffect ( () => {
        axios
            .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)     
            .then(resp => {
                console.log(resp.data)
                setProductDetail(resp.data)
            })
            /*.catch(error => console.error(error))  src={productDetail.images?.[0].url}*/
    }, [])

    const increment = () =>{
        if(rate>=1){
            setRate(rate+1)
            if(rate>=5){
                window.alert("Are you sure to buy more than five unit of this product. ")
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
    return (
        <div> 
            <Navbar />
            <Row className='pt-3 ms-3'> 
                {productDetail.title}
            </Row>
            <Row className='pt-4'>
                <Col className='ms-3 me-3'>


                <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={productDetail.images?.[0].url}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={productDetail.images?.[1].url}
                    alt="Second slide"
                    />

                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={productDetail.images?.[2].url}
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                    </Carousel.Caption>
                </Carousel.Item>
                </Carousel>



                {/*<img src={productDetail.images?.[0].url} alt="" className="img-fluid"/>*/}
                </Col>
                <Col className='ms-3 me-3'>
                    <Row>
                        <h1>
                            {productDetail.title}
                        </h1>
                    </Row>
                    <Row>
                        <small>
                            {productDetail.description}
                        </small>
                    </Row>
                    <Row>
                        <Col className='pt-4'>
                            <small>Price</small>
                            <br />
                            {productDetail.price}
                        </Col>
                        <Col className='pt-4'>
                            <div className="product-rate">
                                <small>Quantity</small>
                                <br />
                                <button onClick={() => decrement()}>-</button>
                                <span>{rate}</span>
                                <button onClick={() => increment()}>+</button>
                            </div>
                        </Col>
                        
                    </Row>
                    <Row className='pt-4'>
                    <Button className="primary my-3" variant="success">Add to shopping cart</Button>{' '}
                    </Row>

                </Col>
            </Row>
        </div>
    );
};


export default ProductDetail;

