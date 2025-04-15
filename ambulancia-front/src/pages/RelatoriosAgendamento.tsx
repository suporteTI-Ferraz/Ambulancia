
import React, { useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import '../styles/Relatorios.css';
// Importa a função que busca os agendamentos da API
import { fetchAgendamento } from '../services/api/AgendamentoService';

interface Motorista {
  id: number;
  nomeMotorista: string;
}

interface Veiculo {
  id: number;
  placaVeic: string;
}

interface Hospital {
  id: number;
  nomeHosp: string;
}

interface Paciente {
  id: number;
  nomePaciente: string;
}

interface Agendamento {
  id: number;
  data: string;
  servico: string;
  horarioInic: string;
  horarioFim: string;
  motorista: Motorista | null;
  veiculo: Veiculo | null;
  hospital: Hospital | null;
  pacientes: Paciente[]; // Lista de pacientes envolvidos
}

interface AgendamentoReportData {
  title: string;
  date: string;
  data: Agendamento[];
}

interface Filters {
  startDate: string;
  endDate: string;
  reportType: 'general' | 'detailed' | 'summary';
  motorista: string;
}

const RelatoriosAgendamento: React.FC = () => {
  const [reportData, setReportData] = useState<AgendamentoReportData | null>(null);
  const [filters, setFilters] = useState<Filters>({
    startDate: '',
    endDate: '',
    reportType: 'general',
    motorista: '',
  });
  // State to hold unique motoristas available in the fetched data
  const [motoristasAvailable, setMotoristasAvailable] = useState<Motorista[]>([]);
  const reportRef = useRef<HTMLDivElement>(null);

  // Função para gerar o relatório de agendamentos com os filtros aplicados
  const generateReport = async () => {
    try {
      const response = await fetchAgendamento();
      // Mapeia a resposta da API para o formato esperado
      const agendamentos: Agendamento[] = response.data.map((agendamento: any) => ({
        id: agendamento.id,
        data: agendamento.data,
        servico: agendamento.servico,
        horarioInic: agendamento.horarioInic,
        horarioFim: agendamento.horarioFim,
        motorista: agendamento.motorista, // Assumindo objeto { id, nomeMotorista }
        veiculo: agendamento.veiculo,     // Assumindo objeto { id, placaVeic }
        hospital: agendamento.hospital,     // Assumindo objeto { id, nomeHosp }
        pacientes: agendamento.pacientes    // Assumindo array de { id, nomePaciente }
      }));
      
      // Extraindo motoristas únicos dos agendamentos
      const uniqueMotoristasMap: Record<number, Motorista> = {};
      agendamentos.forEach(agendamento => {
        if (agendamento.motorista && !uniqueMotoristasMap[agendamento.motorista.id]) {
          uniqueMotoristasMap[agendamento.motorista.id] = agendamento.motorista;
        }
      });
      setMotoristasAvailable(Object.values(uniqueMotoristasMap));

      // Aplica os filtros: data e motorista
      const filteredAgendamentos = agendamentos.filter(agendamento => {
        const agendamentoDate = new Date(agendamento.data);
        const passesStartDate = filters.startDate ? agendamentoDate >= new Date(filters.startDate) : true;
        const passesEndDate = filters.endDate ? agendamentoDate <= new Date(filters.endDate) : true;
        const passesMotorista = filters.motorista 
          ? (agendamento.motorista && agendamento.motorista.nomeMotorista === filters.motorista)
          : true;
        return passesStartDate && passesEndDate && passesMotorista;
      });

      const report: AgendamentoReportData = {
        title: 'Relatório de Agendamentos',
        date: new Date().toLocaleDateString('pt-BR'),
        data: filteredAgendamentos,
      };
      setReportData(report);
    } catch (error) {
      console.error('Erro ao gerar relatório de agendamento:', error);
    }
  };

  // Função para alterar os filtros
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Exporta o relatório para PDF
  const handleExportToPDF = () => {
    if (!reportData) return;
    const pdf = new jsPDF('landscape');

    // Cabeçalho do PDF
    pdf.setFontSize(18);
    pdf.text(reportData.title, 14, 22);
    pdf.setFontSize(11);
    pdf.text(`Data: ${reportData.date}`, 14, 30);
    pdf.text(`Filtro: ${filters.reportType}`, 14, 37);
    pdf.text(`Período: ${filters.startDate} a ${filters.endDate}`, 14, 44);
    pdf.text(`Motorista: ${filters.motorista || 'Todos'}`, 14, 51);

    // Colunas da tabela
    const tableColumn = [
      'ID',
      'Data',
      'Serviço',
      'Horário Inic',
      'Horário Fim',
      'Motorista',
      'Veículo',
      'Hospital',
      'Pacientes'
    ];

    const tableRows: (string | number)[][] = [];

    reportData.data.forEach((agendamento) => {
      // Concatena os nomes dos pacientes, se houver
      const pacientesStr = agendamento.pacientes
        .map(p => p.nomePaciente)
        .join(' | ');

      const rowData: (string | number)[] = [
        agendamento.id,
        agendamento.data,
        agendamento.servico,
        agendamento.horarioInic,
        agendamento.horarioFim,
        agendamento.motorista ? agendamento.motorista.nomeMotorista : '',
        agendamento.veiculo ? agendamento.veiculo.placaVeic : '',
        agendamento.hospital ? agendamento.hospital.nomeHosp : '',
        pacientesStr
      ];
      tableRows.push(rowData);
    });

    autoTable(pdf, {
      startY: 60,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [128, 22, 22] }
    });

    pdf.save(`Relatorio_Agendamentos_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Exporta o relatório para Excel
  const exportToExcel = () => {
    if (!reportData) return;

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);

    // Cabeçalhos customizados
    XLSX.utils.sheet_add_aoa(ws, [[`Relatório: ${reportData.title}`]], { origin: 'A1' });
    XLSX.utils.sheet_add_aoa(ws, [[`Data: ${reportData.date}`]], { origin: 'A2' });
    XLSX.utils.sheet_add_aoa(ws, [['Filtro: ' + filters.reportType, `Período: ${filters.startDate} a ${filters.endDate}`, `Motorista: ${filters.motorista || 'Todos'}`]], { origin: 'A3' });

    const header = [
      'ID',
      'Data',
      'Serviço',
      'Horário Inic',
      'Horário Fim',
      'Motorista',
      'Veículo',
      'Hospital',
      'Pacientes'
    ];
    XLSX.utils.sheet_add_aoa(ws, [header], { origin: 'A5' });

    // Dados dos agendamentos
    const dataForExcel = reportData.data.map((agendamento) => [
      agendamento.id,
      agendamento.data,
      agendamento.servico,
      agendamento.horarioInic,
      agendamento.horarioFim,
      agendamento.motorista ? agendamento.motorista.nomeMotorista : '',
      agendamento.veiculo ? agendamento.veiculo.placaVeic : '',
      agendamento.hospital ? agendamento.hospital.nomeHosp : '',
      agendamento.pacientes.map(p => p.nomePaciente).join(' | ')
    ]);
    XLSX.utils.sheet_add_aoa(ws, dataForExcel, { origin: 'A6' });

    // Define larguras das colunas
    ws['!cols'] = [
      { wch: 10 },
      { wch: 12 },
      { wch: 20 },
      { wch: 12 },
      { wch: 12 },
      { wch: 18 },
      { wch: 15 },
      { wch: 20 },
      { wch: 30 }
    ];

    // Adiciona a planilha no workbook e dispara o download
    XLSX.utils.book_append_sheet(wb, ws, 'Relatório');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, `Relatorio_Agendamentos_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="report-container">
      <div className="div-card-relatorios">
        <h1>Gerador de Relatório de Agendamentos</h1>

        <div className="filters-section">
          <div className="filter-group">
            <label>Data Inicial:</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </div>

          <div className="filter-group">
            <label>Data Final:</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </div>

          <div className="filter-group">
            <label>Motorista:</label>
            <select name="motorista" value={filters.motorista} onChange={handleFilterChange}>
              <option value="">Todos</option>
              {motoristasAvailable.map(m => (
                <option key={m.id} value={m.nomeMotorista}>{m.nomeMotorista}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Tipo de Relatório:</label>
            <select
              name="reportType"
              value={filters.reportType}
              onChange={handleFilterChange}
            >
              <option value="general">Geral</option>
              <option value="detailed">Detalhado</option>
              <option value="summary">Resumido</option>
            </select>
          </div>

          <div className="botoes-relatorio-gerar">
            <button className="report-button" onClick={generateReport}>
              Gerar Relatório
            </button>
          </div>
        </div>
      </div>

      {reportData && (
        <div ref={reportRef} className="report-content">
          <h2>{reportData.title}</h2>
          <p>Data: {reportData.date}</p>

          <table className="report-table">
            <thead>
              <tr>
                <th className="report-table-th">ID</th>
                <th className="report-table-th">Data</th>
                <th className="report-table-th">Serviço</th>
                <th className="report-table-th">Horário Inic</th>
                <th className="report-table-th">Horário Fim</th>
                <th className="report-table-th">Motorista</th>
                <th className="report-table-th">Veículo</th>
                <th className="report-table-th">Hospital</th>
                <th className="report-table-th">Pacientes</th>
              </tr>
            </thead>
            <tbody>
              {reportData.data.map(agendamento => (
                <tr key={agendamento.id}>
                  <td className="report-table-td">{agendamento.id}</td>
                  <td className="report-table-td">{agendamento.data}</td>
                  <td className="report-table-td">{agendamento.servico}</td>
                  <td className="report-table-td">{agendamento.horarioInic}</td>
                  <td className="report-table-td">{agendamento.horarioFim}</td>
                  <td className="report-table-td">{agendamento.motorista ? agendamento.motorista.nomeMotorista : ''}</td>
                  <td className="report-table-td">{agendamento.veiculo ? agendamento.veiculo.placaVeic : ''}</td>
                  <td className="report-table-td">{agendamento.hospital ? agendamento.hospital.nomeHosp : ''}</td>
                  <td className="report-table-td">
                    {agendamento.pacientes.map(p => p.nomePaciente).join(' | ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="botoes-relatorio-gerado">
            <button className="report-button" onClick={handleExportToPDF}>
              Exportar para PDF
            </button>
            <button className="report-button" onClick={exportToExcel}>
              Exportar para Excel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatoriosAgendamento;
