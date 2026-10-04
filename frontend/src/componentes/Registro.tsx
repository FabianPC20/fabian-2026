import { useState } from 'react';
import { alertWarning, alertSuccess } from '../comun/alert';

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
    if (nombre.trim() == "") {
        alertWarning('Favor de ingresar un nombre');
    } else if (correo == "") {
        alertWarning('Favor de ingresar un correo');
    } else if (password == "") {
        alertWarning('Favor de ingresar una contraseña');
    } else if (passwordC == "") {
        alertWarning('Favor de volver a ingresar una contraseña');
    } else if (password != passwordC) {
        alertWarning('Favor de validar contraseñas son diferentes');
    } else {
        const usuario = {
          idUsuario: Date.now(),nombre,correo,password, saldo: 0
        };
        alertSuccess('Registro completado correctamente');
        localStorage.setItem('usuario', JSON.stringify(usuario));
        //localStorage.setItem('saldo', '0');
        onRegresar();  
    }
  }

  return (
    <section className="vh-100" style={{ backgroundColor: '#0f172a' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong themed-card" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <h2 className='mb-5'>Crear cuenta </h2>

                <div className="form-floating mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre completo"
                    value={nombre}
                    onChange={(e) => setUsuario(e.target.value)}
                  />
                  <label >Nombre completo</label>
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Correo electrónico"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value.trim())}
                  />
                  <label >Correo electrónico</label>
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                  />
                  <label >Contraseña</label>
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirmar contraseña"
                    value={passwordC}
                    onChange={(e) => setPasswordC(e.target.value.trim())}
                  />
                   <label>Confirmar contraseña</label>
                </div>

                <hr/>

                <button className="btn btn-outline-secondary btn-lg w-100 mb-3" onClick={registrarUsuario}>Registrarse</button>
                <button className="btn btn-outline-secondary btn-lg w-100 mb-3" onClick={onRegresar}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registro;

