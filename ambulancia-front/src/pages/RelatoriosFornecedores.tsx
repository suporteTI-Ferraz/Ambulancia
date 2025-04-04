import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import '../styles/Relatorios.css';
// Import the function to fetch suppliers from the API
import { fetchFornecedores } from '../services/api/VeiculoService';

// Define types for the supplier report data
interface Supplier {
  id: number;
  nomeFornecedor: string;
  cnpj: string;
  telefone: string;
}

interface SupplierReportData {
  title: string;
  date: string;
  data: Supplier[];
}

// Filters type, reused from vehicles for consistency
interface Filters {
  startDate: string;
  endDate: string;
  reportType: 'general' | 'detailed' | 'summary';
}

const RelatoriosFornecedores: React.FC = () => {
  const [reportData, setReportData] = useState<SupplierReportData | null>(null);
  const [filters, setFilters] = useState<Filters>({
    startDate: '',
    endDate: '',
    reportType: 'general',
  });

  const reportRef = useRef<HTMLDivElement>(null);

  // Function to generate the supplier report by fetching data from the API
  const generateReport = async () => {
    try {
      const response = await fetchFornecedores();
      // Map the API response to the expected format.
      // Assuming each supplier has: id, nome, cnpj, and telefone.
      const suppliers: Supplier[] = response.data.map((fornecedor: any) => ({
        id: fornecedor.id,
        nomeFornecedor: fornecedor.nome,
        cnpj: fornecedor.cnpj,
        telefone: fornecedor.telefone,
      }));

      const report: SupplierReportData = {
        title: 'Relatório de Fornecedores de Peças',
        date: new Date().toLocaleDateString('pt-BR'),
        data: suppliers,
      };

      setReportData(report);
    } catch (error) {
      console.error('Erro ao gerar relatório de fornecedores:', error);
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

  // Function to export the supplier report to PDF using jsPDF and autoTable
  const handleExportToPDF = () => {
    if (!reportData) return;
    const pdf = new jsPDF('landscape');

    // Title and date
    pdf.setFontSize(18);
    pdf.text(reportData.title, 14, 22);
    pdf.setFontSize(11);
    pdf.text(`Data: ${reportData.date}`, 14, 30);
    pdf.text(`Filtro: ${filters.reportType}`, 14, 37);
    pdf.text(`Período: ${filters.startDate} a ${filters.endDate}`, 14, 44);

    // Prepare data for the table
    const tableColumn = ['ID', 'Fornecedor', 'CNPJ', 'Telefone'];
    const tableRows: (string | number)[][] = [];

    reportData.data.forEach((supplier) => {
      const rowData: (string | number)[] = [
        supplier.id,
        supplier.nomeFornecedor,
        supplier.cnpj,
        supplier.telefone,
      ];
      tableRows.push(rowData);
    });

    // Generate table with autoTable
    autoTable(pdf, {
      startY: 50,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [128, 22, 22] },
    });

    // Save the PDF file
    pdf.save(`Relatorio_Fornecedores_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Function to export the report to Excel with a custom template for suppliers
  const exportToExcel = () => {
    if (!reportData) return;
  
    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);
  
    // Add custom header information
    XLSX.utils.sheet_add_aoa(ws, [['Relatório: ' + reportData.title]], { origin: 'A1' });
    XLSX.utils.sheet_add_aoa(ws, [['Data: ' + reportData.date]], { origin: 'A2' });
    XLSX.utils.sheet_add_aoa(ws, [['Filtro: ' + filters.reportType], ['Período: ' + filters.startDate + ' a ' + filters.endDate]], { origin: 'A3' });
  
    const header = ['ID', 'Fornecedor', 'CNPJ', 'Telefone'];
    XLSX.utils.sheet_add_aoa(ws, [header], { origin: 'A5' });
  
    // Add supplier data
    const dataForExcel = reportData.data.map((supplier) => [
      supplier.id,
      supplier.nomeFornecedor,
      supplier.cnpj,
      supplier.telefone,
    ]);
    XLSX.utils.sheet_add_aoa(ws, dataForExcel, { origin: 'A6' });
  
    // Define column widths
    ws['!cols'] = [
      { wch: 10 }, // ID
      { wch: 30 }, // Fornecedor
      { wch: 25 }, // CNPJ
      { wch: 20 }, // Telefone
    ];
  
    // Apply formatting: bold header and cell borders
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1:D1');
    for (let R = range.s.r; R <= range.e.r; R++) {
      for (let C = range.s.c; C <= range.e.c; C++) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        const cell = ws[cellAddress];
        if (!cell) continue;
        if (R === 4) { // Header row (A5 is header in 0-index offset)
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
    saveAs(blob, `Relatorio_Fornecedores_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="report-container">
      <div className="div-card-relatorios">
        <h1>Gerador de Relatórios de Fornecedores</h1>
  
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
          <div className='botoes-relatorio-gerar'>
          <button className="report-button" onClick={generateReport}>
            Gerar Relatório
          </button>
          </div>
        </div>
      </div>
  
      {/* Report Section */}
      {reportData && (
        <div ref={reportRef} className="report-content">
          <h2>Fornecedores</h2>
          <p>Data: {reportData.date}</p>
  
          <table className="report-table">
            <thead>
              <tr>
                <th className="report-table-th">ID</th>
                <th className="report-table-th">Fornecedor</th>
                <th className="report-table-th">CNPJ</th>
                <th className="report-table-th">Telefone</th>
              </tr>
            </thead>
            <tbody>
              {reportData.data.map((supplier) => (
                <tr key={supplier.id}>
                  <td className="report-table-td">{supplier.id}</td>
                  <td className="report-table-td">{supplier.nomeFornecedor}</td>
                  <td className="report-table-td">{supplier.cnpj}</td>
                  <td className="report-table-td">{supplier.telefone}</td>
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
}  

export default RelatoriosFornecedores;
