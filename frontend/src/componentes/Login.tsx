import { useState } from 'react';

type LoginProps = {
  onLogin: () => void;
  onRegistro: () => void;
};

function Login({ onLogin,onRegistro }: LoginProps) {

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');  

  function iniciarSesion() {
    if (correo === '') {
      console.log('Favor de ingresar un usuario');
    } else if (password === '') {
      console.log('Favor de ingresar una contraseña');
    } else {
      const usuarioGuardado = localStorage.getItem('usuario');

      if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);

        //console.log(usuario.correo);
        //console.log(usuario.password);

        if (usuario.correo === correo && usuario.password === password) {
          localStorage.setItem('sesion', 'true');
          onLogin();
        } else {
          console.log('Correo o contraseña invalida');
        }
      } else {
        console.log('Favor de registrar un usuario');
      }
    }
  }

   return (
    <div>
      <h1>INICIAR SESIÓN</h1>
      <label>CORREO:</label>
      <input
        type="text"
        value={correo}
        onChange={(e) => setCorreo(e.target.value.trim())}
      />
      <label>CONTRASEÑA:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value.trim())}
      />

      <button onClick={iniciarSesion}>Ingresar</button>
      <button onClick={onRegistro}>Registrarse</button>
    </div>
  );
}

export default Login;