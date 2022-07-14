import React from 'react'

import { Header } from './Header'

import { Container, Image } from 'react-bootstrap';

import notFoundImg from '../img/404.png'

export const NotFound = () => {
  return (
    <>
      <Header />
      <main className="">
        <Container>
          <div className='d-flex flex-column align-items-center'>
            <Image src={notFoundImg} className="w-50">
            </Image>
            <p className='fs-5'>Página no encontrada</p>
          </div>
        </Container>
      </main>
    </>
  )
}
