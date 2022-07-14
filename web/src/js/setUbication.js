(() => {
	'use strict'
	let user = ''
	// Obtener el path en el que se encuentra el usuario
	let pathActual = new URL(window.location.href).pathname
	// Leer el almacenamiento local para obtener el usuario
	const loggedUserInfo = window.localStorage.getItem('userInfo')

	if (loggedUserInfo) { // Si la información del usuario se encuantra de manera local
  		// Parsear la información del usuario a formato JSON
		user = JSON.parse(loggedUserInfo);
	}

	if (user == '') { // Si el usuario no ha iniciado seción
		// Y no se encuentra en las rutas de acceso o registro
		if (pathActual != '/login' && pathActual != '/registro') {
			// Enviarlo a acceder o registrarse
			location.assign('/login')
		}
	}
  if (user.tipo == 'Contratista' && pathActual == '/estudiante') {
    location.assign('/contratista')
  }
  if (user.tipo == 'Estudiante' && pathActual == '/contratista') {
    location.assign('/estudiante')
  }
}) ()
