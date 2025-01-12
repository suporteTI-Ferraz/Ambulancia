package com.example.ambulancia.services.paciente;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ambulancia.models.entities.paciente.TelefonePac;
import com.example.ambulancia.repositories.paciente.TelefonePacRepository;


@Service
public class TelefonePacService {
    @Autowired
    TelefonePacRepository repository;

      public List<TelefonePac> findAll() {
        return repository.findAll();
    }

     public TelefonePac findById(Long id) {
        Optional<TelefonePac> obj = repository.findById(id);
        return obj.orElse(null);
    }

    public TelefonePac insert(TelefonePac obj) {
       
        return repository.save(obj);
    }

    public TelefonePac update (Long id, TelefonePac obj) {
        TelefonePac entity = repository.getReferenceById(id);
        updateData(entity, obj);
        return repository.save(entity);
    }
    public void updateData(TelefonePac entity, TelefonePac telefonePac){
        entity.setTipoTel(telefonePac.getTipoTel());
        entity.setNumTel(telefonePac.getNumTel());
    }

    public TelefonePac deleteById(Long id){
        TelefonePac entity = repository.getReferenceById(id);
        entity.setDeletedAt(LocalDateTime.now());
        return repository.save(entity);
    }
    
}
