
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import '../styles/Relatorios.css';
// Import the function that fetches maintenance parts from the API
import { fetchPecaManutencoes } from '../services/api/VeiculoService';

// Define types for the maintenance parts report data
interface PecaManutencao {
  id: number;
  nome: string;
  descricao: string;
  dataManutencao: string;
  custo: number;
  quantidade: number;
}

interface PecasReportData {
  title: string;
  date: string;
  data: PecaManutencao[];
}

// Filters can be extended for future needs
interface Filters {
  startDate: string;
  endDate: string;
  reportType: 'general' | 'detailed' | 'summary';
}

const RelatoriosPecas: React.FC = () => {
  const [reportData, setReportData] = useState<PecasReportData | null>(null);
  const [filters, setFilters] = useState<Filters>({
    startDate: '',
    endDate: '',
    reportType: 'general',
  });

  const reportRef = useRef<HTMLDivElement>(null);

  // Function to generate the maintenance parts report by fetching data from the API
  const generateReport = async () => {
    try {
      const response = await fetchPecaManutencoes();
      // Map the API response to the expected format.
      // Assuming each record contains: id, nome, descricao, dataManutencao, custo, and quantidade.
      const pecas: PecaManutencao[] = response.data.map((peca: any) => ({
        id: peca.id,
        nome: peca.nome,
        descricao: peca.descricao,
        dataManutencao: peca.dataManutencao,
        custo: peca.custo,
        quantidade: peca.quantidade,
      }));

      const report: PecasReportData = {
        title: 'Relatório de Peças de Manutenção',
        date: new Date().toLocaleDateString('pt-BR'),
        data: pecas,
      };

      setReportData(report);
    } catch (error) {
      console.error('Erro ao gerar relatório de peças de manutenção:', error);
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

    // Prepare data for the table
    const tableColumn = ['ID', 'Peça', 'Descrição', 'Data da Manutenção', 'Custo', 'Quantidade'];
    const tableRows: (string | number)[][] = [];

    reportData.data.forEach((peca) => {
      const rowData: (string | number)[] = [
        peca.id,
        peca.nome,
        peca.descricao,
        peca.dataManutencao,
        peca.custo,
        peca.quantidade
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
    pdf.save(`Relatorio_Pecas_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Function to export the report to Excel with a custom template for maintenance parts
  const exportToExcel = () => {
    if (!reportData) return;
  
    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);
  
    // Add custom header information
    XLSX.utils.sheet_add_aoa(ws, [['Relatório: ' + reportData.title]], { origin: 'A1' });
    XLSX.utils.sheet_add_aoa(ws, [['Data: ' + reportData.date]], { origin: 'A2' });
    XLSX.utils.sheet_add_aoa(ws, [['Filtro: ' + filters.reportType], ['Período: ' + filters.startDate + ' a ' + filters.endDate]], { origin: 'A3' });
  
    const header = ['ID', 'Peça', 'Descrição', 'Data da Manutenção', 'Custo', 'Quantidade'];
    XLSX.utils.sheet_add_aoa(ws, [header], { origin: 'A5' });
  
    // Add maintenance parts data
    const dataForExcel = reportData.data.map((peca) => [
      peca.id,
      peca.nome,
      peca.descricao,
      peca.dataManutencao,
      peca.custo,
      peca.quantidade
    ]);
    XLSX.utils.sheet_add_aoa(ws, dataForExcel, { origin: 'A6' });
  
    // Define column widths
    ws['!cols'] = [
      { wch: 10 }, // ID
      { wch: 20 }, // Peça
      { wch: 40 }, // Descrição
      { wch: 15 }, // Data da Manutenção
      { wch: 15 }, // Custo
      { wch: 10 }  // Quantidade
    ];
  
    // Apply formatting: bold header and cell borders
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1:F1');
    for (let R = range.s.r; R <= range.e.r; R++) {
      for (let C = range.s.c; C <= range.e.c; C++) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        const cell = ws[cellAddress];
        if (!cell) continue;
        if (R === 4) { // Header row (A5 is the header row given 0-index offset)
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
    saveAs(blob, `Relatorio_Pecas_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="report-container">
      <h1>Gerador de Relatórios de Peças de Manutenção</h1>

      {/* Filters Section */}
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

      {/* Report Section */}
      {reportData && (
        <div ref={reportRef} className="report-content">
          <h2>{reportData.title}</h2>
          <p>Data: {reportData.date}</p>

          <table className="report-table">
            <thead>
              <tr>
                <th className="report-table-th">ID</th>
                <th className="report-table-th">Peça</th>
                <th className="report-table-th">Descrição</th>
                <th className="report-table-th">Data da Manutenção</th>
                <th className="report-table-th">Custo</th>
                <th className="report-table-th">Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {reportData.data.map((peca) => (
                <tr key={peca.id}>
                  <td className="report-table-td">{peca.id}</td>
                  <td className="report-table-td">{peca.nome}</td>
                  <td className="report-table-td">{peca.descricao}</td>
                  <td className="report-table-td">{peca.dataManutencao}</td>
                  <td className="report-table-td">{peca.custo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <td className="report-table-td">{peca.quantidade}</td>
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

export default RelatoriosPecas;
