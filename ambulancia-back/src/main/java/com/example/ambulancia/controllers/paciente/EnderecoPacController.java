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

import com.example.ambulancia.models.entities.paciente.EnderecoPac;
import com.example.ambulancia.services.paciente.EnderecoPacService;

@RestController
@RequestMapping(value = "api")
public class EnderecoPacController {

    @Autowired
    EnderecoPacService service;

    // @PostMapping
    // public ResponseEntity<EnderecoPac> insert(@RequestBody EnderecoPac enderecoPac){
    //     EnderecoPac entity = service.insert(enderecoPac);
    //     URI location = ServletUriComponentsBuilder
    //     .fromCurrentRequest() // Baseado na URL da requisição atual
    //     .path("/{id}") // Adiciona o ID do recurso criado ao caminho
    //     .buildAndExpand(entity.getId()) // Substitui o {id} pelo ID do usuário criado
    //     .toUri();
    //     return ResponseEntity.created(location).body(entity);
    // }

    
    @PostMapping(value = "/paciente/{id}/endereco")
    public ResponseEntity<List<EnderecoPac>> insertMany(@RequestBody List<EnderecoPac> enderecoPac, @PathVariable Long id){
        List<EnderecoPac> entity = service.insertMany(enderecoPac, id);
        // Construir a URI base no recurso do paciente
        URI location = ServletUriComponentsBuilder
        .fromCurrentRequest() // URL da requisição atual (/{id})
        .build() // Constrói a URI sem adicionar o ID específico de cada endereço
        .toUri();
        return ResponseEntity.created(location).body(entity);
    }


    @GetMapping(value = "/paciente/endereco")
    public ResponseEntity<List<EnderecoPac>> findAll(){
        List<EnderecoPac> list = service.findAll();
        return ResponseEntity.ok().body(list);
        
    }

    @GetMapping(value = "/paciente/endereco/{id}")
    public ResponseEntity<EnderecoPac> findById(@PathVariable Long id){
        EnderecoPac enderecoPac = service.findById(id);
        return ResponseEntity.ok().body(enderecoPac);
    }

    @PutMapping(value = "/paciente/endereco/{id}")
    public ResponseEntity<EnderecoPac> updateByIdMany(@PathVariable Long id, @RequestBody EnderecoPac novosEnderecos){
        EnderecoPac obj = service.update(id, novosEnderecos);
        return ResponseEntity.ok(obj);
    }

    @PutMapping(value = "/paciente/{id}/endereco")
    public ResponseEntity<List<EnderecoPac>> updateByIdMany(@PathVariable Long id, @RequestBody List<EnderecoPac> novosEnderecos){
        List<EnderecoPac> obj = service.updateMany(id, novosEnderecos);
        return ResponseEntity.ok(obj);
    }

    @DeleteMapping(value = "/paciente/endereco/{id}")
    public ResponseEntity<EnderecoPac> deleteById(@PathVariable Long id){
        EnderecoPac deletado = service.deleteById(id);
        return ResponseEntity.ok().body(deletado);
    }
    
}
