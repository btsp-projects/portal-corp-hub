import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const departmentData = [
  { name: "Administração", funcionarios: 45 },
  { name: "TI", funcionarios: 32 },
  { name: "Recursos Humanos", funcionarios: 18 },
  { name: "Financeiro", funcionarios: 25 },
  { name: "Operações", funcionarios: 67 },
  { name: "Marketing", funcionarios: 23 }
];

const afastamentosData = [
  { name: "Saúde", value: 35, color: "#ef4444" },
  { name: "Capacitação", value: 28, color: "#3b82f6" },
  { name: "Férias", value: 42, color: "#10b981" },
  { name: "Outros", value: 15, color: "#f59e0b" }
];

export const DepartmentChart = () => {
  return (
    <Card className="bg-gradient-card shadow-card border-0 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Funcionários por Departamento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={departmentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              fontSize={12}
              stroke="hsl(var(--muted-foreground))"
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
            <Bar 
              dataKey="funcionarios" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export const AfastamentosChart = () => {
  return (
    <Card className="bg-gradient-card shadow-card border-0 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Afastamentos por Motivo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={afastamentosData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
              fontSize={12}
            >
              {afastamentosData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {afastamentosData.map((item) => (
            <div key={item.name} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">
                {item.name}: {item.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};