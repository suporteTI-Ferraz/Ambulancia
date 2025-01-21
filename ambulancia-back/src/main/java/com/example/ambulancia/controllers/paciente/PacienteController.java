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

import com.example.ambulancia.models.entities.paciente.Paciente;
import com.example.ambulancia.services.paciente.PacienteService;

@RestController
@RequestMapping(value = "api/paciente")
public class PacienteController {

    @Autowired
    PacienteService service;

    @PostMapping
    public ResponseEntity<Paciente> insert(@RequestBody Paciente paciente){
        Paciente entity = service.insert(paciente);
        URI location = ServletUriComponentsBuilder
        .fromCurrentRequest() // Baseado na URL da requisição atual
        .path("/{id}") // Adiciona o ID do recurso criado ao caminho
        .buildAndExpand(entity.getId()) // Substitui o {id} pelo ID do usuário criado
        .toUri();
        return ResponseEntity.created(location).body(entity);
    }

    @GetMapping
    public ResponseEntity<List<Paciente>> findAll(){
        List<Paciente> list = service.findAll();
        return ResponseEntity.ok().body(list);
        
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Paciente> findById(@PathVariable Long id){
        Paciente paciente = service.findById(id);
        return ResponseEntity.ok().body(paciente);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Paciente> updateById(@PathVariable Long id, @RequestBody Paciente paciente){
        Paciente obj = service.update(id, paciente);
        return ResponseEntity.ok(obj);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id){
        service.deleteById(id);
        return ResponseEntity.ok().build();  // Retorna 200 OK com corpo vazi
    }

    @PostMapping(value = "/reactivate/{id}")
    public ResponseEntity<Void> reactivateById(@PathVariable Long id) {
        service.reactivateById(id);
        return ResponseEntity.ok().build();  // Retorna 200 OK com corpo vazio
    }

    
}
