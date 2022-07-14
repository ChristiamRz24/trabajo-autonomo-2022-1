import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'

import { Header } from './Header'
import { Footer } from './Footer'
import BedRoom from './BedRoom.jsx'

import {
  Modal,
  Container,
  Image,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';

import imgUserDefault from '../img/user.svg'

export const Contratista = () => {
  // Info del usuario
  const [infoPersonal, setInfoPersonal] = useState({})
  const [habitaciones, setHabitaciones] = useState([])
  const [user, setUser] = useState('')
  
  // Modal
  const [mostrarModalAdd, setMostrarModalAdd] = useState(false)
  const handleCloseModalAdd = () => setMostrarModalAdd(false);
  const handleShowModalAdd = () => setMostrarModalAdd(true);

  // Datos de la habitación
  const [descripcionx, setDescripcionx] = useState('')
  const [serviciosx, setServiciosx] = useState('')
  const [direccionx, setDireccionx] = useState('')
  const [preciox, setPreciox] = useState('')
  const [nCamasx, setNCamasx] = useState('')

  // Obtener la información del usuario
  const getLocalUser = async () => {
    const localUserInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    return localUserInfo
  };

  // Obtener la información del usuario
  useEffect(() => {
    const fetchData = async () => {
      // Información del usuario
      let userInfo = await getLocalUser();
      setUser(userInfo)
	    
      const url = 'http://localhost:8080/v1/sextob/api/contratista'
      try {
        const response = await axios(`${url}/${userInfo.idCuenta}`);
        const infoContratista = response.data
        setInfoPersonal(infoContratista);
        setHabitaciones(infoContratista.habitaciones);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setUser]);

  // Validaciones del Formilario en el modal
  useEffect(() => {
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
  }), ([])

  const handleAddRoom = () => {
    event.preventDefault()
    const habitacionUrl = 'http://localhost:8080/v1/sextob/api/habitacion'
    const contratistaUrl = 'http://localhost:8080/v1/sextob/api/contratista'
    let idHabitaciones = habitaciones.map(element => {
      return element._id
    })

    axios
      .post(habitacionUrl, {
          contratista: infoPersonal._id,
          descripcion: descripcionx,
          servicios: serviciosx.split(", "),
          direccion: direccionx,
          precio: preciox,
          nCamas: nCamasx,
          estado: true
      })
      .then((response) => {
        const habitacionCreada = response.data
        idHabitaciones.push(habitacionCreada._id);
        axios
          .put(`${contratistaUrl}/${infoPersonal._id}`, {
            habitaciones: idHabitaciones
          })
          .then((response) => {
            if(response.status == 200) {
              Swal.fire({
                icon: 'success',
                title: 'Habitación creada!'
              })
              
              // Cerrar el modal
              setMostrarModalAdd(false);

              // Añadir la habitación desde la interfaz del contratista
              setHabitaciones([...habitaciones, habitacionCreada]);
            }
          })
        })
  }

  return (
    <>
      <Header />
      <main>
        <Container className="pb-3">
          <Row>
            <section className="col-lg-3 text-center p-4">
              {/* Info del usuario */}
              <div className="p-4">
                <Image src={imgUserDefault} alt="User Image"></Image>
                <p className="fw-semibold mt-4">{infoPersonal.nombre}</p>
                <p className="text-muted">Contratista</p>
              </div>
              {/* Opciones */}
              <div className="list-group mb-2">
                <a
                  href="#"
                  className="list-group-item list-group-item-action active"
                  aria-current="true">
                  Habitaciones
                </a>
                <a href="#" className="list-group-item list-group-item-action disabled">
                  Pagos
                </a>
              </div>
            </section>
            {/* Habitaciones */}
            <section className="col-lg-9 border-start">
              <div className="d-flex align-items-center mb-3">
                <p className="fs-5 fw-bold mb-0">Habitaciones</p>
                <Button
                  variant='outline-primary' size='sm'
                  className="mx-3"
                  onClick={handleShowModalAdd}
                  >
                  Añadir
                </Button>
              </div>
              {/* Card */}
              <Row>
              {
                habitaciones != ''
                  ? habitaciones.map((habitacionx, index) => {
                      // Solo mostrar si la habitación esta activa 
                      if(habitacionx.estado == true) {
                        return (
                          <BedRoom
                            key={index}
                            id={habitacionx._id}
                            decription = {habitacionx.descripcion}
                            direction = {habitacionx.direccion}
                            price = {habitacionx.precio}
                            nBeds = {habitacionx.nCamas}
                            rent = {habitacionx.alquilada}
                            deleteBedRoom= {(idHabitacion) => {
                              const newHabitaciones = habitaciones.filter(habitacionx => 
                                habitacionx._id !== idHabitacion
                              )
                              setHabitaciones(newHabitaciones)
                              }
                            }
                            smx = "12"
                            mdx = "4"
                            lgx = "3"
                            // services = {habitacionx.servicios}
                          />
                        )
                      }
                    })
                  : <p className="fw-bold">Sin Habitaciones que mostrar!</p>
                
              }
						</Row>
            </section>
          </Row>
        </Container>
      </main>
      <Footer/>
      <Modal show={mostrarModalAdd} onHide={handleCloseModalAdd}>
        <Modal.Header className="border-0" closeButton>
          <h5 className="modal-title fs-5 fw-bold" id="modal_add_bedroom_label">
            Añadir habitación
          </h5>
        </Modal.Header>
        <Modal.Body className="pt-1 d-flex justify-content-center">
          <Form  onSubmit={handleAddRoom} className="needs-validation" noValidate>
            <Row className="gap-2 px-3">
              <Col sm="12">
                <Form.Group className="form-label" controlId="bedroomDesc">
                  <Form.Label>Descripcion</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    pattern="^([a-zA-Z0-9áéíóúÁÉÍÓÚ\s\.\-]){25,100}$"
                    value={descripcionx}
                    onChange={({target}) => setDescripcionx(target.value)}
                  />
                  <div className="valid-feedback fst-italic">Bien!</div>
                  <div className="invalid-feedback fst-italic">
                    Mínimo 25 y máximo 100 caracteres
                  </div>
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group className="form-label" controlId="bedroomServices">
                  <Form.Label>Servicios</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    pattern="^[a-zA-Z]+(,\s[a-zA-Z]+)*?$"
                    value={serviciosx}
                    onChange={({target}) => setServiciosx(target.value)}
                  />
                  <div className="valid-feedback fst-italic">Bien!</div>
                  <div className="invalid-feedback fst-italic">
                    Almenos un servicio o más separados por coma y espacio
                  </div>
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group className="form-label" controlId="bedroomDirection">
                  <Form.Label>Direccion</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    pattern="^([a-zA-Z0-9\s\.]){10,50}$"
                    value={direccionx}
                    onChange={({target}) => setDireccionx(target.value)}
                  />
                  <div className="valid-feedback fst-italic">Bien!</div>
                  <div className="invalid-feedback fst-italic">
                    Mínimo 10 y máximo 50 caracteres
                  </div>
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group className="form-label" controlId="bedroomPrice">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    pattern="^[0-9]+$"
                    value={preciox}
                    onChange={({target}) => setPreciox(target.value)}
                  />
                  <div className="valid-feedback fst-italic">Bien!</div>
                  <div className="invalid-feedback fst-italic">
                    Solo números enteros
                  </div>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="form-label" controlId="bedroomNCamas">
                  <Form.Label>Camas</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    pattern="^[0-9]+$"
                    value={nCamasx}
                    onChange={({target}) => setNCamasx(target.value)}
                  />
                  <div className="valid-feedback fst-italic">Bien!</div>
                  <div className="invalid-feedback fst-italic">
                    Solo números enteros
                  </div>
                </Form.Group>
              </Col>
              <Col sm="12" className="mt-2 mb-4">
                <Button type="submit" variant='outline-primary' className="w-100">
                  Confirmar
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
