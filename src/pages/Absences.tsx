import { useState } from "react";
import { Plus, Search, Filter, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";

// Mock data
const mockAbsences = [
  { id: 1, employee: "Ana Silva", type: "Férias", startDate: "2024-01-15", endDate: "2024-01-30", days: 15, status: "Aprovado", reason: "Férias anuais" },
  { id: 2, employee: "Carlos Santos", type: "Licença Médica", startDate: "2024-01-10", endDate: "2024-01-17", days: 7, status: "Ativo", reason: "Tratamento médico" },
  { id: 3, employee: "Maria Oliveira", type: "Capacitação", startDate: "2024-01-08", endDate: "2024-01-12", days: 5, status: "Concluído", reason: "Curso de especialização" },
  { id: 4, employee: "João Costa", type: "Licença Paternidade", startDate: "2024-01-05", endDate: "2024-01-19", days: 14, status: "Ativo", reason: "Nascimento do filho" },
  { id: 5, employee: "Fernanda Lima", type: "Falta Justificada", startDate: "2024-01-03", endDate: "2024-01-03", days: 1, status: "Aprovado", reason: "Consulta médica" },
];

const Absences = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredAbsences = mockAbsences.filter(absence => {
    const matchesSearch = absence.employee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || typeFilter === "all" || absence.type === typeFilter;
    const matchesStatus = !statusFilter || statusFilter === "all" || absence.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprovado": return "bg-success text-success-foreground";
      case "Ativo": return "bg-primary text-primary-foreground";
      case "Concluído": return "bg-secondary text-secondary-foreground";
      case "Pendente": return "bg-warning text-warning-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Férias": return "bg-blue-100 text-blue-800";
      case "Licença Médica": return "bg-red-100 text-red-800";
      case "Capacitação": return "bg-green-100 text-green-800";
      case "Licença Paternidade": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Afastamentos</h1>
            <p className="text-muted-foreground">Gerencie férias, licenças e afastamentos</p>
          </div>
          <Button onClick={() => navigate("/absences/new")}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Afastamento
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Ativo</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Este Mês</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Férias</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-8 w-8 text-red-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Licenças</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Histórico de Afastamentos</CardTitle>
            <CardDescription>
              {filteredAbsences.length} registro(s) encontrado(s)
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por funcionário..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="Férias">Férias</SelectItem>
                  <SelectItem value="Licença Médica">Licença Médica</SelectItem>
                  <SelectItem value="Capacitação">Capacitação</SelectItem>
                  <SelectItem value="Licença Paternidade">Licença Paternidade</SelectItem>
                  <SelectItem value="Falta Justificada">Falta Justificada</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="Aprovado">Aprovado</SelectItem>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Concluído">Concluído</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Funcionário</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Data Início</TableHead>
                    <TableHead>Data Fim</TableHead>
                    <TableHead>Dias</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Motivo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAbsences.map((absence) => (
                    <TableRow key={absence.id}>
                      <TableCell className="font-medium">{absence.employee}</TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(absence.type)}>
                          {absence.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(absence.startDate).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{new Date(absence.endDate).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{absence.days} dias</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(absence.status)}>
                          {absence.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate" title={absence.reason}>
                        {absence.reason}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Absences;