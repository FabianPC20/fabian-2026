type TarjetaSaldoProps = {
    saldo: number;
    abrirCargaSaldo: () => void;
}

function TarjetaSaldo({ saldo, abrirCargaSaldo }: TarjetaSaldoProps) {
    return (
        
        <div >
            <h2 >Saldo actual</h2>
            <div className="tarjeta tarjeta-saldo">
                <h2 className="saldo-cantidad">
                    ${saldo.toFixed(2)}
                </h2>

                <button className="boton-cargar" onClick={abrirCargaSaldo}>
                + Cargar saldo
            </button>
            </div>

            
        </div>
    );
}

export default TarjetaSaldo;