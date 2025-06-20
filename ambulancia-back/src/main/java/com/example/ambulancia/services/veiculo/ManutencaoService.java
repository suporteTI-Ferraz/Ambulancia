package com.example.ambulancia.services.veiculo;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import com.example.ambulancia.repositories.veiculo.ManutencaoRepository;
import com.example.ambulancia.repositories.veiculo.VeiculoRepository;
import com.example.ambulancia.models.entities.veiculo.Veiculo;
import com.example.ambulancia.models.entities.veiculo.Fornecedor;
import com.example.ambulancia.repositories.veiculo.FornecedorRepository;

import com.example.ambulancia.models.entities.veiculo.Manutencao;

@Service
public class ManutencaoService {
    @Autowired
    ManutencaoRepository repository;

    @Autowired
    VeiculoRepository veiculoRepository;

    @Autowired
    FornecedorRepository fornecedorRepository;

    public List<Manutencao> findAll() {
        return repository.findAll();
    }

    public Manutencao findById(Long id) {
        Optional<Manutencao> obj = repository.findById(id);
        return obj.orElse(null);
    }

    @Transactional
    public Manutencao insert(Manutencao obj, Long idVeic, Long idForn) {
        Veiculo veiculo = veiculoRepository.getReferenceById(idVeic);
        Fornecedor fornecedor = fornecedorRepository.getReferenceById(idForn);
        obj.setVeiculo(veiculo);
        obj.setFornecedor(fornecedor);
        return repository.save(obj);
    }

    @Transactional
    public List<Manutencao> insertMany(List<Manutencao> manutencoes, Long id) {
        Veiculo veiculo = veiculoRepository.getReferenceById(id);
        for (Manutencao manutencao : manutencoes) {
            manutencao.setVeiculo(veiculo); // Associa o veiculo a cada manutencao
            manutencao.setId(null); // Como o front manda os id de forma numerada, precisa transmor-los em null para
                                    // evitar erros
        }
        return repository.saveAll(manutencoes);
    }

    @Transactional
    public List<Manutencao> insertMany(List<Manutencao> manutencoes, Long idVeic, Long idForn) {
        Veiculo veiculo = veiculoRepository.getReferenceById(idVeic);
        Fornecedor fornecedor = fornecedorRepository.getReferenceById(idForn);

        for (Manutencao manutencao : manutencoes) {
            manutencao.setVeiculo(veiculo); // Associa o veiculo a cada manutencao
            manutencao.setFornecedor(fornecedor);
            manutencao.setId(null); // Como o front manda os id de forma numerada, precisa transmor-los em null para
                                    // evitar erros
        }
        return repository.saveAll(manutencoes);
    }

    @Transactional
    public Manutencao update(Long id, Manutencao obj, Long idVeic, Long idForn) {
        Veiculo veiculo = veiculoRepository.getReferenceById(idVeic);
        Fornecedor fornecedor = fornecedorRepository.getReferenceById(idForn);
        Manutencao entity = repository.getReferenceById(id);
        updateData(entity, obj, veiculo, fornecedor);
        return repository.save(entity);
    }

    private void updateData(Manutencao entity, Manutencao manutencao, Veiculo veiculo, Fornecedor fornecedor) {
        entity.setTipoManutencao(manutencao.getTipoManutencao());
        entity.setCustoMaoObra(manutencao.getCustoMaoObra());
        entity.setCustoPecas(manutencao.getCustoPecas());
        entity.setServicoRealizado(manutencao.getServicoRealizado());
        entity.setDataEntradaManutencao(manutencao.getDataEntradaManutencao());
        entity.setDataSaidaManutencao(manutencao.getDataSaidaManutencao());
        entity.setDescricaoProblema(manutencao.getDescricaoProblema());
        entity.setStatus(manutencao.getStatus());
        entity.setFornecedor(fornecedor);
        entity.setVeiculo(veiculo);
    }

    public List<Manutencao> updateMany(Long id, List<Manutencao> novasManutencoes) {
        Veiculo veiculo = veiculoRepository.getReferenceById(id);
        List<Manutencao> manutencoesAtuais = veiculo.getManutencoes();

        updateData(manutencoesAtuais, novasManutencoes);

        veiculo.setManutencoes(manutencoesAtuais);
        veiculoRepository.save(veiculo);

        return veiculo.getManutencoes();
    }

    private void updateData(List<Manutencao> manutencoesAtuais, List<Manutencao> novasManutencoes) {
        Map<Long, Manutencao> mapaNovasManutencoes = novasManutencoes.stream()
                .collect(Collectors.toMap(Manutencao::getId, manutencao -> manutencao));

        for (Manutencao manutencaoAtual : manutencoesAtuais) {
            Manutencao novaManutencao = mapaNovasManutencoes.get(manutencaoAtual.getId());
            
            if (!Objects.equals(manutencaoAtual.getDataEntradaManutencao(),
                    novaManutencao.getDataEntradaManutencao())) {
                manutencaoAtual.setDataEntradaManutencao(novaManutencao.getDataEntradaManutencao());
            }
            if (!Objects.equals(manutencaoAtual.getDataSaidaManutencao(), novaManutencao.getDataSaidaManutencao())) {
                manutencaoAtual.setDataSaidaManutencao(novaManutencao.getDataSaidaManutencao());

            }
            if (!Objects.equals(manutencaoAtual.getStatus(), novaManutencao.getStatus())) {
                manutencaoAtual.setStatus(novaManutencao.getStatus());
            }
            if (!Objects.equals(manutencaoAtual.getTipoManutencao(), novaManutencao.getTipoManutencao())) {
                manutencaoAtual.setTipoManutencao(novaManutencao.getTipoManutencao());
            }
            if (!Objects.equals(manutencaoAtual.getCustoMaoObra(), novaManutencao.getCustoMaoObra())) {
                manutencaoAtual.setCustoMaoObra(novaManutencao.getCustoMaoObra());
            }
            if (!Objects.equals(manutencaoAtual.getCustoPecas(), novaManutencao.getCustoPecas())) {
                manutencaoAtual.setCustoPecas(novaManutencao.getCustoPecas());
            }
            if (!Objects.equals(manutencaoAtual.getDescricaoProblema(), novaManutencao.getDescricaoProblema())) {
                manutencaoAtual.setDescricaoProblema(novaManutencao.getDescricaoProblema());
            }
            if (!Objects.equals(manutencaoAtual.getServicoRealizado(), novaManutencao.getServicoRealizado())) {
                manutencaoAtual.setServicoRealizado(novaManutencao.getServicoRealizado());
            }

        }
    }

    public Manutencao deleteById(Long id) {
        Manutencao entity = repository.getReferenceById(id);
        entity.setDeletedAt(LocalDateTime.now());
        return repository.save(entity);
    }

    public void reactivateById(Long id) {
        Manutencao entity = repository.getReferenceById(id); // Busca o usuário
        entity.setDeletedAt(null); // Limpa o campo 'deletedAt'
        entity.setDeletedBy(null); // Limpa o campo 'deletedBy'
        repository.saveAndFlush(entity); // Salva e atualiza o usuário no banco
    }

}
