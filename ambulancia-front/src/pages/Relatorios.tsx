// ReportPage.tsx
import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import '../styles/Relatorios.css';

// Definindo tipos para os dados do relatório e filtros
interface ReportItem {
  id: number;
  name: string;
  value: number;
}

interface ReportData {
  title: string;
  date: string;
  data: ReportItem[];
}

interface Filters {
  startDate: string;
  endDate: string;
  reportType: 'general' | 'detailed' | 'summary';
}

const Relatorios: React.FC = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [filters, setFilters] = useState<Filters>({
    startDate: '',
    endDate: '',
    reportType: 'general',
  });

  const reportRef = useRef<HTMLDivElement>(null);

  // Função para gerar o relatório
  const generateReport = async () => {
    try {
      const response: ReportData = {
        title: 'Relatório Gerado',
        date: new Date().toLocaleDateString('pt-BR'),
        data: [
          { id: 1, name: 'Item 1', value: 100 },
          { id: 2, name: 'Item 2', value: 200 },
        ],
      };
      setReportData(response);
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
    }
  };

  // Função para lidar com mudanças nos filtros
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para exportar como PDF
  const handleExportToPDF = useReactToPrint({
    content: () => reportRef.current || null,
    documentTitle: `Relatorio_${filters.reportType}_${new Date().toISOString().split('T')[0]}`,
    onAfterPrint: () => console.log('PDF gerado com sucesso!'),
    onPrintError: (error) => console.error('Erro ao gerar PDF:', error),
  });

  // Função para exportar como Excel com template personalizado
  // Função para exportar como Excel com template personalizado
const exportToExcel = () => {
    if (!reportData) return;
  
    // Criar uma nova planilha
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);
  
    // Adicionar cabeçalho personalizado
    XLSX.utils.sheet_add_aoa(ws, [['Relatório: ' + reportData.title]], { origin: 'A1' });
    XLSX.utils.sheet_add_aoa(ws, [['Data: ' + reportData.date]], { origin: 'A2' });
    XLSX.utils.sheet_add_aoa(ws, [['Filtro: ' + filters.reportType], ['Período: ' + filters.startDate + ' a ' + filters.endDate]], { origin: 'A3' });
  
    const header = ['ID', 'Nome', 'Valor (R$)'];
    XLSX.utils.sheet_add_aoa(ws, [header], { origin: 'A5' });
  
    // Adicionar os dados
    const dataForExcel = reportData.data.map((item) => [item.id, item.name, item.value]);
    XLSX.utils.sheet_add_aoa(ws, dataForExcel, { origin: 'A6' });
  
    // Definir largura das colunas
    ws['!cols'] = [
      { wch: 10 }, // ID
      { wch: 20 }, // Nome
      { wch: 15 }, // Valor
    ];
  
    // Aplicar formatação (exemplo: negrito no cabeçalho e bordas)
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1:C1');
    for (let R = range.s.r; R <= range.e.r; R++) {
      for (let C = range.s.c; C <= range.e.c; C++) {
        const cell = ws[XLSX.utils.encode_cell({ r: R, c: C })];
        if (!cell) continue;
        if (R === 4) {
          // Cabeçalho da tabela
          cell.s = {
            font: { bold: true },
            alignment: { horizontal: 'center' },
            border: { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } },
          };
        } else if (R >= 5) {
          // Dados
          cell.s = {
            border: { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } },
          };
        }
      }
    }
  
    // Adicionar a planilha ao workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Relatório');
  
    // Gerar o arquivo Excel e fazer o download
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, `Relatorio_${filters.reportType}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="report-container">
      <h1>Gerador de Relatórios</h1>

      {/* Seção de Filtros */}
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

      {/* Seção do Relatório */}
      {reportData && (
        <div ref={reportRef} className="report-content">
          <h2>{reportData.title}</h2>
          <p>Data: {reportData.date}</p>

          <table className="report-table">
            <thead>
              <tr>
                <th className="report-table-th">ID</th>
                <th className="report-table-th">Nome</th>
                <th className="report-table-th">Valor</th>
              </tr>
            </thead>
            <tbody>
              {reportData.data.map((item) => (
                <tr key={item.id}>
                  <td className="report-table-td">{item.id}</td>
                  <td className="report-table-td">{item.name}</td>
                  <td className="report-table-td">{item.value.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="report-button"
            onClick={() => {
              if (reportRef.current) {
                handleExportToPDF();
              } else {
                console.error('Erro: Conteúdo do relatório não encontrado.');
              }
            }}
          >
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

export default Relatorios;