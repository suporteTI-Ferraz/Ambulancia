package com.example.ambulancia.services.veiculo;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ambulancia.models.entities.veiculo.Fornecedor;
import com.example.ambulancia.repositories.veiculo.FornecedorRepository;



@Service
public class FornecedorService {
    @Autowired
    FornecedorRepository repository;



         public List<Fornecedor> findAll() {
        return repository.findAll();
    }

     public Fornecedor findById(Long id) {
        Optional<Fornecedor> obj = repository.findById(id);
        return obj.orElse(null);
    }

    public Fornecedor insert(Fornecedor obj) {
        return repository.save(obj);
    }

      public Fornecedor update (Long id, Fornecedor obj) {
        Fornecedor entity = repository.getReferenceById(id);
        updateData(entity, obj);
        return repository.save(entity);
    }
    public void updateData(Fornecedor entity, Fornecedor fornecedor){
        entity.setNome(fornecedor.getNome());
        entity.setCnpj(fornecedor.getCnpj());
        entity.setTelefone(fornecedor.getTelefone());
    }

    public Fornecedor deleteById(Long id){
        Fornecedor entity = repository.getReferenceById(id);
        entity.setDeletedAt(LocalDateTime.now());
        return repository.saveAndFlush(entity);
    }

     public void reactivateById(Long id) {
        Fornecedor entity = repository.getReferenceById(id); // Busca o usuário
        entity.setDeletedAt(null); // Limpa o campo 'deletedAt'
        entity.setDeletedBy(null); // Limpa o campo 'deletedBy'
        repository.saveAndFlush(entity); // Salva e atualiza o usuário no banco
    }

}
