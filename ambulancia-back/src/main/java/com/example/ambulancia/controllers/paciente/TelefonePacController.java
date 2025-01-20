package com.example.ambulancia.controllers.paciente;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.ambulancia.models.entities.paciente.TelefonePac;
import com.example.ambulancia.services.paciente.TelefonePacService;

@RestController
@RequestMapping(value = "api")
public class TelefonePacController {

    @Autowired
    TelefonePacService service;

    // @PostMapping(value = "/paciente/{id}/telefone")
    // public ResponseEntity<TelefonePac> insert(@RequestBody TelefonePac telefonePac){
    //     TelefonePac entity = service.insert(telefonePac);
    //     URI location = ServletUriComponentsBuilder
    //     .fromCurrentRequest() // Baseado na URL da requisição atual
    //     .path("/{id}") // Adiciona o ID do recurso criado ao caminho
    //     .buildAndExpand(entity.getId()) // Substitui o {id} pelo ID do usuário criado
    //     .toUri();
    //     return ResponseEntity.created(location).body(entity);
    // }

    
    @PostMapping(value = "/paciente/{id}/telefone")
    public ResponseEntity<List<TelefonePac>> insertMany(@RequestBody List<TelefonePac> telefones,  @PathVariable Long id){
        List<TelefonePac> entity = service.insertMany(telefones, id);
        URI location = ServletUriComponentsBuilder
        .fromCurrentRequest() // URL da requisição atual (/{id})
        .build() // Constrói a URI sem adicionar o ID específico de cada endereço
        .toUri();
        return ResponseEntity.created(location).body(entity);
    }

    @GetMapping(value = "/paciente/telefone")
    public ResponseEntity<List<TelefonePac>> findAll(){
        List<TelefonePac> list = service.findAll();
        return ResponseEntity.ok().body(list);
        
    }

    @GetMapping(value = "/paciente/telefone/{id}")
    public ResponseEntity<TelefonePac> findById(@PathVariable Long id){
        TelefonePac telefonePac = service.findById(id);
        return ResponseEntity.ok().body(telefonePac);
    }

    @PutMapping(value = "/paciente/telefone/{id}")
    public ResponseEntity<TelefonePac> updateById(@PathVariable Long id, @RequestBody TelefonePac telefonePac){
        TelefonePac obj = service.update(id, telefonePac);
        return ResponseEntity.ok(obj);
    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity<TelefonePac> deleteById(@PathVariable Long id){
        TelefonePac deletado = service.deleteById(id);
        return ResponseEntity.ok().body(deletado);
    }
    
}
