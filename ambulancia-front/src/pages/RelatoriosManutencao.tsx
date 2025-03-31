
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import '../styles/Relatorios.css';
// Import the function that fetches maintenance records from the API
import { fetchManutencoes } from '../services/api/VeiculoService';

// Updated types for the maintenance report data
interface Manutencao {
  id: number;
  createdAt: string;
  // Instead of directly expecting a field "placaVeic", we now access it via the "veiculo" object.
  veiculo: {
    placaVeic: string;
  } | null;
  tipoManutencao: string;
  dataEntradaManutencao: string;
  dataSaidaManutencao: string;
  custoManutencao: number;
  status: string; // "Situação" field
  descricaoProblema: string;
  servicoRealizado: string;
  deletedAt: string | null;
}

interface ManutencaoReportData {
  title: string;
  date: string;
  data: Manutencao[];
}

// Filters can be extended for future needs
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

  // Function to generate the maintenance report by fetching data from the API
  const generateReport = async () => {
    try {
      const response = await fetchManutencoes();
      // Map the API response to the expected format, now accessing the vehicle plate correctly.
      const manutencoes: Manutencao[] = response.data.map((manutencao: any) => ({
        id: manutencao.id,
        createdAt: manutencao.createdAt,
        // Use the "veiculo" field from the maintenance record to get the license plate.
        veiculo: manutencao.veiculo,
        tipoManutencao: manutencao.tipoManutencao,
        dataEntradaManutencao: manutencao.dataEntradaManutencao,
        dataSaidaManutencao: manutencao.dataSaidaManutencao,
        custoManutencao: manutencao.custoManutencao,
        status: manutencao.status,
        descricaoProblema: manutencao.descricaoProblema,
        servicoRealizado: manutencao.servicoRealizado,
        deletedAt: manutencao.deletedAt
      }));

      const report: ManutencaoReportData = {
        title: 'Relatório de Manutenções',
        date: new Date().toLocaleDateString('pt-BR'),
        data: manutencoes,
      };

      setReportData(report);
    } catch (error) {
      console.error('Erro ao gerar relatório de manutenção:', error);
    }
  };

  // Function to handle filter changes
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to export the report data to PDF using jsPDF and autoTable
  const handleExportToPDF = () => {
    if (!reportData) return;
    const pdf = new jsPDF('landscape');

    // Add title and date
    pdf.setFontSize(18);
    pdf.text(reportData.title, 14, 22);
    pdf.setFontSize(11);
    pdf.text(`Data: ${reportData.date}`, 14, 30);
    pdf.text(`Filtro: ${filters.reportType}`, 14, 37);
    pdf.text(`Período: ${filters.startDate} a ${filters.endDate}`, 14, 44);

    // Prepare data for the table with the new "Placa" column
    const tableColumn = [
      'Id',
      'Criação',
      'Placa',
      'Tipo',
      'Data de Entrada da Manutenção',
      'Data de Saída da Manutenção',
      'Custo',
      'Situação',
      'Descrição',
      'Serviço',
      'Status'
    ];
    const tableRows: (string | number)[][] = [];

    reportData.data.forEach((manutencao) => {
      const rowData: (string | number)[] = [
        manutencao.id,
        manutencao.createdAt,
        manutencao.veiculo ? manutencao.veiculo.placaVeic : '',
        manutencao.tipoManutencao,
        manutencao.dataEntradaManutencao,
        manutencao.dataSaidaManutencao,
        manutencao.custoManutencao,
        manutencao.status,
        manutencao.descricaoProblema,
        manutencao.servicoRealizado,
        manutencao.deletedAt ? 'Desativado' : 'Ativo'
      ];
      tableRows.push(rowData);
    });

    // Generate table with autoTable
    autoTable(pdf, {
      startY: 50,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [128, 22, 22] }
    });

    // Save the PDF file
    pdf.save(`Relatorio_Manutencao_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Function to export the report to Excel with a custom template for maintenance records
  const exportToExcel = () => {
    if (!reportData) return;
  
    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);
  
    // Add custom header information
    XLSX.utils.sheet_add_aoa(ws, [['Relatório: ' + reportData.title]], { origin: 'A1' });
    XLSX.utils.sheet_add_aoa(ws, [['Data: ' + reportData.date]], { origin: 'A2' });
    XLSX.utils.sheet_add_aoa(ws, [['Filtro: ' + filters.reportType], ['Período: ' + filters.startDate + ' a ' + filters.endDate]], { origin: 'A3' });
  
    const header = [
      'Id',
      'Criação',
      'Placa',
      'Tipo',
      'Data de Entrada da Manutenção',
      'Data de Saída da Manutenção',
      'Custo',
      'Situação',
      'Descrição',
      'Serviço',
      'Status'
    ];
    XLSX.utils.sheet_add_aoa(ws, [header], { origin: 'A5' });
  
    // Add maintenance data including vehicle plate
    const dataForExcel = reportData.data.map((manutencao) => [
      manutencao.id,
      manutencao.createdAt,
      manutencao.veiculo ? manutencao.veiculo.placaVeic : '',
      manutencao.tipoManutencao,
      manutencao.dataEntradaManutencao,
      manutencao.dataSaidaManutencao,
      manutencao.custoManutencao,
      manutencao.status,
      manutencao.descricaoProblema,
      manutencao.servicoRealizado,
      manutencao.deletedAt ? 'Desativado' : 'Ativo'
    ]);
    XLSX.utils.sheet_add_aoa(ws, dataForExcel, { origin: 'A6' });
  
    // Define column widths
    ws['!cols'] = [
      { wch: 15 }, // Criação
      { wch: 15 }, // Placa
      { wch: 15 }, // Tipo
      { wch: 25 }, // Data de Entrada
      { wch: 25 }, // Data de Saída
      { wch: 15 }, // Custo
      { wch: 15 }, // Situação
      { wch: 40 }, // Descrição
      { wch: 25 }, // Serviço
      { wch: 15 }  // Status
    ];
  
    // Apply formatting: bold header and cell borders
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1:J1');
    for (let R = range.s.r; R <= range.e.r; R++) {
      for (let C = range.s.c; C <= range.e.c; C++) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        const cell = ws[cellAddress];
        if (!cell) continue;
        if (R === 4) { // Header row (A5 is the header row with 0-index offset)
          cell.s = {
            font: { bold: true },
            alignment: { horizontal: 'center' },
            border: {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            },
          };
        } else if (R >= 5) {
          // Data cells
          cell.s = {
            border: {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            },
          };
        }
      }
    }
  
    // Append the worksheet to the workbook and trigger download
    XLSX.utils.book_append_sheet(wb, ws, 'Relatório');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, `Relatorio_Manutencao_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="report-container">
      <h1>Gerador de Relatórios de Manutenção</h1>

      {/* Filters section */}
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

        <button className="report-button" onClick={generateReport}>
          Gerar Relatório
        </button>
      </div>

      {/* Report section */}
      {reportData && (
        <div ref={reportRef} className="report-content">
          <h2>{reportData.title}</h2>
          <p>Data: {reportData.date}</p>

          <table className="report-table">
            <thead>
              <tr>
                <th className="report-table-th">ID</th>
                <th className="report-table-th">Criação</th>
                <th className="report-table-th">Placa</th>
                <th className="report-table-th">Tipo</th>
                <th className="report-table-th">Data de Entrada da Manutenção</th>
                <th className="report-table-th">Data de Saída da Manutenção</th>
                <th className="report-table-th">Custo</th>
                <th className="report-table-th">Situação</th>
                <th className="report-table-th">Descrição</th>
                <th className="report-table-th">Serviço</th>
                <th className="report-table-th">Status</th>
              </tr>
            </thead>
            <tbody>
              {reportData.data.map((manutencao) => (
                <tr key={manutencao.id}>
                  <td className="report-table-td">{manutencao.id}</td>
                  <td className="report-table-td">{manutencao.createdAt}</td>
                  <td className="report-table-td">{manutencao.veiculo ? manutencao.veiculo.placaVeic : ''}</td>
                  <td className="report-table-td">{manutencao.tipoManutencao}</td>
                  <td className="report-table-td">{manutencao.dataEntradaManutencao}</td>
                  <td className="report-table-td">{manutencao.dataSaidaManutencao}</td>
                  <td className="report-table-td">{manutencao.custoManutencao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <td className="report-table-td">{manutencao.status}</td>
                  <td className="report-table-td">{manutencao.descricaoProblema}</td>
                  <td className="report-table-td">{manutencao.servicoRealizado}</td>
                  <td className="report-table-td">{manutencao.deletedAt ? 'Desativado' : 'Ativo'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="report-button" onClick={handleExportToPDF}>
            Exportar para PDF
          </button>
          <button className="report-button" onClick={exportToExcel}>
            Exportar para Excel
          </button>
        </div>
      )}
    </div>
  );
};

export default RelatoriosManutencao;
