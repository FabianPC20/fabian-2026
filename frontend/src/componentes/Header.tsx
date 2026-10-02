import "../styles/Header.css";

type HeaderProps = {
    onLogout: () => void;
}

function Header({ onLogout }: HeaderProps) {
    return (
        <header className="header">
            <div className="header-logo">
                🐌 Apuestas rapidas
            </div>

            <div className="header-usuario">
                <button onClick={onLogout}>Cerrar sesión</button>
            </div>
        </header>
    );
}

export default Header;