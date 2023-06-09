import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { setIsLoading } from '../store/slices/isLoading.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React from 'react'

const Login = () => {

    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const sigin = data => {
        dispatch(setIsLoading(true))

        axios
        .post("https://e-commerce-api-v2.academlo.tech/api/v1/users/login", data)
        .then(resp => {
            localStorage.setItem("token", resp.data.token)
            navigate("/")
        })
        .catch(error => {
            if(error.response.status === 401) {
                alert("El usuario o contraseña está incorrecto")
            }
        })
        .finally( () => dispatch(setIsLoading(false)))
    }

    const logout = data => {
      
      localStorage.setItem("token", "")
              alert("Usted a salido del sistema")             
        
  }


    return (
      <div className='py-5 my-5 d-flex justify-content-center aligne-center'>
        <form onSubmit={ handleSubmit(sigin)} className='p-3' style={{border: "1px solid white"}}>
            <h1>Log in</h1>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2} className='me-3'>
              Email
            </Form.Label>
            <Col sm={9}>
              <Form.Control 
              type="email" 
              placeholder="Email" 
              {...register("email")}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
            <Form.Label column sm={2} className='me-3'>
              Password
            </Form.Label>
            <Col sm={9}>
              <Form.Control 
              type="password" 
              placeholder="Password"
              {...register("password")}
              />
            </Col>
          </Form.Group>                   

          <Form.Group as={Row} className="mb-3">
            <Col className='ms-4 me-0'>
              <Button type="submit" onClick={() => sigin()} variant='success'>Sign in</Button>
            </Col>
            <Col className='ms-5 me-0'>
              <Button type="submit" onClick={() => logout()} variant='info'>Log out</Button>
            </Col>
          </Form.Group>          
        </form>
      </div>
    );
};

export default Login;