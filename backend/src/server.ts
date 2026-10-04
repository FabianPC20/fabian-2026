import express = require('express');
import cors = require('cors');

// tipos
type DatosPago = {
    card_number: string;
    expiration_date: string;
    cvv: string;
    full_name: string;
    transaction_amount: number;
    payer_id: number;
    payer_email: string;
};

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const validarPago = (datos: DatosPago) => {
    
    if (!datos.card_number || !datos.expiration_date || !datos.cvv || !datos.full_name || datos.transaction_amount === null || datos.transaction_amount === undefined 
        || !datos.payer_id || !datos.payer_email) {
        return ({
            status: "rejected",
            status_detail: "Información incompleta",
            httpStatus: 400
        });
    } else if (datos.card_number !== "1234123412341234") {
        return ({
            status: "rejected",
            status_detail: "Tarjeta rechazada",
            httpStatus: 400
        });
    } else if (datos.expiration_date !== "12/26") {
        return ({
            status: "rejected",
            status_detail: "Fecha de vencimiento invalida",
            httpStatus: 400
        });
    } else if (datos.cvv === "000") {
        return ({
            status: "error",
            status_detail: "Error interno de SnailPay",
            httpStatus: 500
        });
    } else if (datos.cvv !== "543") {
        return ({
            status: "rejected",
            status_detail: "CVV invalido",
            httpStatus: 400
        });
    } else if (datos.full_name.trim() === "") {
        return ({
            status: "rejected",
            status_detail: "Nombre vacio",
            httpStatus: 400
        });
    } else if (datos.transaction_amount <= 0) {
        return ({
            status: "rejected",
            status_detail: "Monto es 0 o menor",
            httpStatus: 400
        });
    }

    return null;
};

app.post("/api/snailpay", (req, res) => {

    const {
        card_number,
        expiration_date,
        cvv,
        full_name,
        transaction_amount,
        payer_id,
        payer_email
    } = req.body;

    const operacionId = Date.now();

    const datosPago: DatosPago = {
        card_number: card_number,
        expiration_date: expiration_date,
        cvv: cvv,
        full_name: full_name,
        transaction_amount: transaction_amount,
        payer_id: payer_id,
        payer_email: payer_email
    };

    const resultadoValidacion = validarPago(datosPago);

    if (resultadoValidacion) {
        return res.status(resultadoValidacion.httpStatus).json({
            id: `${resultadoValidacion.httpStatus}-${operacionId}`,
            status: resultadoValidacion.status,
            status_detail: resultadoValidacion.status_detail,
            transaction_amount: transaction_amount ?? 0,
            date_created: new Date().toISOString(),
            authorization_code: null,
            reference: null,
            payer_id: payer_id ?? null,
            payer_email: payer_email ?? null,
            card_number: card_number ?? null,
            cvv: cvv ?? null
        });
    }
    
    /* CASO CORRECTO */
    return res.status(200).json({
        id: `200-${operacionId}`,
        status: "approved",
        status_detail: "Pago realizado correctamente",
        transaction_amount,
        date_created: new Date().toISOString(),
        authorization_code: `001-${operacionId}`,
        reference: `RE-${operacionId}-7`,
        payer_id,
        payer_email,
        card_number,
        cvv
    });
});
//Arranca el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});


