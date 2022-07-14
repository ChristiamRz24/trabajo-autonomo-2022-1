import axios from 'axios'
import Swal from 'sweetalert2'
import React, { useState, useEffect } from 'react';
import { Col, Card, Button} from 'react-bootstrap'

import { Home } from './Home'

import berRoomImage from '../img/room.jpg'

const BedRoom = (props) => {
  let pathActual = new URL(window.location.href).pathname;
  // Obtener los detalles de la habitación
  const { id, decription, direction, price, nBeds, rent } = props;
  const { smx, mdx, lgx } = props;
  const [user, setUser] = useState('')

  // Obtener la información del usuario
  useEffect(() => {
    const getLocalUser = () => {
      const localUserInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      setUser(localUserInfo);
    };

    getLocalUser();
  }, [setUser]);

  const handleDeleteHabitacion = (event) => {
    const idHabitacion = event.target.attributes.itemid.nodeValue;
    const habitacionUrl = 'http://localhost:8080/v1/sextob/api/habitacion'

    // Cambiar el estado de la habitación
    axios
      .put(`${habitacionUrl}/${idHabitacion}`, {estado:false})
      .then((response) => {
        console.log(response)
        const estado = response.status
        if(estado >= 200 && estado < 300) {
          Swal.fire({
            icon: 'success',
            title: 'Habitación eliminada!',
          })

          // Eliminar la habitación desde la interfaz del contratista
          props.deleteBedRoom(idHabitacion)
        }
      })
  }

  const handleAlquilarHabitacion = (event) => {
    const idEstudiante = user.idCuenta;
    const idHabitacion = event.target.attributes.itemid.nodeValue;
    const estudianteUrl = 'http://localhost:8080/v1/sextob/api/estudiante'
    const habitacionUrl = 'http://localhost:8080/v1/sextob/api/habitacion'

    // Cambiar el estado de alquilada a true
    axios
      .get(`${estudianteUrl}/${idEstudiante}`)
      .then((response) => {
        const tempAlquilerInfo = response.data.alquiler
        if (tempAlquilerInfo == "Nada alquilado") {
          axios
            .put(`${habitacionUrl}/${idHabitacion}`, {alquilada:true})
            .then((response) => {
              console.log(response)
              axios
                .put(`${estudianteUrl}/${idEstudiante}`, {
                  alquiler: idHabitacion
                })
                .then((response) => {
                  console.log(response)
                  const estado = response.status
                  if (estado >= 200 && estado < 300) {
                    Swal.fire({
                      icon: 'success',
                      title: 'Habitación alquilada!'
                    })
                    /* 
                      Se alquila la habitación y se elimina del array de 
                      habitaciones en el Home
                    */
                    props.hideBedRoom(idHabitacion)
                  }
                })
            })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Ya tiene una habitación alquilada'
          })
        }
      })
  }

  const handleCancelarAlquiler = (event) => {
    const idEstudiante = user.idCuenta;
    const idHabitacion = event.target.attributes.itemid.nodeValue;
    const estudianteUrl = 'http://localhost:8080/v1/sextob/api/estudiante'
    const habitacionUrl = 'http://localhost:8080/v1/sextob/api/habitacion'

    // Cambiar el estado de alquilada a true
    axios
      .put(`${habitacionUrl}/${idHabitacion}`, {alquilada:false})
      .then((response) => {
        console.log(response)
        axios
          .put(`${estudianteUrl}/${idEstudiante}`, {
            alquiler: ""
          })
          .then((response) => {
            console.log(response)
            const estado = response.status
            if (estado >= 200 && estado < 300) {
              Swal.fire({
                icon: 'success',
                title: 'Alquiler cancelado!'
              })
              // Eliminar la habitación desde la interfaz del estudiante
              props.deleteBedRoom()
            }
          })
      })
  }

  // Renderizarla
  return (
    <Col sm={smx} md={mdx} lg={lgx} className='mb-4'>
      <Card>
        <Card.Img src={berRoomImage} className="w-100 h-100"></Card.Img>
        <Card.ImgOverlay className="d-flex flex-column justify-content-between">
          <div className='d-flex justify-content-between'>
            <div className="d-flex gap-2 infoCardOverlay">
              <p className='mb-0 fw-bold'>
                <i className="fa-solid fa-dollar-sign mx-1"></i>
                { price }
              </p>
            </div>
            <div className="d-flex gap-2 infoCardOverlay">
              <p className='mb-0'>
                <i className="fa-solid fa-bed mx-1"></i>
                { nBeds }
              </p>
            </div>
          </div>
          {
            // Solo un estudiante puede alquilar una habitación
            user.tipo == 'Estudiante' && pathActual == '/'
              ? <Button
                  size='sm'
                  itemID={id}
                  className='w-50'
                  variant='outline-light'
                  onClick={handleAlquilarHabitacion}
                  >
                  Alquilar
                </Button>
              : user.tipo == 'Estudiante' && pathActual == '/estudiante'
                  ? <Button
                      size='sm'
                      itemID={id}
                      className='w-75'
                      variant='warning'
                      onClick={handleCancelarAlquiler}
                      >
                      Cancelar alquiler
                    </Button>
                  : <></>
              //
          }
        </Card.ImgOverlay>
      </Card>
      <Card.Footer className='border-0 text-break'>
        <div className='infoCard'>
          <p className='m-1 titleCard'>Descripción</p>
          <p className='m-1'>{ decription }</p>
        </div>
        <div className='infoCard'>
          <p className='m-1 titleCard'>Dirección</p>
          <p className='m-1'>{ direction }</p>
        </div>
        {
          /*
            Si el usuario es contratista y se encuentra ubicado en
            la ruta: localhost:3000/contratista, mostrarle las opciones
            de editar y eliminar la habitación.
          */
            user.tipo == 'Contratista' && pathActual == '/contratista' && rent == false
            ? <div>
                <Button
                variant='outline-danger'
                size="sm"
                itemID={id}
                onClick={handleDeleteHabitacion}>
                Eliminar
                </Button>
              </div>
            : user.tipo == 'Contratista' && pathActual == '/contratista' && rent == true
              ? <Button size='sm' className='w-75' variant='dark' disabled>
                  Ya alquilada!
                </Button>
              : <></>
        }
      </Card.Footer>
    </Col>
  )
}

export default BedRoom
