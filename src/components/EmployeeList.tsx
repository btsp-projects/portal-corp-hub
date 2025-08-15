import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, MapPin } from "lucide-react";

const employees = [
  {
    id: 1,
    nome: "Ana Silva",
    cargo: "Analista de RH",
    departamento: "Recursos Humanos",
    email: "ana.silva@empresa.com",
    status: "Ativo",
    iniciais: "AS"
  },
  {
    id: 2,
    nome: "Carlos Santos",
    cargo: "Desenvolvedor Senior",
    departamento: "TI",
    email: "carlos.santos@empresa.com",
    status: "Ativo",
    iniciais: "CS"
  },
  {
    id: 3,
    nome: "Maria Oliveira",
    cargo: "Gerente Financeiro",
    departamento: "Financeiro",
    email: "maria.oliveira@empresa.com",
    status: "Férias",
    iniciais: "MO"
  },
  {
    id: 4,
    nome: "João Ferreira",
    cargo: "Coordenador de Operações",
    departamento: "Operações",
    email: "joao.ferreira@empresa.com",
    status: "Ativo",
    iniciais: "JF"
  },
  {
    id: 5,
    nome: "Luisa Costa",
    cargo: "Especialista em Marketing",
    departamento: "Marketing",
    email: "luisa.costa@empresa.com",
    status: "Capacitação",
    iniciais: "LC"
  }
];

const EmployeeList = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-success/10 text-success";
      case "Férias":
        return "bg-warning/10 text-warning";
      case "Capacitação":
        return "bg-primary/10 text-primary";
      default:
        return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card border-0 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Funcionários Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {employees.map((employee) => (
            <div key={employee.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                    {employee.iniciais}
                  </AvatarFallback>
                </Avatar>
                
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-foreground">{employee.nome}</h4>
                    <Badge variant="secondary" className={getStatusColor(employee.status)}>
                      {employee.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{employee.cargo}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{employee.departamento}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Mail className="h-3 w-3" />
                      <span>{employee.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeList;