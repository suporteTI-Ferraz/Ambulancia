package com.example.ambulancia.services.paciente;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ambulancia.models.entities.paciente.Paciente;
import com.example.ambulancia.models.entities.paciente.TelefonePac;
import com.example.ambulancia.repositories.paciente.PacienteRepository;
import com.example.ambulancia.repositories.paciente.TelefonePacRepository;


@Service
public class TelefonePacService {
    @Autowired
    TelefonePacRepository repository;

    @Autowired
    PacienteRepository pacienteRepository;

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


    @Transactional
    public List<TelefonePac> insertMany(List<TelefonePac> telefones, Long id) {
        Paciente paciente = pacienteRepository.getReferenceById(id);
        for (TelefonePac telefone : telefones) {
            telefone.setPaciente(paciente); // Associa o paciente a cada telefone
            telefone.setId(null); //Como o front manda os id de forma numerada, precisa transmor-los em null para evitar erros
        }
        return repository.saveAll(telefones);
    }

    public TelefonePac update (Long id, TelefonePac obj) {
        TelefonePac entity = repository.getReferenceById(id);
        updateData(entity, obj);
        return repository.save(entity);
    }
    private void updateData(TelefonePac entity, TelefonePac telefonePac){
        entity.setTipoTel(telefonePac.getTipoTel());
        entity.setNumTel(telefonePac.getNumTel());
    }

    public List<TelefonePac> updateMany(Long id, List<TelefonePac> novosTelefones){
        Paciente paciente = pacienteRepository.getReferenceById(id);
        List<TelefonePac> telefonesAtuais = paciente.getTelefones();

        updateData(telefonesAtuais, novosTelefones);

        paciente.setTelefones(telefonesAtuais);
        pacienteRepository.save(paciente);

        return paciente.getTelefones();
    }

    private void updateData(List<TelefonePac> telefonesAtuais, List<TelefonePac> novosTelefones){
        Map<Long, TelefonePac> mapaNovosTelefones = novosTelefones.stream()
        .collect(Collectors.toMap(TelefonePac::getId, telefone -> telefone));

        for (TelefonePac telefoneAtual : telefonesAtuais) {
            TelefonePac novoTelefone = mapaNovosTelefones.get(telefoneAtual.getId());
            if(!Objects.equals(telefoneAtual.getTipoTel(), novoTelefone.getNumTel())){
                telefoneAtual.setTipoTel(novoTelefone.getTipoTel());
            }
            if(!Objects.equals(telefoneAtual.getNumTel(), novoTelefone.getNumTel())){
                telefoneAtual.setNumTel(novoTelefone.getNumTel());
            }
            
        }
    }

    public TelefonePac deleteById(Long id){
        TelefonePac entity = repository.getReferenceById(id);
        entity.setDeletedAt(LocalDateTime.now());
        return repository.save(entity);
    }
    
}
