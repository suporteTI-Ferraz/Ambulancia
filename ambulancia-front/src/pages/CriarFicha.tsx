

import React, { useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import '../styles/Relatorios.css';
import { fetchAgendamento } from '../services/api/AgendamentoService';
import { EnderecoPac } from '../types/paciente/EnderecoPacType';
import { TelefonePac } from '../types/paciente/TelefonePacType';
import ButtonSpinner from '../components/itens/ButtonSpinner';

// Tipos estendidos para incluir telefones e enderecos.
interface Paciente {
  id: number;
  nomePaciente: string;
  enderecos?: EnderecoPac[];
  telefones?: TelefonePac[];
}
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
  date: string; // Data de geração do relatório
  data: Agendamento[];
  placaVeiculo?: string | null;
}
interface Filters {
  startDate: string;
  motorista: string;
}

// Utils - Formatação de datas para o padrão Brasileiro dd/MM/yyyy, sem bug de fuso horário
function formatDateBR(dateString: string): string {
  if (!dateString) return '';
  // Lida explicitamente com datas no formato "YYYY-MM-DD"
  const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
  let date: Date;
  if (isoRegex.test(dateString)) {
    // Trata como data local, não UTC!
    const parts = dateString.split('-').map(Number);
    // Mês começa do zero no JS!
    date = new Date(parts[0], parts[1] - 1, parts[2]);
  } else {
    date = new Date(dateString);
  }
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('pt-BR');
}

const CriarFicha: React.FC = () => {
  const [reportData, setReportData] = useState<AgendamentoReportData | null>(null);
  const [filters, setFilters] = useState<Filters>({
    startDate: '',
    motorista: ''
  });
  const [motoristasAvailable, setMotoristasAvailable] = useState<Motorista[]>([]);
  const [loading, setLoading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const loadMotoristas = async () => {
      try {
        const response = await fetchAgendamento();
        const motoristas: Motorista[] = [];
        const seen: Record<number, boolean> = {};
        response.data.forEach((agendamento: any) => {
          if (agendamento.motorista && !seen[agendamento.motorista.id]) {
            seen[agendamento.motorista.id] = true;
            motoristas.push(agendamento.motorista);
          }
        });
        setMotoristasAvailable(motoristas);
      } catch (error) {
        setMotoristasAvailable([]);
      }
    };
    loadMotoristas();
  }, []);

  // Função auxiliar para formatar endereço
  function formatEndereco(enderecos: EnderecoPac[] = []): string {
    if (!enderecos.length) return '-';
    const e = enderecos[0];
    let parts = [e.ruaPac];
    if (e.numeroPac) parts.push(e.numeroPac);
    const str = parts.join(', ');
    if (e.bairroPac) return `${str} - ${e.bairroPac}`;
    return str;
  }
  function formatTelefone(telefones: TelefonePac[] = []): string {
    if (!telefones.length) return '-';
    return telefones[0].numTel;
  }

  // Geração da ficha (só se motorista estiver selecionado)
  const generateReport = async () => {
    if (!filters.motorista) return;
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

      const filteredAgendamentos = agendamentos.filter(agendamento => {
        const passesStartDate = filters.startDate ? new Date(agendamento.data) >= new Date(filters.startDate) : true;
        const passesMotorista = agendamento.motorista && agendamento.motorista.nomeMotorista === filters.motorista;
        return passesStartDate && passesMotorista;
      });

      const placaVeiculo =
        filteredAgendamentos.find(ag => ag.veiculo && ag.veiculo.placaVeic)?.veiculo?.placaVeic || null;

      const report: AgendamentoReportData = {
        title: 'Ficha de Agendamentos',
        date: new Date().toLocaleDateString('pt-BR'),
        data: filteredAgendamentos,
        placaVeiculo
      };
      setReportData(report);
    } catch (error) {
      console.error('Erro ao gerar ficha de agendamento:', error);
    }
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExportToPDF = async () => {
    if (!reportData) return;
    setLoading(true);
    try {
      const pdf = new jsPDF('landscape');
      const imageData = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = '/assets/brasao.png';
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Erro ao carregar brasao.png'));
      });

      const imgWidth = 40;
      const imgHeight = 40;
      const marginRight = 10;
      const marginTop = 10;
      const pageWidth = pdf.internal.pageSize.getWidth();

      pdf.addImage(imageData, 'PNG', pageWidth - imgWidth - marginRight, marginTop, imgWidth, imgHeight);

      // Cabeçalho do relatório com datas no formato pt-BR
      pdf.setFontSize(18);
      pdf.text(reportData.title, 14, 22);
      pdf.setFontSize(11);
      pdf.text(`Data: ${filters.startDate ? formatDateBR(filters.startDate) : ''}`, 14, 30);
      pdf.text(`Motorista: ${filters.motorista}`, 14, 38);
      pdf.text(`Placa Veículo: ${reportData.placaVeiculo || '-'}`, 14, 46);
      pdf.text(`Quilometragem final: `, 14, 54);

      const tableColumn = ['Data', 'Horário', 'Paciente', 'Telefone', 'Endereço', 'Hospital'];
      const tableRows: (string | number)[][] = [];

      reportData.data.forEach((agendamento) => {
        (agendamento.pacientes || []).forEach((p) => {
          tableRows.push([
            formatDateBR(agendamento.data),
            agendamento.horarioInic,
            p.nomePaciente,
            formatTelefone(p.telefones),
            formatEndereco(p.enderecos),
            agendamento.hospital ? agendamento.hospital.nomeHosp : '',
          ]);
        });
      });

      autoTable(pdf, {
        startY: 62,
        head: [tableColumn],
        body: tableRows,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [8, 70, 120] }
      });

      pdf.save(`Ficha_Agendamentos_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (err) {
      console.error(err);
      alert('Erro ao gerar PDF com logo. Verifique se a imagem brasao.png existe na pasta /public.');
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    if (!reportData) return;

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);

    XLSX.utils.sheet_add_aoa(ws, [[`Ficha: ${reportData.title}`]], { origin: 'A1' });
    XLSX.utils.sheet_add_aoa(ws, [[`Data: ${filters.startDate ? formatDateBR(filters.startDate) : ''}`]], { origin: 'A2' });
    XLSX.utils.sheet_add_aoa(ws, [[`Motorista: ${filters.motorista}`]], { origin: 'A3' });
    XLSX.utils.sheet_add_aoa(ws, [[`Placa Veículo: ${reportData.placaVeiculo || '-'}`]], { origin: 'A4' });
    XLSX.utils.sheet_add_aoa(ws, [[`Quilometragem final: `]], { origin: 'A5' });

    // Cabeçalho agora inclui "Data"
    const header = ['Data', 'Horário', 'Paciente', 'Telefone', 'Endereço', 'Hospital'];
    XLSX.utils.sheet_add_aoa(ws, [header], { origin: 'A7' });

    const excelRows: (string | number)[][] = [];
    reportData.data.forEach((agendamento) => {
      (agendamento.pacientes || []).forEach((p) => {
        excelRows.push([
          formatDateBR(agendamento.data),
          agendamento.horarioInic,
          p.nomePaciente,
          formatTelefone(p.telefones),
          formatEndereco(p.enderecos),
          agendamento.hospital ? agendamento.hospital.nomeHosp : '',
        ]);
      });
    });

    XLSX.utils.sheet_add_aoa(ws, excelRows, { origin: 'A8' });

    ws['!cols'] = [
      { wch: 12 }, // Data
      { wch: 12 }, // Horario
      { wch: 25 }, // Paciente
      { wch: 18 }, // Telefone
      { wch: 35 }, // Endereco
      { wch: 25 }  // Hospital
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Ficha');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, `Ficha_Agendamentos_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="report-container">
      <div className="div-card-relatorios">
        <h1>Criar Ficha de Motorista</h1>
        <div className="filters-section">
          <div className="filter-group">
            <label>Data Inicial (obrigatório):</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              required
            />
          </div>
          <div className="filter-group">
            <label>Motorista (obrigatório):</label>
            <select
              name="motorista"
              value={filters.motorista}
              onChange={handleFilterChange}
              required
            >
              <option value="">Selecione...</option>
              {motoristasAvailable.map(m => (
                <option key={m.id} value={m.nomeMotorista}>{m.nomeMotorista}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="div-botoes-relarotios">
          <div className="div-botoes-relarotio1">
            <button
              className="report-button"
              onClick={generateReport}
              disabled={!filters.motorista || !filters.startDate}
            >
              Gerar Ficha
            </button>
          </div>
        </div>
      </div>
      {reportData && (
        <div ref={reportRef} className="report-content">
          <h2>{reportData.title}</h2>
          {/* Exibe a data do filtro (formato BR) */}
          <p>Data: {filters.startDate ? formatDateBR(filters.startDate) : ''}</p>
          <p><b>Motorista:</b> {filters.motorista}</p>
          <p><b>Placa Veículo:</b> {reportData.placaVeiculo || '-'}</p>
          <p><b>Quilometragem Final:</b> </p>
          <table className="report-table">
            <thead>
              <tr>
                <th className="report-table-th">Data</th>
                <th className="report-table-th">Horário</th>
                <th className="report-table-th">Paciente</th>
                <th className="report-table-th">Telefone</th>
                <th className="report-table-th">Endereço</th>
                <th className="report-table-th">Hospital</th>
              </tr>
            </thead>
            <tbody>
              {reportData.data.map((agendamento, index) => (
                agendamento.pacientes.map((paciente, i) => (
                  <tr key={`${index}-${i}`}>
                    <td>{formatDateBR(agendamento.data)}</td>
                    <td>{agendamento.horarioInic}</td>
                    <td>{paciente.nomePaciente}</td>
                    <td>{formatTelefone(paciente.telefones)}</td>
                    <td>{formatEndereco(paciente.enderecos)}</td>
                    <td>{agendamento.hospital?.nomeHosp}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
          <div className="botoes-relatorio-gerado">
            <ButtonSpinner
              name="Exportar PDF"
              isLoading={loading}
              onClick={handleExportToPDF}
              classe={"report-button"}
            />
            <button onClick={exportToExcel} className="report-button">
              Exportar Excel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CriarFicha;
