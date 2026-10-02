import { BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer } from "recharts";

function GraficaCarrerasDia () {

    const datosCarreras = [
        { nombre: "Yesi", victorias: 3 },
        { nombre: "Fabián", victorias: 1 },
        { nombre: "Turbo", victorias: 0 },
        { nombre: "Luffy", victorias: 1 },
        { nombre: "Naruto", victorias: 1 },
        { nombre: "Goku", victorias: 0 }
    ];

    return (
        <div>
            <h2>Victorias del día</h2>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={datosCarreras} layout="vertical">
                    <XAxis type="number" domain={[0, 6]} />
                    <YAxis dataKey="nombre" type="category" />
                    <Tooltip />

                    <Bar
                        dataKey="victorias"
                        fill="#3161b9"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default GraficaCarrerasDia;