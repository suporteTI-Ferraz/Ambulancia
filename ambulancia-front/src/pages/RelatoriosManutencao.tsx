
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import '../styles/Relatorios.css';
import { fetchManutencoes } from '../services/api/VeiculoService';

import type Manutencao from '../types/veiculo/ManutencaoType';

// Novo para exibir opcionalmente fornecedor
function getFornecedorName(fornecedor: Manutencao['fornecedor']) {
  if (!fornecedor) return '';
  // Pode customizar, depende dos campos do FornecedorType, exemplo:
  return  fornecedor.nome || '';
}

interface ManutencaoReportData {
  title: string;
  date: string;
  data: Manutencao[];
}

interface Filters {
  startDate: string;
  endDate: string;
  reportType: 'general' | 'detailed' | 'summary';
}

const RelatoriosManutencao: React.FC = () => {
  const [reportData, setReportData] = useState<ManutencaoReportData | null>(null);
  const [filters, setFilters] = useState<Filters>({
    startDate: '',
    endDate: '',
    reportType: 'general',
  });

  const reportRef = useRef<HTMLDivElement>(null);

  const generateReport = async () => {
    try {
      const response = await fetchManutencoes();
      // Mapeamento fiel ao ManutencaoType!
      const data: Manutencao[] = response.data.map((manutencao: any) => ({
        id: manutencao.id,
        dataEntradaManutencao: manutencao.dataEntradaManutencao,
        dataSaidaManutencao: manutencao.dataSaidaManutencao,
        status: manutencao.status,
        tipoManutencao: manutencao.tipoManutencao,
        descricaoProblema: manutencao.descricaoProblema,
        servicoRealizado: manutencao.servicoRealizado,
        custoMaoObra: manutencao.custoMaoObra,
        custoPecas: manutencao.custoPecas,
        deletedAt: manutencao.deletedAt,
        createdAt: manutencao.createdAt,
        veiculo: manutencao.veiculo,
        fornecedor: manutencao.fornecedor,
      }));

      const report: ManutencaoReportData = {
        title: 'Relatório de Manutenções',
        date: new Date().toLocaleDateString('pt-BR'),
        data,
      };

      setReportData(report);
    } catch (error) {
      console.error('Erro ao gerar relatório de manutenção:', error);
    }
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Exportação PDF: colunas ajustadas para o ManutencaoType!
  const handleExportToPDF = () => {
    if (!reportData) return;
    const pdf = new jsPDF('landscape');

    pdf.setFontSize(18);
    pdf.text(reportData.title, 14, 22);
    pdf.setFontSize(11);
    pdf.text(`Data: ${reportData.date}`, 14, 30);
    pdf.text(`Filtro: ${filters.reportType}`, 14, 37);
    pdf.text(`Período: ${filters.startDate} a ${filters.endDate}`, 14, 44);

    const tableColumn = [
      'ID',
      'Criação',
      'Placa',
      'Tipo',
      'Data Entrada',
      'Data Saída',
      'Fornecedor',
      'Custo Mão de Obra',
      'Custo Peças',
      'Situação',
      'Descrição',
      'Serviço',
      'Status',
    ];

    const tableRows: (string | number)[][] = [];

    reportData.data.forEach((manutencao) => {
      const row: (string | number)[] = [
        manutencao.id,
        manutencao.createdAt,
        manutencao.veiculo ? manutencao.veiculo.placaVeic : '',
        manutencao.tipoManutencao,
        manutencao.dataEntradaManutencao,
        manutencao.dataSaidaManutencao,
        getFornecedorName(manutencao.fornecedor),
        manutencao.custoMaoObra?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? '',
        manutencao.custoPecas?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? '',
        manutencao.status,
        manutencao.descricaoProblema,
        manutencao.servicoRealizado,
        manutencao.deletedAt ? 'Desativado' : 'Ativo',
      ];
      tableRows.push(row);
    });

    autoTable(pdf, {
      startY: 50,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [128, 22, 22] }
    });

    pdf.save(`Relatorio_Manutencao_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Exportação Excel ajustada!
  const exportToExcel = () => {
    if (!reportData) return;

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);

    XLSX.utils.sheet_add_aoa(ws, [['Relatório: ' + reportData.title]], { origin: 'A1' });
    XLSX.utils.sheet_add_aoa(ws, [['Data: ' + reportData.date]], { origin: 'A2' });
    XLSX.utils.sheet_add_aoa(ws, [[
      'Filtro: ' + filters.reportType,
      'Período: ' + filters.startDate + ' a ' + filters.endDate
    ]], { origin: 'A3' });

    const header = [
      'ID',
      'Criação',
      'Placa',
      'Tipo',
      'Data Entrada',
      'Data Saída',
      'Fornecedor',
      'Custo Mão de Obra',
      'Custo Peças',
      'Situação',
      'Descrição',
      'Serviço',
      'Status',
    ];
    XLSX.utils.sheet_add_aoa(ws, [header], { origin: 'A5' });

    const dataForExcel = reportData.data.map((manutencao) => [
      manutencao.id,
      manutencao.createdAt,
      manutencao.veiculo ? manutencao.veiculo.placaVeic : '',
      manutencao.tipoManutencao,
      manutencao.dataEntradaManutencao,
      manutencao.dataSaidaManutencao,
      getFornecedorName(manutencao.fornecedor),
      manutencao.custoMaoObra,
      manutencao.custoPecas,
      manutencao.status,
      manutencao.descricaoProblema,
      manutencao.servicoRealizado,
      manutencao.deletedAt ? 'Desativado' : 'Ativo',
    ]);
    XLSX.utils.sheet_add_aoa(ws, dataForExcel, { origin: 'A6' });

    ws['!cols'] = [
      { wch: 8 }, // ID
      { wch: 18 }, // Criação
      { wch: 12 }, // Placa
      { wch: 14 }, // Tipo
      { wch: 18 }, // Data Entrada
      { wch: 18 }, // Data Saída
      { wch: 22 }, // Fornecedor
      { wch: 18 }, // Custo Mão de Obra
      { wch: 18 }, // Custo Peças
      { wch: 15 }, // Situação (status)
      { wch: 35 }, // Descrição
      { wch: 25 }, // Serviço
      { wch: 12 }, // Status
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Relatório');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, `Relatorio_Manutencao_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="report-container">
      <div className='div-card-relatorios'>
        <h1>Gerador de Relatórios de Manutenção</h1>
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
          <div className='botoes-relatorio-gerar'>
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
                <th className="report-table-th">Placa</th>
                <th className="report-table-th">Tipo</th>
                <th className="report-table-th">Data Entrada</th>
                <th className="report-table-th">Data Saída</th>
                <th className="report-table-th">Fornecedor</th>
                <th className="report-table-th">Custo Mão de Obra</th>
                <th className="report-table-th">Custo Peças</th>
                <th className="report-table-th">Situação</th>
                <th className="report-table-th">Descrição</th>
                <th className="report-table-th">Serviço</th>
                <th className="report-table-th">Status</th>
              </tr>
            </thead>
            <tbody>
              {reportData.data.map(manutencao => (
                <tr key={manutencao.id}>
                  <td className="report-table-td">{manutencao.id}</td>
                  <td className="report-table-td">{manutencao.veiculo ? manutencao.veiculo.placaVeic : ''}</td>
                  <td className="report-table-td">{manutencao.tipoManutencao}</td>
                  <td className="report-table-td">{manutencao.dataEntradaManutencao}</td>
                  <td className="report-table-td">{manutencao.dataSaidaManutencao}</td>
                  <td className="report-table-td">{manutencao.fornecedor? manutencao.fornecedor.nome : ''}</td>
                  <td className="report-table-td">{manutencao.custoMaoObra?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? ''}</td>
                  <td className="report-table-td">{manutencao.custoPecas?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? ''}</td>
                  <td className="report-table-td">{manutencao.status}</td>
                  <td className="report-table-td">{manutencao.descricaoProblema}</td>
                  <td className="report-table-td">{manutencao.servicoRealizado}</td>
                  <td className="report-table-td">{manutencao.deletedAt ? 'Desativado' : 'Ativo'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='botoes-relatorio-gerado'>
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

export default RelatoriosManutencao;
