import { useState } from "react";
import { alertWarning, alertSuccess } from '../comun/alert';
import "../styles/SnailPay.css";

type SnailPayProps = {
    cerrar: () => void;
    cargarSaldo: (cantidad: number) => void;
}

function SnailPay({ cerrar, cargarSaldo }: SnailPayProps) {

    const [cantidad, setCantidad] = useState("");

    const procesarCarga = () => {
        if (cantidad.trim() == "") {
            alertWarning("Ingresa una cantidad");
            return;
        }

        const cantidadNumero = Number(cantidad);

        if (cantidadNumero <= 0) {
            alertWarning("Ingresa una cantidad válida");
            return;
        }

        cargarSaldo(cantidadNumero);
        cerrar();
    };

    return (
        <div className="modal-fondo">

            <div className="snailpay">
                <h2>🐌 Apuestas rapidas</h2>

                <p>Ingresa la cantidad que deseas cargar</p>

                <div className="form-floating mb-4">
                    <input
                        className="form-control"
                        type="number"
                        placeholder="Cantidad"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                    />
                    <label>Saldo</label>
                </div>

                <div className="snailpay-botones">
                    <button onClick={cerrar}>
                        Cancelar
                    </button>

                    <button onClick={procesarCarga}>
                        Cargar saldo
                    </button>
                </div>
            </div>

        </div>
    );
}

export default SnailPay;