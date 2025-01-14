package com.example.ambulancia.services.paciente;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ambulancia.models.entities.paciente.EnderecoPac;
import com.example.ambulancia.models.entities.paciente.Paciente;
import com.example.ambulancia.repositories.paciente.EnderecoPacRepository;
import com.example.ambulancia.repositories.paciente.PacienteRepository;

@Service
public class EnderecoPacService {
    @Autowired
    EnderecoPacRepository repository;
    @Autowired
    PacienteRepository pacienteRepository;
      public List<EnderecoPac> findAll() {
        return repository.findAll();
    }

     public EnderecoPac findById(Long id) {
        Optional<EnderecoPac> obj = repository.findById(id);
        return obj.orElse(null);
    }

    public EnderecoPac insert(EnderecoPac obj, Long id) {
        Paciente paciente = pacienteRepository.getReferenceById(id);
        obj.setPaciente(paciente);
        return repository.save(obj);
    }

    public List<EnderecoPac> insertMany(List<EnderecoPac> obj, Long id) {
        Paciente paciente = pacienteRepository.getReferenceById(id);
        obj.forEach(endereco -> endereco.setPaciente(paciente));
        return repository.saveAll(obj);
    }

    public EnderecoPac update (Long id, EnderecoPac obj) {
        EnderecoPac entity = repository.getReferenceById(id);
        updateData(entity, obj);
        return repository.save(entity);
    }
    public void updateData(EnderecoPac entity, EnderecoPac enderecoPac){
        entity.setRuaPac(enderecoPac.getRuaPac());
        entity.setBairroPac(enderecoPac.getBairroPac());
        entity.setCepPac(enderecoPac.getCepPac());
        entity.setComplementoPac(enderecoPac.getComplementoPac());
        entity.setNumeroPac(enderecoPac.getNumeroPac());
    }

    public EnderecoPac deleteById(Long id){
        EnderecoPac entity = repository.getReferenceById(id);
        entity.setDeletedAt(LocalDateTime.now());
        return repository.save(entity);
    }

    
}
