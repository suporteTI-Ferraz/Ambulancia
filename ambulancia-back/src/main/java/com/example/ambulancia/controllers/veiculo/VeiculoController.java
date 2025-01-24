package com.example.ambulancia.controllers.veiculo;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

import com.example.ambulancia.models.entities.veiculo.Veiculo;
import com.example.ambulancia.services.veiculo.VeiculoService;

@RestController
@RequestMapping(value = "api/veiculo")
public class VeiculoController {
    @Autowired
    VeiculoService service;

    @PostMapping
    public ResponseEntity<Veiculo> insert(@RequestBody Veiculo veiculo){
        Veiculo entity = service.insert(veiculo);
        URI location = ServletUriComponentsBuilder
        .fromCurrentRequest() // Baseado na URL da requisição atual
        .path("/{id}") // Adiciona o ID do recurso criado ao caminho
        .buildAndExpand(entity.getId()) // Substitui o {id} pelo ID do usuário criado
        .toUri();
        return ResponseEntity.created(location).body(entity);
    }

    @GetMapping
    public ResponseEntity<List<Veiculo>> findAll(){
        List<Veiculo> list = service.findAll();
        return ResponseEntity.ok().body(list);
        
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Veiculo> findById(@PathVariable Long id){
        Veiculo veiculo = service.findById(id);
        return ResponseEntity.ok().body(veiculo);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Veiculo> updateById(@PathVariable Long id, @RequestBody Veiculo veiculo){
        Veiculo obj = service.update(id, veiculo);
        return ResponseEntity.ok(obj);
    }

   @DeleteMapping(value = "{id}")
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
