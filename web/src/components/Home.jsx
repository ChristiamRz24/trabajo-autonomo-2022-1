import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

import {
  Row,
	Form
} from 'react-bootstrap'

// CSS
import '../css/home.css'

// Components
import { Header } from './Header'
import { Footer } from './Footer'
import BedRoom from './BedRoom.jsx'

export const Home = () => {
	const [habitaciones, setHabitaciones] = useState([])
	const [idHabitacionx, setIdHabitacionx] = useState("")
	
	// Obtener la información de las habitaciones
	useEffect(() => {
	  const url = 'http://localhost:8080/v1/sextob/api/habitacion'
    const fetchData = async () => {
      try {
        const response = await axios(url);
        const listaHabitaciones = response.data.habitaciones
        setHabitaciones(listaHabitaciones);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [setHabitaciones]);

  return (
    <>
			<Header />
			<main className="container pb-3">
				<Row>
					<section className="col-lg-2">
						<h4>Filtros</h4>
						<Form className="filters-form">
							<Form.Group className="my-2" controlId="priceInput">
								<Form.Label>Precio</Form.Label>
							</Form.Group>
							<hr></hr>
							<Form.Group className="my-2" controlId="nBedsInput">
								<Form.Label>Camas</Form.Label>
							</Form.Group>
						</Form>
					</section>
					<section className="col-lg-10">
						<h4>Habitaciones</h4>
						<Row>
              {
                habitaciones != ''
                  ? habitaciones.map((habitacionx, index) => {
                    if (habitacionx.alquilada == false) {
                      return (
                        <BedRoom
                          key={index}
                          id={habitacionx._id}
                          decription = {habitacionx.descripcion}
                          direction = {habitacionx.direccion}
                          price = {habitacionx.precio}
                          nBeds = {habitacionx.nCamas}
                          hideBedRoom= {(idHabitacion) => {
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
    	</main>
			<Footer />
    </>
  )
}
