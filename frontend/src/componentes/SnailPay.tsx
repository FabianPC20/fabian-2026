import { useState } from "react";
import { alertWarning, alertSuccess,alertError } from '../comun/alert';
import "../styles/SnailPay.css";

type SnailPayProps = {
    cerrar: () => void;
    cargarSaldo: (cantidad: number) => void;
    idUser: number;
    emailUser: string;
    saldoUser: number;
}

function SnailPay({ cerrar, cargarSaldo, idUser, emailUser,saldoUser }: SnailPayProps) {

    const [numeroTarjeta, setNumeroTarjeta] = useState("");
    const [mesVencimiento, setMesVencimiento] = useState("");
    const [yearVencimiento, setYearVencimiento] = useState("");
    const [cvv, setCvv] = useState("");
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");

    const validarFormulario = () => {
        if (numeroTarjeta.trim() === "") {
            return "Favor de ingresar un número de tarjeta";
        } else if (numeroTarjeta.trim().length !== 16) {
            return "El número de tarjeta debe contener 16 dígitos";
        } else if (mesVencimiento.trim() === "") {
            return "Favor de ingresar el mes de vencimiento";
        } else if (Number(mesVencimiento) < 1 || Number(mesVencimiento) > 12) {
            return "El mes debe estar entre 01 y 12";
        } else if (yearVencimiento.trim() === "") {
            return "Favor de ingresar un año vencimiento";
        } else if (yearVencimiento.trim().length !== 2) {
            return "Favor de ingresar un año vencimiento";
        } else if (cvv.trim() === "") {
            return "Favor de ingresar un CVV";
        } else if (cvv.trim().length !== 3) {
            return "El CVV debe contener 3 dígitos";
        } else if (nombre.trim() === "") {
            return "Favor de ingresar un nombre";
        } else if (cantidad.trim() === "") {
            return "Favor de ingresar una cantidad";
        } else if (Number(cantidad) <= 0) {
            return "Ingresa una cantidad válida";
        } else if (!Number.isSafeInteger(Number(cantidad) + saldoUser)) {
            return "El depósito rebasa el límite permitido de la cuenta";
        } else {
            return "";
        }
    }

    const procesarCarga = async () => {
        /* Validaciones */
        const resultadoValidaciones = validarFormulario();

        if (resultadoValidaciones !== "") {
            alertWarning(resultadoValidaciones);
            return;
        }
        
        const fechaVencimiento = `${mesVencimiento}/${yearVencimiento}`; 
        
        const datosCobro = {
            card_number: numeroTarjeta,
            expiration_date: fechaVencimiento,
            cvv: cvv,
            full_name: nombre,
            transaction_amount: Number(cantidad),
            payer_id: idUser,
            payer_email: emailUser
        }
        //Cancela operaciones en el navegador
        const controller = new AbortController();
        //Tiempo para esperar la solicitud - 5s - inicia conteo 
        const timeout = setTimeout(() => {
            controller.abort();
        }, 5000);

        try {
            const respuesta = await fetch("https://fabian-snailpay-api.onrender.com/api/snailpay", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datosCobro),
                signal: controller.signal //Permite escuchar a controller y ser cancelado
            });
            //Cancela el temporizador
            clearTimeout(timeout);
            //
            const datosRespuesta = await respuesta.json();

            if (datosRespuesta.status === "approved") {
                alertSuccess(datosRespuesta.status_detail);
                cargarSaldo(datosRespuesta.transaction_amount);
                //Guarda la info de la tarjeta correcta
                localStorage.setItem("numeroTarjeta",datosRespuesta.card_number);
                localStorage.setItem("cvv",datosRespuesta.cvv);
                //
                cerrar();
            } else if (datosRespuesta.status === "rejected") {
                alertWarning(datosRespuesta.status_detail);
            } else {
                alertError(datosRespuesta.status_detail);
            }
        } catch (error) {
            console.error(error);
            //valida si fue abortado el fetch
            if (controller.signal.aborted) {
                alertError("La solicitud excedió el tiempo de espera");
            } else {
                alertError("No se puede conectar con el servicio");
            }
        }
    };

    const validarSoloNumeros = (cadena: string): string => {
        return cadena.replace(/\D+/g, '');
    }

    return (
        <div className="modal-fondo">

            <div className="snailpay">
                <h2 className="mb-4 text-center">Cargar saldo</h2>

                <div className="form-floating mb-4">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Número de tarjeta"
                        inputMode="numeric"
                        maxLength={16}
                        value={numeroTarjeta}
                        onChange={(e) => setNumeroTarjeta(validarSoloNumeros(e.target.value))}
                    />
                    <label>Número de tarjeta</label>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-floating mb-4">
                            <input
                                className="form-control"
                                type="text"
                                inputMode="numeric"
                                placeholder="Mes vencimiento"
                                maxLength={2}
                                value={mesVencimiento}
                                onChange={(e) => setMesVencimiento(validarSoloNumeros(e.target.value))}
                            />
                            <label>Mes vencimiento</label>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-floating mb-4">
                            <input
                                className="form-control"
                                type="text"
                                inputMode="numeric"
                                maxLength={2}
                                placeholder="Año vencimiento"
                                value={yearVencimiento}
                                onChange={(e) => setYearVencimiento(validarSoloNumeros(e.target.value))}
                            />
                            <label>Año vencimiento</label>
                        </div>
                    </div>
                </div>

                <div className="form-floating mb-4">
                    <input
                        className="form-control"
                        type="text"
                        inputMode="numeric"
                        maxLength={3}
                        placeholder="CVV"
                        value={cvv}
                        onChange={(e) => setCvv(validarSoloNumeros(e.target.value))}
                    />
                    <label>CVV</label>
                </div>

                <div className="form-floating mb-4">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Nombre completo"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <label>Nombre completo</label>
                </div>

                <div className="form-floating mb-4">
                    <input
                        className="form-control"
                        inputMode="numeric"
                        placeholder="Saldo"
                        value={cantidad}
                        onChange={(e) => setCantidad(validarSoloNumeros(e.target.value))}
                    />
                    <label>Saldo</label>
                </div>

                <hr/>

                <div className="snailpay-botones">
                    <button className="btn btn-outline-secondary " onClick={cerrar}>
                        Cancelar
                    </button>

                    <button className="btn btn-outline-secondary " onClick={procesarCarga}>
                        Confirmar
                    </button>
                </div>
            </div>

        </div>
    );
}

export default SnailPay;