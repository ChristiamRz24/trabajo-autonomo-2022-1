import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'

import { Header } from './Header'
import { Footer } from './Footer'
import BedRoom from './BedRoom.jsx'

import { Container, Image, Row } from 'react-bootstrap';

import imgUserDefault from '../img/user.svg'

export const Estudiante = () => {
  // Info del usuario
  const [infoPersonal, setInfoPersonal] = useState({})
  const [alquiler, setAlquiler] = useState([])
  const [user, setUser] = useState('')

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

      const url = 'http://localhost:8080/v1/sextob/api/estudiante'
      try {
        const response = await axios(`${url}/${userInfo.idCuenta}`);
        const infoEstudiante = response.data
        setInfoPersonal(infoEstudiante.info);
        setAlquiler([...alquiler, infoEstudiante.alquiler]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setUser]);

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
                <p className="text-muted">Estudiante</p>
              </div>
              {/* Opciones */}
              <div className="list-group mb-2">
                <a
                  href="#"
                  className="list-group-item list-group-item-action active"
                  aria-current="true">
                  Alquiler
                </a>
                <a href="#" className="list-group-item list-group-item-action disabled">
                  Pagos
                </a>
              </div>
            </section>
            {/* Habitaciones */}
            <section className="col-lg-9 border-start">
              <p className="fs-5 fw-bold mb-0">Habitación alquilada</p>
              {/* Card */}
              <Row>
              {
                  alquiler != "Nada alquilado" && alquiler.length > 0
                    ? alquiler.map((alquilerx, index) => {
                        return (
                          <BedRoom
                            key={index}
                            id={alquilerx._id}
                            decription = {alquilerx.descripcion}
                            direction = {alquilerx.direccion}
                            price = {alquilerx.precio}
                            nBeds = {alquilerx.nCamas}
                            deleteBedRoom= {() => {
                                const newAlquiler = alquiler.shift()
                                setAlquiler(newAlquiler)
                              }
                            }
                            smx = "12"
                            mdx = "6"
                            lgx = "4"
                            // services = {habitacionx.servicios}
                          />
                        )
                      })
                    : <p className="fw-bold">Sin Habitaciones que mostrar!</p>
                }
						  </Row>
            </section>
          </Row>
        </Container>
      </main>
      <Footer/>
    </>
  )
}
