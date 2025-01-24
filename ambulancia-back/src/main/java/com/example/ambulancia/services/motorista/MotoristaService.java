package com.example.ambulancia.services.motorista;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ambulancia.models.entities.motorista.Motorista;
import com.example.ambulancia.repositories.motorista.MotoristaRepository;

@Service
public class MotoristaService {
    @Autowired
    MotoristaRepository repository;

      public List<Motorista> findAll() {
        return repository.findAll();
    }

     public Motorista findById(Long id) {
        Optional<Motorista> obj = repository.findById(id);
        return obj.orElse(null);
    }

    public Motorista insert(Motorista obj) {
       
        return repository.save(obj);
    }

    public Motorista update (Long id, Motorista obj) {
        Motorista entity = repository.getReferenceById(id);
        updateData(entity, obj);
        return repository.save(entity);
    }
    public void updateData(Motorista entity, Motorista motorista){
        entity.setNomeMotorista(motorista.getNomeMotorista());
    }

    public Motorista deleteById(Long id){
        Motorista entity = repository.getReferenceById(id);
        entity.setDeletedAt(LocalDateTime.now());
        return repository.saveAndFlush(entity);
    }

    public void reactivateById(Long id) {
        Motorista entity = repository.getReferenceById(id); // Busca o usuário
        entity.setDeletedAt(null); // Limpa o campo 'deletedAt'
        entity.setDeletedBy(null); // Limpa o campo 'deletedBy'
        repository.saveAndFlush(entity); // Salva e atualiza o motorista no banco
    }

    
}
