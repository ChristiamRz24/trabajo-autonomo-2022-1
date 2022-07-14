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
  
  // Para la búsqueda
	const [habitacionesHelp, setHabitacionesHelp] = useState([])
	
	// Obtener la información de las habitaciones
	useEffect(() => {
	  const url = 'http://localhost:8080/v1/sextob/api/habitacion'
    const fetchData = async () => {
      try {
        const response = await axios(url);
        const listaHabitaciones = response.data.habitaciones
        setHabitaciones(listaHabitaciones);
        setHabitacionesHelp(listaHabitaciones);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [setHabitaciones]);

  // Filtrar las habitaciones
  const filtrarHabitaciones = (palabras) => {
      // Si no hay palabras en la barra de búsqueda
      if(palabras == '') {
        // Restablecer las habitaciones en el array
        setHabitaciones(habitacionesHelp)
      } else {
        // Si hay palabras en la barra de busqueda
        // Y el array de las habitaciones no esta vacío
        if (habitaciones.length != 0) {
          // Buscar las habitaciones
          const filtradas = habitaciones.filter(habitacionx => 
            habitacionx.descripcion.includes(palabras) && habitacionx.alquilada == false
          )
          // Actualizar el array de las habitaciones
          setHabitaciones(filtradas)
        } else {
          // Si el array de las habitaciones está vacío
          // Obtener las habitaciones del array de ayuda
          let tempHabitaciones = habitacionesHelp;
          // Buscar las habitaciones
          const filtradas = tempHabitaciones.filter(habitacionx => 
            habitacionx.descripcion.includes(palabras) && habitacionx.alquilada == false
          )
          // Actualizar el array de las habitaciones
          setHabitaciones(filtradas)
        }
      }
  }

  return (
    <>
			<Header searchBedroom = {(palabras) => {filtrarHabitaciones(palabras)}}/>
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
					<section className="col-lg-10 border-start">
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
                          hideBedRoom = {(idHabitacion) => {
                              const search = document.getElementById("search-bedroom").value;
                              if(search == '') {
                                const newHabitaciones = habitaciones.filter(habitacionx => 
                                  habitacionx._id !== idHabitacion
                                )
                                setHabitaciones(newHabitaciones)
                                setHabitacionesHelp(newHabitaciones)
                              } else {
                                const newHabitaciones = habitacionesHelp.filter(habitacionx => 
                                  habitacionx._id !== idHabitacion
                                )
                                setHabitaciones(newHabitaciones)
                                setHabitacionesHelp(newHabitaciones)
                              }
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
