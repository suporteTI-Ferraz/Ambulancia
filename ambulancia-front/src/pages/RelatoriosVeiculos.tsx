import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import '../styles/Relatorios.css';
// Importar a função que busca os veículos da API
import { fetchVeiculos } from '../services/api/VeiculoService';

// Definir tipos para os dados do relatório de veículos
interface Vehicle {
  id: number;
  licensePlate: string;
  model: string;
  year: number;
  mileage: number;
  chassi: string;
  marca: string;
  classe: string;
  status: string;
}

interface VehicleReportData {
  title: string;
  date: string;
  data: Vehicle[];
}

// Mantemos os filtros, podendo ser expandidos para futuras implementações
interface Filters {
  startDate: string;
  endDate: string;
  reportType: 'general' | 'detailed' | 'summary';
}

const RelatoriosVeiculos: React.FC = () => {
  const [reportData, setReportData] = useState<VehicleReportData | null>(null);
  const [filters, setFilters] = useState<Filters>({
    startDate: '',
    endDate: '',
    reportType: 'general',
  });

  const reportRef = useRef<HTMLDivElement>(null);

  // Função para gerar o relatório com dados de veículos buscados na API
  const generateReport = async () => {
    try {
      // Realiza a chamada para buscar os veículos da API
      const response = await fetchVeiculos();
      // Mapear os veículos retornados para o formato esperado
      // Supondo que cada veículo retornado possui as propriedades:
      // id, placaVeic, modeloVeic, anoFabricacao, quilometragemAtual, chassi, marcaVeic, classe e deletedAt.
      const vehicles: Vehicle[] = response.data.map((veiculo: any) => ({
        id: veiculo.id,
        licensePlate: veiculo.placaVeic,
        model: veiculo.modeloVeic,
        year: veiculo.anoFabricacao,
        mileage: veiculo.quilometragemAtual,
        chassi: veiculo.chassi,
        marca: veiculo.marcaVeic,
        classe: veiculo.classe,
        status: veiculo.deletedAt ? 'Desativado' : 'Ativo'
      }));

      const report: VehicleReportData = {
        title: 'Relatório de Veículos',
        date: new Date().toLocaleDateString('pt-BR'),
        data: vehicles,
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

  // Nova função para exportar o relatório para PDF utilizando jsPDF e autoTable
  const handleExportToPDF = () => {
    if (!reportData) return;
    const pdf = new jsPDF('landscape');
    
    // Título e data
    pdf.setFontSize(18);
    pdf.text(reportData.title, 14, 22);
    pdf.setFontSize(11);
    pdf.text(`Data: ${reportData.date}`, 14, 30);
    pdf.text(`Filtro: ${filters.reportType}`, 14, 37);
    pdf.text(`Período: ${filters.startDate} a ${filters.endDate}`, 14, 44);

    // Preparar dados para a tabela
    const tableColumn = ['ID', 'Placa', 'Modelo', 'Ano', 'Quilometragem', 'Chassi', 'Marca', 'Classe', 'Status'];
    const tableRows: (string | number)[][] = [];

    reportData.data.forEach((vehicle) => {
      const rowData: (string | number)[] = [
        vehicle.id,
        vehicle.licensePlate,
        vehicle.model,
        vehicle.year,
        vehicle.mileage,
        vehicle.chassi,
        vehicle.marca,
        vehicle.classe,
        vehicle.status
      ];
      tableRows.push(rowData);
    });

    // Gerar tabela com autoTable
    autoTable(pdf, {
      startY: 50,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [128, 22, 22] }
    });

    // Salvar PDF
    pdf.save(`Relatorio_${filters.reportType}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Função para exportar como Excel com template personalizado para veículos
  const exportToExcel = () => {
    if (!reportData) return;
  
    // Criar uma nova planilha
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);
  
    // Adicionar cabeçalho personalizado
    XLSX.utils.sheet_add_aoa(ws, [['Relatório: ' + reportData.title]], { origin: 'A1' });
    XLSX.utils.sheet_add_aoa(ws, [['Data: ' + reportData.date]], { origin: 'A2' });
    XLSX.utils.sheet_add_aoa(ws, [['Filtro: ' + filters.reportType], ['Período: ' + filters.startDate + ' a ' + filters.endDate]], { origin: 'A3' });
  
    const header = ['ID', 'Placa', 'Modelo', 'Ano', 'Quilometragem', 'Chassi', 'Marca', 'Classe', 'Status'];
    XLSX.utils.sheet_add_aoa(ws, [header], { origin: 'A5' });
  
    // Adicionar os dados dos veículos
    const dataForExcel = reportData.data.map((vehicle) => [
      vehicle.id,
      vehicle.licensePlate,
      vehicle.model,
      vehicle.year,
      vehicle.mileage,
      vehicle.chassi,
      vehicle.marca,
      vehicle.classe,
      vehicle.status
    ]);
    XLSX.utils.sheet_add_aoa(ws, dataForExcel, { origin: 'A6' });
  
    // Definir largura das colunas
    ws['!cols'] = [
      { wch: 10 }, // ID
      { wch: 15 }, // Placa
      { wch: 25 }, // Modelo
      { wch: 10 }, // Ano
      { wch: 15 }, // Quilometragem
      { wch: 25 }, // Chassi
      { wch: 20 }, // Marca
      { wch: 15 }, // Classe
      { wch: 15 }  // Status
    ];
  
    // Aplicar formatação: cabeçalho em negrito e bordas nas células
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1:I1');
    for (let R = range.s.r; R <= range.e.r; R++) {
      for (let C = range.s.c; C <= range.e.c; C++) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        const cell = ws[cellAddress];
        if (!cell) continue;
        if (R === 4) {
          // Linha do cabeçalho da tabela (A5 em diante, considerando 0-index)
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
          // Dados
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
  
    // Adicionar a planilha ao workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Relatório');
  
    // Gerar o arquivo Excel e iniciar o download
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, `Relatorio_${filters.reportType}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="report-container">
      <div className='div-card-relatorios'>
      <h1>Gerador de Relatórios de Veículos</h1>

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
                <th className="report-table-th">Placa</th>
                <th className="report-table-th">Modelo</th>
                <th className="report-table-th">Ano</th>
                <th className="report-table-th">Quilometragem</th>
                <th className="report-table-th">Chassi</th>
                <th className="report-table-th">Marca</th>
                <th className="report-table-th">Classe</th>
                <th className="report-table-th">Status</th>
              </tr>
            </thead>
            <tbody>
              {reportData.data.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td className="report-table-td">{vehicle.id}</td>
                  <td className="report-table-td">{vehicle.licensePlate}</td>
                  <td className="report-table-td">{vehicle.model}</td>
                  <td className="report-table-td">{vehicle.year}</td>
                  <td className="report-table-td">{vehicle.mileage.toLocaleString('pt-BR')}</td>
                  <td className="report-table-td">{vehicle.chassi}</td>
                  <td className="report-table-td">{vehicle.marca}</td>
                  <td className="report-table-td">{vehicle.classe}</td>
                  <td className="report-table-td">{vehicle.status}</td>
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

export default RelatoriosVeiculos;
