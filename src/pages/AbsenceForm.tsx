import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";

const AbsenceForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    employeeId: "",
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
    notes: ""
  });

  const mockEmployees = [
    { id: "1", name: "Ana Silva" },
    { id: "2", name: "Carlos Santos" },
    { id: "3", name: "Maria Oliveira" },
    { id: "4", name: "João Costa" },
    { id: "5", name: "Fernanda Lima" }
  ];

  const absenceTypes = [
    "Férias",
    "Licença Médica",
    "Capacitação",
    "Licença Paternidade",
    "Licença Maternidade",
    "Falta Justificada",
    "Licença sem Vencimento"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do afastamento:", formData);
    // Aqui você conectaria com o backend
    navigate("/absences");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-main">
      <Header />
      
      <main className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/absences")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Novo Afastamento</h1>
            <p className="text-muted-foreground">Cadastre um novo afastamento de funcionário</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Dados do Afastamento</CardTitle>
                <CardDescription>
                  Preencha as informações do afastamento
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employee">Funcionário *</Label>
                      <Select 
                        value={formData.employeeId} 
                        onValueChange={(value) => handleInputChange("employeeId", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o funcionário" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockEmployees.map((emp) => (
                            <SelectItem key={emp.id} value={emp.id}>
                              {emp.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type">Tipo de Afastamento *</Label>
                      <Select 
                        value={formData.type} 
                        onValueChange={(value) => handleInputChange("type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {absenceTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Data de Início *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange("startDate", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="endDate">Data de Fim *</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => handleInputChange("endDate", e.target.value)}
                        required
                        min={formData.startDate}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Motivo *</Label>
                    <Input
                      id="reason"
                      value={formData.reason}
                      onChange={(e) => handleInputChange("reason", e.target.value)}
                      placeholder="Ex: Consulta médica, curso de capacitação..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      placeholder="Informações adicionais sobre o afastamento..."
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Afastamento
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate("/absences")}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Resumo</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Funcionário:</span>
                    <span>
                      {formData.employeeId ? 
                        mockEmployees.find(emp => emp.id === formData.employeeId)?.name || "Não selecionado" 
                        : "Não selecionado"
                      }
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tipo:</span>
                    <span>{formData.type || "Não selecionado"}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Período:</span>
                    <span>
                      {formData.startDate && formData.endDate ? 
                        `${calculateDays()} dias` : "Não definido"
                      }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Tipos de Afastamento</h3>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p><strong>Férias:</strong> Período de descanso remunerado</p>
                  <p><strong>Licença Médica:</strong> Afastamento por motivos de saúde</p>
                  <p><strong>Capacitação:</strong> Treinamentos e cursos</p>
                  <p><strong>Licença Paternidade:</strong> Nascimento ou adoção</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AbsenceForm;