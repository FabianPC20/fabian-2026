import { formatearComoPesos } from '../comun/funcionesComunes';

type TarjetaSaldoProps = {
    saldo: number;
    abrirCargaSaldo: () => void;
}

function TarjetaSaldo({ saldo, abrirCargaSaldo }: TarjetaSaldoProps) {
    return (
        
        <div className="tarjeta-saldo p-1">

        <div>
            <h2>Saldo disponible</h2>

            <h2 className="saldo-cantidad">
                {formatearComoPesos(saldo)}
            </h2>
        </div>

        <div className="saldo-detalles">
            <div className="saldo-icono">
            💳
        </div>

        <div>
            <p className="saldo-tipo">Cuenta SnailPay</p>
            <p className="saldo-tarjeta">•••• 1234</p>
        </div>

        <span className="saldo-estado">
            Activa
        </span>
        </div>

        <button
            className="boton-cargar"
            onClick={abrirCargaSaldo}
        >
            + Cargar saldo
        </button>

    </div>
    );
}

export default TarjetaSaldo;