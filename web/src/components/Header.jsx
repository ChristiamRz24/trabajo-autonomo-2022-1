import React from 'react'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import logoImage from '../img/logo.svg'
import userImage from '../img/user.svg'

import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Dropdown
} from 'react-bootstrap'

export const Header = () => {
  const [user, setUser] = useState('')

  // Obtener la información del usuario
  useEffect(() => {
    const getLocalUser = () => {
      const localUserInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      setUser(localUserInfo)
    };

    getLocalUser()
  }, [setUser]);

  const handleLoggOutUser = () => {
    window.localStorage.removeItem('userInfo')
  }

  return (
    <header className="p-3 mb-3 border-bottom">
      <Container>
        <Row>
          <Col sm='12' lg='2' className="d-flex justify-content-center logo-container">
            <Link 
              to="/"
              className="d-flex align-items-center text-dark text-decoration-none"
              >
              <Image src={logoImage} alt="LOGO" width="32" height="42"></Image>
              <h4 className="mb-0 fw-bold text-logo">Bedrooms</h4>
            </Link>
          </Col>
          <Col sm='12' lg='8' className='d-flex align-items-center my-2'>
            <Form role="search" className="w-100">
              <input
                type="search"
                className="form-control"
                placeholder="Buscar habitaciones..."
                aria-label="Search"
              >
              </input>
            </Form>
          </Col>
          <Col sm='12' lg='2'
            className="d-flex justify-content-center align-items-center"
            aria-expanded="false"
            >
            <Image src={userImage} alt="Profile image" width="32" height="32"></Image>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="mx-2">
                Opciones
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {
                  user.tipo == 'Contratista'
                    ? <Link 
                        to="/contratista"
                        className='dropdown-item link-dark text-decoration-none'
                        >
                        Habitaciones
                      </Link>
                      
                    : <Link
                        to="/estudiante"
                        className='dropdown-item link-dark text-decoration-none'
                        >
                        Alquiler
                      </Link>
                }
                {/* <Dropdown.Item href="#">Perfil</Dropdown.Item> */}
                <Dropdown.Divider></Dropdown.Divider>
                <Link 
                  to="/login"
                  className='dropdown-item link-dark text-decoration-none'
                  onClick={handleLoggOutUser}
                  >
                  Salir
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </header>
  )
}
