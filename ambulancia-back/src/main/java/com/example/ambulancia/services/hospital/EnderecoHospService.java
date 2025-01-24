package com.example.ambulancia.services.hospital;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ambulancia.models.entities.hospital.EnderecoHosp;
import com.example.ambulancia.models.entities.hospital.Hospital;
import com.example.ambulancia.repositories.hospital.EnderecoHospRepository;
import com.example.ambulancia.repositories.hospital.HospitalRepository;

@Service
public class EnderecoHospService {
    @Autowired
    EnderecoHospRepository repository;
    @Autowired
    HospitalRepository hospitalRepository;

      public List<EnderecoHosp> findAll() {
        return repository.findAll();
    }

     public EnderecoHosp findById(Long id) {
        Optional<EnderecoHosp> obj = repository.findById(id);
        return obj.orElse(null);
    }

    public EnderecoHosp insert(EnderecoHosp obj, Long id) {
        Hospital hospital = hospitalRepository.getReferenceById(id);
        obj.setHospital(hospital);
        return repository.save(obj);
    }

    @Transactional
    public List<EnderecoHosp> insertMany(List<EnderecoHosp> enderecos, Long id) {
        Hospital hospital = hospitalRepository.getReferenceById(id);
        for (EnderecoHosp endereco : enderecos) {
            endereco.setHospital(hospital); // Associa o paciente a cada telefone
            endereco.setId(null); //Como o front manda os id de forma numerada, precisa transmor-los em null para evitar erros
        }
        return repository.saveAll(enderecos);
    }

    public EnderecoHosp update(Long id, EnderecoHosp obj){
        EnderecoHosp entity = repository.getReferenceById(id);
        updateData(entity, obj);
        return repository.save(entity);
    }

    private void updateData(EnderecoHosp entity, EnderecoHosp enderecoHosp){
        entity.setRuaHosp(enderecoHosp.getRuaHosp());
        entity.setCidadeHosp(enderecoHosp.getCidadeHosp());
        entity.setBairroHosp(enderecoHosp.getBairroHosp());
        entity.setNumeroHosp(enderecoHosp.getNumeroHosp());
        entity.setCepHosp(enderecoHosp.getCepHosp());
    }

    public List<EnderecoHosp> updateMany(Long id, List<EnderecoHosp> novosEnderecos) {
    // Recupera o paciente pelo ID
    Hospital hospital = hospitalRepository.getReferenceById(id);

    // Recupera a lista atual de endereços do paciente
    List<EnderecoHosp> enderecosAtuais = hospital.getEnderecos();

    // Atualiza os dados
    updateData(enderecosAtuais, novosEnderecos);

    // Salva as alterações (cascade irá propagar para endereços)
    hospital.setEnderecos(enderecosAtuais);
    hospitalRepository.save(hospital);
    
    return hospital.getEnderecos();
}

private void updateData(List<EnderecoHosp> enderecosAtuais, List<EnderecoHosp> novosEnderecos) {
    Map<Long, EnderecoHosp> mapaNovosEnderecos = novosEnderecos.stream()
            .collect(Collectors.toMap(EnderecoHosp::getId, endereco -> endereco));

    for (EnderecoHosp enderecoAtual : enderecosAtuais) {
        EnderecoHosp novoEndereco = mapaNovosEnderecos.get(enderecoAtual.getId());
        if (novoEndereco != null) {
            // Atualiza os campos do endereço atual com os valores do novo endereço
            if (!Objects.equals(enderecoAtual.getRuaHosp(), novoEndereco.getRuaHosp())) {
                enderecoAtual.setRuaHosp(novoEndereco.getRuaHosp());
            }
            if (!Objects.equals(enderecoAtual.getNumeroHosp(), novoEndereco.getNumeroHosp())) {
                enderecoAtual.setNumeroHosp(novoEndereco.getNumeroHosp());
            }
            if (!Objects.equals(enderecoAtual.getBairroHosp(), novoEndereco.getBairroHosp())) {
                enderecoAtual.setBairroHosp(novoEndereco.getBairroHosp());
            }
            if (!Objects.equals(enderecoAtual.getCepHosp(), novoEndereco.getCepHosp())) {
                enderecoAtual.setCepHosp(novoEndereco.getCepHosp());
            }
            if (!Objects.equals(enderecoAtual.getCidadeHosp(), novoEndereco.getCidadeHosp())) {
                enderecoAtual.setCidadeHosp(novoEndereco.getCidadeHosp());
            }

        }
    }
}

   public EnderecoHosp deleteById(Long id){
        EnderecoHosp entity = repository.getReferenceById(id);
        entity.setDeletedAt(LocalDateTime.now());
        return repository.save(entity);
    }


}