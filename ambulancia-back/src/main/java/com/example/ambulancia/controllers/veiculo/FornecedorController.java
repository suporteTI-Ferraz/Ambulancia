package com.example.ambulancia.controllers.veiculo;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.example.ambulancia.services.veiculo.FornecedorService;
import com.example.ambulancia.models.entities.veiculo.Fornecedor;


@RestController
@RequestMapping(value = "api/fornecedor")
public class FornecedorController {
    @Autowired
    FornecedorService service;

      @PostMapping
    public ResponseEntity<Fornecedor> insert(@RequestBody Fornecedor fornecedor){
        Fornecedor entity = service.insert(fornecedor);
        URI location = ServletUriComponentsBuilder
        .fromCurrentRequest() // Baseado na URL da requisição atual
        .path("/{id}") // Adiciona o ID do recurso criado ao caminho
        .buildAndExpand(entity.getId()) // Substitui o {id} pelo ID do usuário criado
        .toUri();
        return ResponseEntity.created(location).body(entity);
    }
    

    @GetMapping
    public ResponseEntity<List<Fornecedor>> findAll(){
        List<Fornecedor> list = service.findAll();
        return ResponseEntity.ok().body(list);
        
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Fornecedor> findById(@PathVariable Long id){
        Fornecedor fornecedor = service.findById(id);
        return ResponseEntity.ok().body(fornecedor);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Fornecedor> updateById(@PathVariable Long id, @RequestBody Fornecedor fornecedor){
        Fornecedor obj = service.update(id, fornecedor);
        return ResponseEntity.ok(obj);
    }

   @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id){
        service.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping(value = "/reactivate/{id}")
    public ResponseEntity<Void> reactivateById(@PathVariable Long id) {
        service.reactivateById(id);
        return ResponseEntity.ok().build();  // Retorna 200 OK com corpo vazio
    }
    
    
}
