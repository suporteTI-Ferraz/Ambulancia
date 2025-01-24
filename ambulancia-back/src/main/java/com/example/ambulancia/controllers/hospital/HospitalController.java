package com.example.ambulancia.controllers.hospital;

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

import com.example.ambulancia.models.entities.hospital.Hospital;
import com.example.ambulancia.services.hospital.HospitalService;

@RestController
@RequestMapping(value = "api/hospital")
public class HospitalController {
    @Autowired
    HospitalService service;

    @PostMapping
    public ResponseEntity<Hospital> insert(@RequestBody Hospital hospital){
        Hospital entity = service.insert(hospital);
        URI location = ServletUriComponentsBuilder
        .fromCurrentRequest() // Baseado na URL da requisição atual
        .path("/{id}") // Adiciona o ID do recurso criado ao caminho
        .buildAndExpand(entity.getId()) // Substitui o {id} pelo ID do usuário criado
        .toUri();
        return ResponseEntity.created(location).body(entity);
    }

    @GetMapping
    public ResponseEntity<List<Hospital>> findAll(){
        List<Hospital> list = service.findAll();
        return ResponseEntity.ok().body(list);
        
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Hospital> findById(@PathVariable Long id){
        Hospital hospital = service.findById(id);
        return ResponseEntity.ok().body(hospital);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Hospital> updateById(@PathVariable Long id, @RequestBody Hospital hospital){
        Hospital obj = service.update(id, hospital);
        return ResponseEntity.ok(obj);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id){
        service.deleteById(id);
        return ResponseEntity.ok().build();  // Retorna 200 OK com corpo vazi
    }

    @PatchMapping(value = "/reactivate/{id}")
    public ResponseEntity<Void> reactivateById(@PathVariable Long id) {
        service.reactivateById(id);
        return ResponseEntity.ok().build();  // Retorna 200 OK com corpo vazio
    }
    
}
