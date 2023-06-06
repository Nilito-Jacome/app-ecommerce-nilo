import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector, useDispatch } from 'react-redux';
import { getProductThunk, filterCategoryThunk, filterImputDateThunk } from '../store/slices/product.slice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const Home = () => {

  const dispatch = useDispatch()
  const productList = useSelector(state => (state.product))
  const [categorys, setCategorys] = useState([])
  const [searchValue, setSearchValue] = useState("")

  useEffect (() => {
    dispatch(getProductThunk())

    axios
    .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")     
    .then(resp => setCategorys(resp.data))
    .catch(error => console.error(error))
  }, [])

  return (
    <div>
      <Row className='pt-5'>
        <Col md={4} lg={3}>
        <ListGroup className='w-100'>
          {
            categorys.map(category => (
            <ListGroup.Item 
            key={category.id}
            onClick={() => dispatch(filterCategoryThunk(category.id))}
            >
            {category.name}
            </ListGroup.Item>
          ))
          }
      </ListGroup>
    Filtrados</Col> {/* xs: breack point para dispositivos extrapequenos predifinidos, sm: pequenos, md: mdeianos, lg: grandes, xlg: extra grandes */ }
        <Col md={8} lg={9}>
          <h1>Products</h1>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="search by name"
              aria-label="search by name"
              aria-describedby="basic-addon2"
              value={searchValue}
              onChange={ e => setSearchValue(e.target.value)}
            />
            <Button 
              variant="outline-secondary"
              id="button-addon2"
              onClick={() => dispatch(filterImputDateThunk(searchValue))}
              >
              Search
            </Button>
          </InputGroup>
          <Row xs={1} md={2} lg={3}>
            {
              productList.map(product => (
            <Col className="mb-3" key={product.id}>
              <Card className="w-100">

                <Link to={`/product/${product.id}`}>
                  
                  <Card.Img 
                  variant="top" 
                  src={product.images?.[0].url}
                  style={{ height:200, objectFit: "cover" }}
                  />
                  <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>
                  Price
                  <br />
                  {product.price}
                  </Card.Text>
                  <Button variant="primary">Product Detail</Button>
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

export default Home;
