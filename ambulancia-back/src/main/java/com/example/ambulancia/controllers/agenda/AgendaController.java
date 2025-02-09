package com.example.ambulancia.controllers.agenda;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.ambulancia.models.entities.agenda.Agenda;
import com.example.ambulancia.services.agenda.AgendaService;

@RestController
@RequestMapping(value = "api/agenda")
public class AgendaController {

    @Autowired
    AgendaService service;

    @PostMapping
    public ResponseEntity<Agenda> insert(@RequestBody Agenda agenda){
        Agenda entity = service.insert(agenda);
        URI location = ServletUriComponentsBuilder
        .fromCurrentRequest() // Baseado na URL da requisição atual
        .path("/{id}") // Adiciona o ID do recurso criado ao caminho
        .buildAndExpand(entity.getId()) // Substitui o {id} pelo ID do usuário criado
        .toUri();
        return ResponseEntity.created(location).body(entity);
    }

    @GetMapping
    public ResponseEntity<List<Agenda>> findAll(){
        List<Agenda> list = service.findAll();
        return ResponseEntity.ok().body(list);
        
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Agenda> findById(@PathVariable Long id){
        Agenda agenda = service.findById(id);
        return ResponseEntity.ok().body(agenda);
    }

    @PatchMapping(value = "/{id}")
    public ResponseEntity<Agenda> updateById(@PathVariable Long id, @RequestBody Agenda agenda){
        Agenda obj = service.update(id, agenda);
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

    @PatchMapping("/finalizar/{id}")
    public ResponseEntity<Void> finalizarAgenda(@PathVariable Long id) {
        service.finalizarAgenda(id);
        return ResponseEntity.ok().build();
    }
    
}
