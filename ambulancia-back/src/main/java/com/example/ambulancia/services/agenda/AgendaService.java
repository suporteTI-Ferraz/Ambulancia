package com.example.ambulancia.services.agenda;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ambulancia.models.entities.agenda.Agenda;
import com.example.ambulancia.repositories.agenda.AgendaRepository;

import jakarta.transaction.Transactional;

@Service
public class AgendaService {

    @Autowired
    AgendaRepository repository;

    public List<Agenda> findAll() {
        return repository.findAll();
    }

    public Agenda findById(Long id) {
        Optional<Agenda> obj = repository.findById(id);
        return obj.orElse(null);
    }

    public Agenda insert(Agenda obj) {
       
        return repository.save(obj);
    }

    public Agenda update (Long id, Agenda obj) {
        Agenda entity = repository.getReferenceById(id);
        updateData(entity, obj);
        return repository.save(entity);
    }
    public void updateData(Agenda entity, Agenda agenda){
        entity.setDiaFinalizado(agenda.getDiaFinalizado());
    }

    public Agenda deleteById(Long id){
        Agenda entity = repository.getReferenceById(id);
        entity.setDeletedAt(LocalDateTime.now());
        return repository.saveAndFlush(entity);
    }

    public void reactivateById(Long id) {
        Agenda entity = repository.getReferenceById(id); // Busca o usuário
        entity.setDeletedAt(null); // Limpa o campo 'deletedAt'
        entity.setDeletedBy(null); // Limpa o campo 'deletedBy'
        repository.saveAndFlush(entity); // Salva e atualiza o motorista no banco
    }

    @Transactional
    public void finalizarAgenda(Long id) {
        Agenda agenda = repository.getReferenceById(id);

        agenda.finalizarDia(); // Recalcula a quilometragem e marca como finalizado
        repository.save(agenda);
    }
    
}
