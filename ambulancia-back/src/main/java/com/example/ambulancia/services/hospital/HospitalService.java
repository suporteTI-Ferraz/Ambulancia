package com.example.ambulancia.services.hospital;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ambulancia.models.entities.hospital.Hospital;
import com.example.ambulancia.repositories.hospital.HospitalRepository;

@Service
public class HospitalService {
    @Autowired
    HospitalRepository repository;

        public List<Hospital> findAll() {
        return repository.findAll();
    }

     public Hospital findById(Long id) {
        Optional<Hospital> obj = repository.findById(id);
        return obj.orElse(null);
    }

    public Hospital insert(Hospital obj) {
        
        return repository.save(obj);
    }

    public Hospital update (Long id, Hospital obj) {
        Hospital entity = repository.getReferenceById(id);
        updateData(entity, obj);
        return repository.save(entity);
    }
    public void updateData(Hospital entity, Hospital hospital){
        entity.setNomeHosp(hospital.getNomeHosp());
    }

    public void deleteById(Long id){
        Hospital entity = repository.getReferenceById(id);
        entity.setDeletedAt(LocalDateTime.now());
        entity.getEnderecos().forEach((e) -> {
            e.setDeletedAt(LocalDateTime.now());
        });
        repository.save(entity);
    }

      public void reactivateById(Long id){
        Hospital entity = repository.getReferenceById(id);
        entity.setDeletedAt(null);
        entity.setDeletedBy(null);

        entity.getEnderecos().forEach((e) -> {
            e.setDeletedAt(null);
            e.setDeletedBy(null);
        });
        repository.saveAndFlush(entity);
    }

    
}
