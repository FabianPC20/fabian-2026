import { useState } from 'react';
import Login from './componentes/Login';
import Registro from './componentes/Registro';
import DashBoard from './componentes/Dashboard';

function App() {

 // const [mensaje, setMensaje] = useState('');

  /* EJEMPLO DE LLAMADA AL BACKEND */
  /*useEffect(() => {

    fetch('http://localhost:3000/api/hola')
      .then(response => response.json())
      .then(data => {
        setMensaje(data.mensaje);
      });

  }, []);*/

  const [sesion, setSesion] = useState(localStorage.getItem('sesion') === 'true');
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  function iniciarSesion() {
    setSesion(true);
  }

  function cerrarSesion() {
    localStorage.removeItem('sesion');
    setSesion(false);
  }

  function inciarRegistro() {
    setMostrarRegistro(true);
  }

  function cancelarRegistro() {
    setMostrarRegistro(false);
  }
  
  if (sesion) {
    return <DashBoard onLogout={cerrarSesion}/>
  }

  if (mostrarRegistro) {
    return <Registro onRegresar={cancelarRegistro}/>
  }

  return <Login onLogin={iniciarSesion} onRegistro={inciarRegistro}/>;
}

export default App;
