
import React, { useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import '../styles/Relatorios.css';
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
  endereco?: string; // Adicionado campo endereço
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
  pacientes: Paciente[];
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
  veiculo: string;
}

const RelatoriosAgendamento: React.FC = () => {
  const [reportData, setReportData] = useState<AgendamentoReportData | null>(null);
  const [filters, setFilters] = useState<Filters>({
    startDate: '',
    endDate: '',
    reportType: 'general',
    motorista: '',
    veiculo: '',
  });
  const [motoristasAvailable, setMotoristasAvailable] = useState<Motorista[]>([]);
  const [veiculosAvailable, setVeiculosAvailable] = useState<Veiculo[]>([]);
  const reportRef = useRef<HTMLDivElement>(null);

  // Função para gerar o relatório de agendamentos com os filtros aplicados
  const generateReport = async () => {
    try {
      const response = await fetchAgendamento();
      const agendamentos: Agendamento[] = response.data.map((agendamento: any) => ({
        id: agendamento.id,
        data: agendamento.data,
        servico: agendamento.servico,
        horarioInic: agendamento.horarioInic,
        horarioFim: agendamento.horarioFim,
        motorista: agendamento.motorista,
        veiculo: agendamento.veiculo,
        hospital: agendamento.hospital,
        pacientes: agendamento.pacientes,
      }));

      // Motoristas únicos
      const uniqueMotoristasMap: Record<number, Motorista> = {};
      agendamentos.forEach(agendamento => {
        if (agendamento.motorista && !uniqueMotoristasMap[agendamento.motorista.id]) {
          uniqueMotoristasMap[agendamento.motorista.id] = agendamento.motorista;
        }
      });
      setMotoristasAvailable(Object.values(uniqueMotoristasMap));

      // Veículos únicos
      const uniqueVeiculosMap: Record<number, Veiculo> = {};
      agendamentos.forEach(agendamento => {
        if (agendamento.veiculo && !uniqueVeiculosMap[agendamento.veiculo.id]) {
          uniqueVeiculosMap[agendamento.veiculo.id] = agendamento.veiculo;
        }
      });
      setVeiculosAvailable(Object.values(uniqueVeiculosMap));

      // Aplica os filtros: data, motorista e veículo
      const filteredAgendamentos = agendamentos.filter(agendamento => {
        const agendamentoDate = new Date(agendamento.data);
        const passesStartDate = filters.startDate ? agendamentoDate >= new Date(filters.startDate) : true;
        const passesEndDate = filters.endDate ? agendamentoDate <= new Date(filters.endDate) : true;
        const passesMotorista = filters.motorista 
          ? (agendamento.motorista && agendamento.motorista.nomeMotorista === filters.motorista)
          : true;
        const passesVeiculo = filters.veiculo
          ? (agendamento.veiculo && agendamento.veiculo.placaVeic === filters.veiculo)
          : true;
        return passesStartDate && passesEndDate && passesMotorista && passesVeiculo;
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

    pdf.setFontSize(18);
    pdf.text(reportData.title, 14, 22);
    pdf.setFontSize(11);
    pdf.text(`Data: ${reportData.date}`, 14, 30);
    pdf.text(`Filtro: ${filters.reportType}`, 14, 37);
    pdf.text(`Período: ${filters.startDate} a ${filters.endDate}`, 14, 44);
    pdf.text(`Motorista: ${filters.motorista || 'Todos'}`, 14, 51);
    pdf.text(`Veículo: ${filters.veiculo || 'Todos'}`, 14, 58);

    // Colunas da tabela
    const tableColumnBase = [
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
    // Se relatório detalhado, adiciona endereço
    const tableColumn = filters.reportType === 'detailed'
      ? [...tableColumnBase, 'Endereço(s) Paciente']
      : tableColumnBase;

    const tableRows: (string | number)[][] = [];

    reportData.data.forEach((agendamento) => {
      const pacientesStr = agendamento.pacientes
        .map(p => p.nomePaciente)
        .join(' | ');

      // Se detalhado, pega o endereço também
      const enderecosStr = agendamento.pacientes
        .map(p => p.endereco || '')
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
      // Só adiciona coluna endereço no detalhado
      if (filters.reportType === 'detailed') {
        rowData.push(enderecosStr);
      }
      tableRows.push(rowData);
    });

    autoTable(pdf, {
      startY: 67,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [128, 22, 22] }
    });

    pdf.save(`Relatorio_Agendamentos_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Exporta relatório para Excel
  const exportToExcel = () => {
    if (!reportData) return;

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);

    XLSX.utils.sheet_add_aoa(ws, [[`Relatório: ${reportData.title}`]], { origin: 'A1' });
    XLSX.utils.sheet_add_aoa(ws, [[`Data: ${reportData.date}`]], { origin: 'A2' });
    XLSX.utils.sheet_add_aoa(ws, [['Filtro: ' + filters.reportType, `Período: ${filters.startDate} a ${filters.endDate}`, `Motorista: ${filters.motorista || 'Todos'}`, `Veículo: ${filters.veiculo || 'Todos'}`]], { origin: 'A3' });

    const headerBase = [
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
    const header = filters.reportType === 'detailed'
      ? [...headerBase, 'Endereço(s) Paciente']
      : headerBase;

    XLSX.utils.sheet_add_aoa(ws, [header], { origin: 'A5' });

    const dataForExcel = reportData.data.map((agendamento) => {
      const row = [
        agendamento.id,
        agendamento.data,
        agendamento.servico,
        agendamento.horarioInic,
        agendamento.horarioFim,
        agendamento.motorista ? agendamento.motorista.nomeMotorista : '',
        agendamento.veiculo ? agendamento.veiculo.placaVeic : '',
        agendamento.hospital ? agendamento.hospital.nomeHosp : '',
        agendamento.pacientes.map(p => p.nomePaciente).join(' | ')
      ];
      if (filters.reportType === 'detailed') {
        row.push(agendamento.pacientes.map(p => p.endereco || '').join(' | '));
      }
      return row;
    });

    XLSX.utils.sheet_add_aoa(ws, dataForExcel, { origin: 'A6' });

    let baseCols = [
      { wch: 10 }, // ID
      { wch: 12 }, // Data
      { wch: 20 }, // Serviço
      { wch: 12 }, // Horário Inic
      { wch: 12 }, // Horário Fim
      { wch: 18 }, // Motorista
      { wch: 15 }, // Veículo
      { wch: 20 }, // Hospital
      { wch: 30 }  // Pacientes
    ];
    if (filters.reportType === 'detailed') {
      baseCols.push({ wch: 40 }); // Endereço(s) Paciente
    }
    ws['!cols'] = baseCols;

    XLSX.utils.book_append_sheet(wb, ws, 'Relatório');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, `Relatorio_Agendamentos_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // Renderização (inclui coluna endereço apenas se detalhado)
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
            <label>Veículo:</label>
            <select name="veiculo" value={filters.veiculo} onChange={handleFilterChange}>
              <option value="">Todos</option>
              {veiculosAvailable.map(v => (
                <option key={v.id} value={v.placaVeic}>{v.placaVeic}</option>
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
                {filters.reportType === 'detailed' && (
                  <th className="report-table-th">Endereço(s) Paciente</th>
                )}
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
                  {filters.reportType === 'detailed' && (
                    <td className="report-table-td">
                      {agendamento.pacientes.map(p => p.endereco || '').join(' | ')}
                    </td>
                  )}
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
