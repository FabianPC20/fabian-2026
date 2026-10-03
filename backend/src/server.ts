import express = require('express');
import cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

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

    /* VALIDACIÓN DE QUE TENEMOS TODOS LOS DATOS */
    if (!card_number || !expiration_date || !cvv || !full_name || transaction_amount === null || transaction_amount === undefined|| !payer_id || !payer_email) {
        return res.status(400).json({
            id: `01-${operacionId}`,
            status: "rejected",
            status_detail: "Información incompleta",
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
    /* VALIDACI[ON DE LA TARJETA */
    if (card_number !== "1234123412341234") {
        return res.status(400).json({
            id: `03-${operacionId}`,
            status: "rejected",
            status_detail: "Tarjeta rechazada",
            transaction_amount,
            date_created: new Date().toISOString(),
            authorization_code: null,
            reference: null,
            payer_id: payer_id ?? null,
            payer_email: payer_email ?? null,
            card_number: card_number ?? null,
            cvv: cvv ?? null
        });
    } else if (expiration_date === "13/25") {
        return res.status(500).json({
            id: `04-${operacionId}`,
            status: "error",
            status_detail: "Error interno de SnailPay",
            transaction_amount,
            date_created: new Date().toISOString(),
            authorization_code: null,
            reference: null,
            payer_id: payer_id ?? null,
            payer_email: payer_email ?? null,
            card_number: card_number ?? null,
            cvv: cvv ?? null
        });
    } else if (expiration_date !== "12/26") {
        return res.status(400).json({
            id: `03-${operacionId}`,
            status: "rejected",
            status_detail: "Fecha de vencimiento invalida",
            transaction_amount,
            date_created: new Date().toISOString(),
            authorization_code: null,
            reference: null,
            payer_id: payer_id ?? null,
            payer_email: payer_email ?? null,
            card_number: card_number ?? null,
            cvv: cvv ?? null
        });
    } else if (cvv !== "543") {
        return res.status(400).json({
            id: `03-${operacionId}`,
            status: "rejected",
            status_detail: "CVV invalido",
            transaction_amount,
            date_created: new Date().toISOString(),
            authorization_code: null,
            reference: null,
            payer_id: payer_id ?? null,
            payer_email: payer_email ?? null,
            card_number: card_number ?? null,
            cvv: cvv ?? null
        });
    } else if (full_name.trim() === "") {
        return res.status(400).json({
            id: `03-${operacionId}`,
            status: "rejected",
            status_detail: "Nombre vacio",
            transaction_amount,
            date_created: new Date().toISOString(),
            authorization_code: null,
            reference: null,
            payer_id: payer_id ?? null,
            payer_email: payer_email ?? null,
            card_number: card_number ?? null,
            cvv: cvv ?? null
        });
    } else if (transaction_amount <= 0) {
        return res.status(400).json({
            id: `03-${operacionId}`,
            status: "rejected",
            status_detail: "Monto es 0 o menor",
            transaction_amount,
            date_created: new Date().toISOString(),
            authorization_code: null,
            reference: null,
            payer_id: payer_id ?? null,
            payer_email: payer_email ?? null,
            card_number: card_number ?? null,
            cvv: cvv ?? null
        });
    }
    /* CASO DE CORRECTO */
    return res.status(200).json({
        id: `02-${operacionId}`,
        status: "approved",
        status_detail: "Pago realizado",
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

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});



/*if (card_number === "1234123412341234" && expiration_date === "12/26" && cvv === "543" && full_name.trim() !== "" && transaction_amount > 0) {
        return res.status(200).json({
            id: `02-${operacionId}`,
            status: "approved",
            status_detail: "Pago realizado",
            transaction_amount,
            date_created: new Date().toISOString(),
            authorization_code: `001-${operacionId}-777`,
            reference: `RE-${operacionId}-7`,
            payer_id,
            payer_email
        });
    } else {
        return res.status(400).json({
            id: `03-${operacionId}`,
            status: "rejected",
            status_detail: "Tarjeta rechazada",
            transaction_amount,
            date_created: new Date().toISOString(),
            authorization_code: null,
            reference: null,
            payer_id: payer_id ?? null,
            payer_email: payer_email ?? null
        });
    }*/

    /*res.json({
        mensaje: "Petición recibida por SnailPay"
    });*/