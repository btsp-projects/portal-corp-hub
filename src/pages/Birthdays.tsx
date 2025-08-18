import { useState } from "react";
import { Cake, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

// Mock data with birthdays
const mockEmployeesWithBirthdays = [
  { id: 1, name: "Ana Silva", department: "TI", position: "Desenvolvedora", email: "ana.silva@empresa.com", birthday: "2024-01-15", initials: "AS" },
  { id: 2, name: "Carlos Santos", department: "RH", position: "Analista", email: "carlos.santos@empresa.com", birthday: "2024-01-08", initials: "CS" },
  { id: 3, name: "Maria Oliveira", department: "Financeiro", position: "Coordenadora", email: "maria.oliveira@empresa.com", birthday: "2024-01-22", initials: "MO" },
  { id: 4, name: "João Costa", department: "TI", position: "Gerente", email: "joao.costa@empresa.com", birthday: "2024-01-30", initials: "JC" },
  { id: 5, name: "Fernanda Lima", department: "Marketing", position: "Especialista", email: "fernanda.lima@empresa.com", birthday: "2024-01-12", initials: "FL" },
  { id: 6, name: "Pedro Almeida", department: "Vendas", position: "Vendedor", email: "pedro.almeida@empresa.com", birthday: "2024-01-25", initials: "PA" },
];

const Birthdays = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  
  // Filter employees who have birthdays in the current month
  const birthdayEmployees = mockEmployeesWithBirthdays.filter(emp => {
    const empBirthday = new Date(emp.birthday);
    return empBirthday.getMonth() + 1 === currentMonth;
  }).filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  }).sort((a, b) => new Date(a.birthday).getDate() - new Date(b.birthday).getDate());

  const getMonthName = (month: number) => {
    const months = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    return months[month - 1];
  };

  const getDaysUntilBirthday = (birthday: string) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    const thisYearBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
    
    if (thisYearBirthday < today) {
      thisYearBirthday.setFullYear(currentYear + 1);
    }
    
    const diffTime = thisYearBirthday.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Aniversariantes</h1>
            <p className="text-muted-foreground">
              Funcionários que fazem aniversário em {getMonthName(currentMonth)}
            </p>
          </div>
          <div className="text-center">
            <Cake className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary">{birthdayEmployees.length}</p>
            <p className="text-sm text-muted-foreground">Este mês</p>
          </div>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Aniversariantes de {getMonthName(currentMonth)}</CardTitle>
            <CardDescription>
              {birthdayEmployees.length} aniversariante(s) este mês
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou setor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {birthdayEmployees.map((employee) => {
                const daysUntil = getDaysUntilBirthday(employee.birthday);
                const isToday = daysUntil === 0;
                
                return (
                  <Card key={employee.id} className={`${isToday ? 'ring-2 ring-primary' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {employee.initials}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground truncate">
                              {employee.name}
                            </h3>
                            {isToday && (
                              <Badge variant="default" className="text-xs">
                                Hoje! 🎉
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-1">
                            {employee.position}
                          </p>
                          
                          <p className="text-sm text-muted-foreground mb-2">
                            {employee.department}
                          </p>
                          
                          <div className="flex items-center gap-2 text-sm">
                            <Cake className="h-4 w-4 text-primary" />
                            <span className="text-primary font-medium">
                              {new Date(employee.birthday).getDate()}/{new Date(employee.birthday).getMonth() + 1}
                            </span>
                            {!isToday && (
                              <span className="text-muted-foreground">
                                ({daysUntil} dias)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {birthdayEmployees.length === 0 && (
              <div className="text-center py-8">
                <Cake className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {searchTerm ? 'Nenhum resultado encontrado' : 'Nenhum aniversariante encontrado este mês'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Birthdays;