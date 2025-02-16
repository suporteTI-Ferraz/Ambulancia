package com.example.ambulancia.services.veiculo;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ambulancia.models.entities.veiculo.Manutencao;
import com.example.ambulancia.models.entities.veiculo.PecaManutencao;
import com.example.ambulancia.repositories.veiculo.ManutencaoRepository;
import com.example.ambulancia.repositories.veiculo.PecaManutencaoRepository;

@Service
public class PecaManutencaoService {

    @Autowired
    PecaManutencaoRepository repository;
    @Autowired
    ManutencaoRepository manutencaoRepository;


    public List<PecaManutencao> findAll() {
        return repository.findAll();
    }

     public PecaManutencao findById(Long id) {
        Optional<PecaManutencao> obj = repository.findById(id);
        return obj.orElse(null);
    }

    public PecaManutencao insert(PecaManutencao obj, Long id) {
        Manutencao manutencao = manutencaoRepository.getReferenceById(id);
        obj.setManutencao(manutencao);
        return repository.save(obj);
    }


    @Transactional
    public List<PecaManutencao> insertMany(List<PecaManutencao> pecaManutencoes, Long id) {
        Manutencao manutencao = manutencaoRepository.getReferenceById(id);
        for (PecaManutencao pecaManutencao : pecaManutencoes) {
            pecaManutencao.setManutencao(manutencao); // Associa o veiculo a cada manutencao
            pecaManutencao.setId(null); //Como o front manda os id de forma numerada, precisa transmor-los em null para evitar erros
        }
        return repository.saveAll(pecaManutencoes);
    }

    public PecaManutencao update (Long id, PecaManutencao obj) {
        PecaManutencao entity = repository.getReferenceById(id);
        updateData(entity, obj);
        return repository.save(entity);
    }
    private void updateData(PecaManutencao entity, PecaManutencao pecaManutencao){
        entity.setNomePeca(pecaManutencao.getNomePeca());
        entity.setQuantidade(pecaManutencao.getQuantidade());
        entity.setCustoUnitario(pecaManutencao.getCustoUnitario());
    }

    public List<PecaManutencao> updateMany(Long id, List<PecaManutencao> novasPecas){
        Manutencao manutencao = manutencaoRepository.getReferenceById(id);
        List<PecaManutencao> pecasAtuais = manutencao.getPecasManutencao();

        updateData(pecasAtuais, novasPecas);

        manutencao.setPecasManutencao(pecasAtuais);
        manutencaoRepository.save(manutencao);

        return manutencao.getPecasManutencao();
    }

    private void updateData(List<PecaManutencao> pecasAtuais, List<PecaManutencao> novasPecas){
        Map<Long, PecaManutencao> mapaNovasPecas = novasPecas.stream()
        .collect(Collectors.toMap(PecaManutencao::getId, pecaManutencao -> pecaManutencao));

        for (PecaManutencao pecaAtual : pecasAtuais) {
            PecaManutencao novaPeca = mapaNovasPecas.get(pecaAtual.getId());
            if(!Objects.equals(pecaAtual.getNomePeca(), novaPeca.getNomePeca())){
                pecaAtual.setNomePeca(novaPeca.getNomePeca());
            }
            if(!Objects.equals(pecaAtual.getQuantidade(), novaPeca.getQuantidade())){
                pecaAtual.setQuantidade(novaPeca.getQuantidade());
            }
            if(!Objects.equals(pecaAtual.getCustoUnitario(), novaPeca.getCustoUnitario())){
                pecaAtual.setCustoUnitario(pecaAtual.getCustoUnitario());
            }
            
        }
    }

    public PecaManutencao deleteById(Long id){
        PecaManutencao entity = repository.getReferenceById(id);
        entity.setDeletedAt(LocalDateTime.now());
        return repository.save(entity);
    }

    
}
