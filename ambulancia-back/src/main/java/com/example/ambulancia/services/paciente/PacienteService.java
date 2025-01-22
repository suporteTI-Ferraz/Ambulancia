package com.example.ambulancia.services.paciente;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ambulancia.models.entities.paciente.Paciente;
import com.example.ambulancia.repositories.paciente.PacienteRepository;

@Service
public class PacienteService {

    @Autowired
    PacienteRepository repository;

      public List<Paciente> findAll() {
        return repository.findAll();
    }

     public Paciente findById(Long id) {
        Optional<Paciente> obj = repository.findById(id);
        return obj.orElse(null);
    }

    public Paciente insert(Paciente obj) {
        
        return repository.save(obj);
    }

    public Paciente update (Long id, Paciente obj) {
        Paciente entity = repository.getReferenceById(id);
        updateData(entity, obj);
        return repository.save(entity);
    }
    public void updateData(Paciente entity, Paciente paciente){
        entity.setNomePaciente(paciente.getNomePaciente());
        entity.setCpf(paciente.getCpf());
        entity.setSus(paciente.getSus());
        entity.setCondicoesEspecificas(paciente.getCondicoesEspecificas());
    }

    public void deleteById(Long id){
        Paciente entity = repository.getReferenceById(id);
        entity.setDeletedAt(LocalDateTime.now());
        entity.getEnderecos().forEach((e) -> {
            e.setDeletedAt(LocalDateTime.now());
        });
        entity.getTelefones().forEach((e) ->{
            e.setDeletedAt(LocalDateTime.now());
        });
        repository.save(entity);
    }

      public void reactivateById(Long id){
        Paciente entity = repository.getReferenceById(id);
        entity.setDeletedAt(null);
        entity.setDeletedBy(null);

        entity.getEnderecos().forEach((e) -> {
            e.setDeletedAt(null);
            e.setDeletedBy(null);
        });
        entity.getTelefones().forEach((e) ->{
            e.setDeletedAt(null);
            e.setDeletedBy(null);
        });
        repository.saveAndFlush(entity);
    }

    
}
