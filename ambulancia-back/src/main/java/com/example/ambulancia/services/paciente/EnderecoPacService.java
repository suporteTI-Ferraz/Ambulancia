package com.example.ambulancia.services.paciente;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public EnderecoPac update(Long id, EnderecoPac obj){
        EnderecoPac entity = repository.getReferenceById(id);
        updateData(entity, obj);
        return repository.save(entity);
    }

    private void updateData(EnderecoPac entity, EnderecoPac enderecoPac){
        entity.setRuaPac(enderecoPac.getRuaPac());
        entity.setBairroPac(enderecoPac.getBairroPac());
        entity.setNumeroPac(enderecoPac.getNumeroPac());
        entity.setCepPac(enderecoPac.getCepPac());
        entity.setComplementoPac(enderecoPac.getComplementoPac());
    }

    public List<EnderecoPac> updateMany(Long id, List<EnderecoPac> novosEnderecos) {
    // Recupera o paciente pelo ID
    Paciente paciente = pacienteRepository.getReferenceById(id);

    // Recupera a lista atual de endereços do paciente
    List<EnderecoPac> enderecosAtuais = paciente.getEnderecos();

    // Atualiza os dados
    updateData(enderecosAtuais, novosEnderecos);

    // Salva as alterações (cascade irá propagar para endereços)
    paciente.setEnderecos(enderecosAtuais);
    pacienteRepository.save(paciente);
    
    return paciente.getEnderecos();
}

private void updateData(List<EnderecoPac> enderecosAtuais, List<EnderecoPac> novosEnderecos) {
    Map<Long, EnderecoPac> mapaNovosEnderecos = novosEnderecos.stream()
            .collect(Collectors.toMap(EnderecoPac::getId, endereco -> endereco));

    for (EnderecoPac enderecoAtual : enderecosAtuais) {
        EnderecoPac novoEndereco = mapaNovosEnderecos.get(enderecoAtual.getId());
        if (novoEndereco != null) {
            // Atualiza os campos do endereço atual com os valores do novo endereço
            if (!Objects.equals(enderecoAtual.getRuaPac(), novoEndereco.getRuaPac())) {
                enderecoAtual.setRuaPac(novoEndereco.getRuaPac());
            }
            if (!Objects.equals(enderecoAtual.getNumeroPac(), novoEndereco.getNumeroPac())) {
                enderecoAtual.setNumeroPac(novoEndereco.getNumeroPac());
            }
            if (!Objects.equals(enderecoAtual.getBairroPac(), novoEndereco.getBairroPac())) {
                enderecoAtual.setBairroPac(novoEndereco.getBairroPac());
            }
            if (!Objects.equals(enderecoAtual.getCepPac(), novoEndereco.getCepPac())) {
                enderecoAtual.setCepPac(novoEndereco.getCepPac());
            }
        }
    }
}

    public EnderecoPac deleteById(Long id){
        EnderecoPac entity = repository.getReferenceById(id);
        entity.setDeletedAt(LocalDateTime.now());
        return repository.save(entity);
    }

    
}
