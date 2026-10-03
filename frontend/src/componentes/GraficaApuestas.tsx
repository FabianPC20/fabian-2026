import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

function GraficaApuestas () {
    const datosApuestas = [
        { nombre: "Ganadas", cantidad: 7, fill: "#22c55e" },
        { nombre: "Perdidas", cantidad: 3, fill: "#ef4444" }
    ];

    return (
        <div>
            <h2>Histórico de apuestas</h2>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={datosApuestas}
                        dataKey="cantidad"
                        nameKey="nombre"
                        innerRadius={60}
                        outerRadius={100}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #334155" }}
                        itemStyle={{ color: "#ffffff" }}
                        labelStyle={{ color: "#ffffff" }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default GraficaApuestas;