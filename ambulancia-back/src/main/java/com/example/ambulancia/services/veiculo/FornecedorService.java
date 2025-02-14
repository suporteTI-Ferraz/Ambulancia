package com.example.ambulancia.services.veiculo;
import org.springframework.stereotype.Service;
import com.example.ambulancia.models.entities.veiculo.Fornecedor;
import com.example.ambulancia.models.entities.veiculo.Manutencao;
import com.example.ambulancia.models.entities.veiculo.Veiculo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import com.example.ambulancia.repositories.veiculo.FornecedorRepository;


@Service
public class FornecedorService {
    @Autowired
    FornecedorRepositoy repository;

    @Autowired
    ManutencaoRepository manutencaoRepository;

         public List<Fornecedor> findAll() {
        return repository.findAll();
    }

     public Fornecedor findById(Long id) {
        Optional<Fornecedor> obj = repository.findById(id);
        return obj.orElse(null);
    }

    public Fornecedor insert(Fornecedor obj, Long id) {
       Manutencao manutencao = manutencaoRepository.getReferenceById(id);
        obj.setManutencao(manutencao);

        return repository.save(obj);
    }

}
