import { useState } from "react";
import GraficaApuestas from './GraficaApuestas';
import GraficaCarerasDia from './GraficaCarrerasDia';
import Header from "./Header";
import TarjetaSaldo from "./TarjetaSaldo";
import SnailPay from './SnailPay';
import "../styles/Dashboard.css";

type DashProps = {
    onLogout: () => void;
};

function DashBoard({onLogout} : DashProps) {

    const [mostrarSnailPay, setMostrarSnailPay] = useState(false);
    const [usuario, setUsuario] = useState(() => {
        const usuarioGuardado = localStorage.getItem("usuario");

        return usuarioGuardado
            ? JSON.parse(usuarioGuardado)
            : null;
    });

    const cargarSaldo = (cantidad: number) => {
        if (!usuario) {
            return;
        }
        //Ajuste del saldo
        const usuarioActualizado = {
            ...usuario,
            saldo: usuario.saldo + cantidad
        };
        //Actualiza el saldo visualmente
        setUsuario(usuarioActualizado);
        //Actualiza el item en el local storage
        localStorage.setItem(
            "usuario",
            JSON.stringify(usuarioActualizado)
        );
    };

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
                        
                        <TarjetaSaldo saldo={usuario?.saldo ?? 0} abrirCargaSaldo={() => setMostrarSnailPay(true)}/>
                    </div>

                    <div className="tarjeta">
                        <GraficaApuestas />
                    </div>
                </section>

                

                <section className="tarjeta">
                    <GraficaCarerasDia />
                </section>

            </main>

            {mostrarSnailPay && (
                <SnailPay
                    cerrar={() => setMostrarSnailPay(false)} cargarSaldo={cargarSaldo}
                />
            )}
            
        </div>
    );
}

export default DashBoard;