
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import React, { useRef, useState } from 'react';
import '../styles/Relatorios.css';
// Importação da função que busca os fornecedores na API
import { fetchFornecedores } from '../services/api/VeiculoService';

// Definir tipos para os dados do relatório de fornecedores simplificado
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

// Tipos para filtros, se necessário para extensão futura
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

  // Função para gerar o relatório utilizando os dados buscados da API
  const generateReport = async () => {
    try {
      // Chamada à API para buscar fornecedores
      const response = await fetchFornecedores();
      // Mapeamento dos dados para o formato esperado, agora com apenas nome, cnpj e telefone
      const suppliers: Supplier[] = response.data.map((fornecedor: any) => ({
        id: fornecedor.id,
        nomeFornecedor: fornecedor.nome,
        cnpj: fornecedor.cnpj,
        telefone: fornecedor.telefone
      }));

      const report: SupplierReportData = {
        title: 'Relatório de Fornecedores de Peças',
        date: new Date().toLocaleDateString('pt-BR'),
        data: suppliers,
      };

      setReportData(report);
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

  // Função para exportar o relatório para PDF utilizando jsPDF e autoTable
  const exportPDF = () => {
    if (!reportData) return;
    const doc = new jsPDF();
    doc.text(reportData.title, 14, 20);
    doc.text(`Data: ${reportData.date}`, 14, 30);

    // Preparar dados para a tabela com os campos selecionados
    const tableColumns = ['Nome do Fornecedor', 'CNPJ', 'Telefone'];
    const tableRows: any[] = [];

    reportData.data.forEach((supplier) => {
      const supplierData = [
        supplier.nomeFornecedor,
        supplier.cnpj,
        supplier.telefone
      ];
      tableRows.push(supplierData);
    });

    autoTable(doc, {
      head: [tableColumns],
      body: tableRows,
      startY: 40,
    });
    doc.save('relatorio_fornecedores.pdf');
  };

  return (
    <div className="report-container">
      <h1>Gerador de Relatórios de Fornecedores de Peças</h1>

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

      {/* Botão para exportar o relatório */}
      <div className="export-buttons">
        <button className="export-button" onClick={exportPDF}>
          Exportar PDF
        </button>
      </div>

      {/* Seção de exibição do relatório */}
      {reportData && (
        <div ref={reportRef} className="report-content">
          <h2>{reportData.title}</h2>
          <p>Data: {reportData.date}</p>

          <table className="report-table">
            <thead>
              <tr>
                <th className="report-table-th">Nome do Fornecedor</th>
                <th className="report-table-th">CNPJ</th>
                <th className="report-table-th">Telefone</th>
              </tr>
            </thead>
            <tbody>
              {reportData.data.map((supplier) => (
                <tr key={supplier.id}>
                  <td className="report-table-td">{supplier.nomeFornecedor}</td>
                  <td className="report-table-td">{supplier.cnpj}</td>
                  <td className="report-table-td">{supplier.telefone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RelatoriosFornecedores;
