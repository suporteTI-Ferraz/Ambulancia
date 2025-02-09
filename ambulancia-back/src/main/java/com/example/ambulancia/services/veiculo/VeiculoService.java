package com.example.ambulancia.services.veiculo;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ambulancia.models.entities.veiculo.Veiculo;
import com.example.ambulancia.repositories.veiculo.VeiculoRepository;

@Service
public class VeiculoService {

    @Autowired
    VeiculoRepository repository;

      public List<Veiculo> findAll() {
        return repository.findAll();
    }

     public Veiculo findById(Long id) {
        Optional<Veiculo> obj = repository.findById(id);
        return obj.orElse(null);
    }

    public Veiculo insert(Veiculo obj) {
       
        return repository.save(obj);
    }

    public Veiculo update (Long id, Veiculo obj) {
        Veiculo entity = repository.getReferenceById(id);
        updateData(entity, obj);
        return repository.save(entity);
    }
    public void updateData(Veiculo entity, Veiculo veiculo){
        entity.setPlacaVeic(veiculo.getPlacaVeic());
        entity.setQuilometragemAtual(veiculo.getQuilometragemAtual());
    }

    public Veiculo deleteById(Long id){
        Veiculo entity = repository.getReferenceById(id);
        entity.setDeletedAt(LocalDateTime.now());
        return repository.saveAndFlush(entity);
    }

     public void reactivateById(Long id) {
        Veiculo entity = repository.getReferenceById(id); // Busca o usuário
        entity.setDeletedAt(null); // Limpa o campo 'deletedAt'
        entity.setDeletedBy(null); // Limpa o campo 'deletedBy'
        repository.saveAndFlush(entity); // Salva e atualiza o usuário no banco
    }

    
}
