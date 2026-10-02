import GraficaApuestas from './GraficaApuestas';
import GraficaCarerasDia from './GraficaCarrerasDia';
import Header from "./Header";
import "../styles/Dashboard.css";

type DashProps = {
    onLogout: () => void;
};

function DashBoard({onLogout} : DashProps) {

    const usuarioGuardado =  localStorage.getItem("usuario");
    const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

    return (
        <div className="dashboard">

            <Header onLogout={onLogout}/>

            <main className="dashboard-contenido">
                <section className="bienvenida">
                    <h1>Bienvenido, {usuario?.nombre ?? "Usuario"}! </h1>
                    <p>Aquí tienes el resumen de hoy.</p>
                </section>

                <section className="dashboard-resumen">
                    <div className="tarjeta">
                        <h2>Saldo actual</h2>
                        <p>${usuario?.saldo ?? 0}</p>
                        <button>Cargar saldo</button>
                    </div>

                    <div className="tarjeta">
                        <GraficaApuestas />
                    </div>
                </section>

                

                <section className="tarjeta">
                    <GraficaCarerasDia />
                </section>

            </main>

            
        </div>
    );
}

export default DashBoard;