import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'
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

export const Registro = () => {
  const [userType, setUserType] = useState('Estudiante')
  const [userSex, setUserSex] = useState('Femenino')
  const [userName, setUserName] = useState('')
  const [userPass1, setUserPass1] = useState('')
  const [userPass2, setUserPass2] = useState('')
  const [userDni, setUserDni] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPhone, setUserPhone] = useState('')

    // Funciones
    const handleRegisterUser = (event) => {
      event.preventDefault()

      const usuarioUrl = 'http://localhost:8080/v1/sextob/api/usuario'
      let datosUrl = ''
      
      userType == 'Estudiante'
        ? datosUrl = 'http://localhost:8080/v1/sextob/api/estudiante'
        : datosUrl = 'http://localhost:8080/v1/sextob/api/contratista'

      console.log(datosUrl);

      axios
        .post(usuarioUrl, {
          usuario: userName,
          contrasena: userPass1,
          tipo: userType,
          estado: true
        })
        .then((response) => {
          console.log(response.data)
          const idUsuario = response.data._id;
          axios
            .post(datosUrl, {
              usuario: idUsuario,
              nombre: userName,
              dni: userDni,
              sexo: userSex,
              correo: userEmail,
              telefono: userPhone,
              estado: true
            })
            .then((response) => {
              console.log(response.data)
              const idDetallesCuenta = response.data._id;
              if(response.status == 201) {
                Swal.fire({
                  icon: 'success',
                  title: 'Usuario creado!',
                  footer: '<a href="login">Acceder al sistema</a>'
                })
              }
              // Actualizar el usuario para insertar el id de la cuenta
              axios
                .put(`${usuarioUrl}/${idUsuario}`, {
                  idCuenta: idDetallesCuenta
                })
                .then(response => console.log(response))
            })
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
              <h2 className='fw-bold text-center my-3'>Registro</h2>
              <Form onSubmit={handleRegisterUser} className="needs-validation" noValidate>
                <Row>
                  <Col sm={12} lg={6}>
                    <Form.Group className="my-2" controlId="userTypeInput">
                      <Form.Label>Tipo de Usuario</Form.Label>
                      <Form.Select
                        defaultValue={userType}
                        onChange={({target}) => setUserType(target.value)}
                        >
                        <option>Estudiante</option>
                        <option>Contratista</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="my-2" controlId="userNameInput">
                      <Form.Label>Usuario</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        pattern='^(\w{5,20})$'
                        value={userName}
                        onChange={({target}) => setUserName(target.value)}
                      />
                      <div className="valid-feedback fst-italic">Bien!</div>
                      <div className="invalid-feedback fst-italic">
                        De 5 a 20 caracteres
                      </div>
                    </Form.Group>
                    <Form.Group className="my-2" controlId="userPass1Input">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        required
                        pattern='^(\w{5,20})$'
                        value={userPass1}
                        onChange={({target}) => setUserPass1(target.value)}
                      />
                      <div className="valid-feedback fst-italic">Bien!</div>
                      <div className="invalid-feedback fst-italic">
                        De 5 a 20 caracteres
                      </div>
                    </Form.Group>
                    <Form.Group className="my-2" controlId="userPass2Input">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        required
                        pattern='^(\w{5,20})$'
                        value={userPass2}
                        onChange={({target}) => setUserPass2(target.value)}
                      />
                      <div className="valid-feedback fst-italic">Bien!</div>
                      <div className="invalid-feedback fst-italic">
                        De 5 a 20 caracteres
                      </div>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="my-2" controlId="userSexInput">
                      <Form.Label>Sexo</Form.Label>
                      <Form.Select
                        defaultValue={userSex}
                        onChange={({target}) => setUserSex(target.value)}
                        >
                        <option>Femenino</option>
                        <option>Masculino</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="my-2" controlId="userDniInput">
                      <Form.Label>DNI</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        pattern='^(\d{10,10})$'
                        value={userDni}
                        onChange={({target}) => setUserDni(target.value)}
                      />
                      <div className="valid-feedback fst-italic">Bien!</div>
                      <div className="invalid-feedback fst-italic">
                        Solo números y 10 dígitos
                      </div>
                    </Form.Group>
                    <Form.Group className="my-2" controlId="userEmailInput">
                      <Form.Label>Correo</Form.Label>
                      <Form.Control
                        type="email"
                        required
                        value={userEmail}
                        onChange={({target}) => setUserEmail(target.value)}
                      />
                      <div className="valid-feedback fst-italic">Bien!</div>
                      <div className="invalid-feedback fst-italic">
                        Formato: ejemplo@gmail.com
                      </div>
                    </Form.Group>
                    <Form.Group className="my-2" controlId="userPhoneInput">
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        pattern='^(09\d{8,8})$'
                        value={userPhone}
                        onChange={({target}) => setUserPhone(target.value)}
                      />
                      <div className="valid-feedback fst-italic">Bien!</div>
                      <div className="invalid-feedback fst-italic">
                        Formato requerido: 09xxxxxxxx
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-grid">
                  <Button type='submit' variant='primary'>Registrarse</Button>
                </div>
              </Form>
              <Link to="/login" className="mx-auto my-3">Acceder al sistema</Link>
            </Col>
          </Row>
      </Container>
    </main>
  )
}
