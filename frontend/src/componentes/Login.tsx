import { useState } from 'react';
import { alertWarning } from '../comun/alert';

type LoginProps = {
  onLogin: () => void;
  onRegistro: () => void;
};

function Login({ onLogin,onRegistro }: LoginProps) {

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');  

  function iniciarSesion() {
    if (correo === '') {
      alertWarning('Favor de ingresar un usuario');
    } else if (password === '') {
      alertWarning('Favor de ingresar una contraseña');
    } else {
      const usuarioGuardado = localStorage.getItem('usuario');

      if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);

        if (usuario.correo === correo && usuario.password === password) {
          localStorage.setItem('sesion', 'true');
          onLogin();
        } else {
          alertWarning('Correo o contraseña invalida');
        }
      } else {
        alertWarning('Favor de registrar un usuario');
      }
    }
  }

  return (
    <section className="vh-100" style={{ backgroundColor: '#1f2937' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong themed-card" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">

                <h3 className="mb-5">Iniciar sesión</h3>

                <div className="form-floating mb-4">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingEmail"
                    placeholder="name@example.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                  <label htmlFor="floatingEmail">Correo electrónico</label>
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Contraseña</label>
                </div>

                <hr className='my-4'></hr>

                <button
                  className="btn btn-primary btn-lg w-100 mb-3"
                  type="button"
                  onClick={iniciarSesion}
                >
                  Ingresar
                </button>

                <button
                  className="btn btn-outline-secondary btn-lg w-100"
                  type="button"
                  onClick={onRegistro}
                >
                  Registrarse
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;