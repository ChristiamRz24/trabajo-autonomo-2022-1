import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  Container,
  Image,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';

import bedroomImg from '../img/habitacion.svg'

export const Login = () => {
  const [userName, setUserName] = useState('')
  const [userPass, setUserPass] = useState('')

    // Funciones
    const handleLogginUser = (event) => {
      event.preventDefault()

      const usuarioUrl = 'http://localhost:8080/v1/sextob/api/usuario'

      axios
        .get(`${usuarioUrl}/${userName}/${userPass}`)
        .then((response) => {
          const { errorStatus, message } = response.data
          // errorStatus == 1 -> El usuario no ha sido encontrado
          if(errorStatus == 1) {
            // Crear y mostrar el error
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: message
            })
          } else {
            // Obtener el usuario de la respuesta
            const user = response.data
            // Guardar el usuario de manera local
            window.localStorage.setItem(
              'userInfo', JSON.stringify(user)
            )
            // Redirigir a la página de inicio
            location.assign('/')
          }
        })
    }

  return (
    <main className='vw-100 min-vh-100 d-flex align-items-center background-login'>
      <Container fluid className='w-75 d-flex justify-content-center bg-light rounded'>
          <Row className="w-100">
            <Col sm={12} md={6} className='d-flex align-items-center'>
              <Image srcSet={bedroomImg} alt="Bedroom Image" className='w-100 p-4'></Image>
            </Col>
            <Col className='d-flex flex-column mx-4'>
              <h2 className='fw-bold text-center my-3'>Bienvenido</h2>
              <Form onSubmit={handleLogginUser} className="needs-validation" noValidate>
                <Form.Group className="my-2" controlId="userNameInput">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={userName}
                    onChange={({target}) => setUserName(target.value)}
                  />
                  <div className="valid-feedback fst-italic">Bien!</div>
                  <div className="invalid-feedback fst-italic">Campo requerido</div>
                </Form.Group>
                <Form.Group className="my-2" controlId="userPassInput">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    value={userPass}
                    onChange={({target}) => setUserPass(target.value)}
                  />
                  <div className="valid-feedback fst-italic">Bien!</div>
                  <div className="invalid-feedback fst-italic">Campo requerido</div>
                </Form.Group>
                <div className="d-grid">
                  <Button type='submit' variant='primary'>Iniciar Sesión</Button>
                </div>
                <div className="my-3">
                  <span>¿No tienes cuenta? &nbsp;
                    <Link to="/registro">Registrate</Link>
                  </span>
                </div>
              </Form>
              {/* Login con redes sociales */}
              <Row className="my-4 text-center">
                <p>Iniciar Sesión con redes sociales</p>
                <Col>
                  <Button variant='outline-primary' className='w-100 my-1 disabled'>
                    <Row className='align-items-center'>
                      <Col sm='2'>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1365px-Facebook_f_logo_%282019%29.svg.png" width='32' alt="Facebook" />
                      </Col>
                      <Col className='text-center'>Facebook</Col>
                    </Row>
                  </Button>
                </Col>
                <Col>
                  <Button variant='outline-danger' className='w-100 my-1 disabled'>
                    <Row className='align-items-center'>
                      <Col sm='2'>
                        <img src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png" width='32' alt="Google" />
                      </Col>
                      <Col className='text-center'>Google</Col>
                    </Row>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
      </Container>
    </main>
  )
}
