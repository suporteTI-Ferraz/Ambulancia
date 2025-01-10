package com.example.ambulancia.controllers.motorista;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ambulancia.models.entities.motorista.Motorista;
import com.example.ambulancia.services.motorista.MotoristaService;


@RestController
@RequestMapping(value = "api/motorista")
public class MotoristaController {
    @Autowired
    MotoristaService service;

    @GetMapping
    public ResponseEntity<List<Motorista>> findAll(){
        List<Motorista> list = service.findAll();
        return ResponseEntity.ok().body(list);
        
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Motorista> findById(@PathVariable Long id){
        Motorista motorista = service.findById(id);
        return ResponseEntity.ok().body(motorista);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Motorista> updateById(@PathVariable Long id, @RequestBody Motorista motorista){
        Motorista obj = service.update(id, motorista);
        return ResponseEntity.ok(obj);
    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity<Motorista> deleteById(@PathVariable Long id){
        Motorista deletado = service.deleteById(id);
        return ResponseEntity.ok().body(deletado);
    }
    
}
