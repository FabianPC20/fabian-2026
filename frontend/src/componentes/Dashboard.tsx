type DashProps = {
    onLogout: () => void;
};

function DashBoard({onLogout} : DashProps) {

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Bienvenido al sistema</p>

            <button onClick={onLogout}>CERRAR SESIÓN</button>
        </div>
    );
}

export default DashBoard;