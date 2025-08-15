import { Users, UserCheck, UserX, Calendar, FileText, Building2 } from "lucide-react";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import { DepartmentChart, AfastamentosChart } from "@/components/DashboardChart";
import EmployeeList from "@/components/EmployeeList";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatsCard
            title="Total de Funcionários"
            value={210}
            description="Funcionários ativos"
            icon={Users}
            trend={{ value: "+5.2%", isPositive: true }}
          />
          
          <StatsCard
            title="Presentes Hoje"
            value={192}
            description="91% do quadro"
            icon={UserCheck}
            trend={{ value: "+2.1%", isPositive: true }}
          />
          
          <StatsCard
            title="Em Afastamento"
            value={18}
            description="9% do quadro"
            icon={UserX}
            trend={{ value: "-1.5%", isPositive: true }}
          />
          
          <StatsCard
            title="Em Férias"
            value={12}
            description="Este mês"
            icon={Calendar}
          />
          
          <StatsCard
            title="Departamentos"
            value={6}
            description="Setores ativos"
            icon={Building2}
          />
          
          <StatsCard
            title="Documentos"
            value={45}
            description="Modelos disponíveis"
            icon={FileText}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DepartmentChart />
          <AfastamentosChart />
        </div>

        {/* Employee List */}
        <EmployeeList />
      </main>
    </div>
  );
};

export default Dashboard;