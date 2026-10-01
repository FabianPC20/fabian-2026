import { useState } from 'react';

type RegistroProps = {
  onRegresar: () => void;
};

function Registro({onRegresar} : RegistroProps) {
  const [nombre, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [passwordC, setPasswordC] = useState('');

  function registrarUsuario() {
    /*Validaciones */
    if (nombre == "") {
        console.log('Favor de ingresar un nombre');
    } else if (correo == "") {
        console.log('Favor de ingresar un correo');
    } else if (password == "") {
        console.log('Favor de ingresar una contraseña');
    } else if (passwordC == "") {
        console.log('Favor de volver a ingresar una contraseña');
    } else if (password != passwordC) {
        console.log('Favor de validar contraseñas son diferentes');
    } else {
        const usuario = {
            nombre,correo,password, saldo: 0
        };

        localStorage.setItem('usuario', JSON.stringify(usuario));
        onRegresar();  
    }
  }

  return (
    <div>
      <h1>Crear cuenta</h1>

      <input
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={(e) => setUsuario(e.target.value.trim())}
      />

      <input
        type="email"
        placeholder="Correo electrónico"
        value={correo}
        onChange={(e) => setCorreo(e.target.value.trim())}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value.trim())}
      />

      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={passwordC}
        onChange={(e) => setPasswordC(e.target.value.trim())}
      />

      <button onClick={registrarUsuario}>Registrarse</button>
      <button onClick={onRegresar}>Cancelar</button>
    </div>
  );
}

export default Registro;