package com.example.ambulancia.controllers.hospital;

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

import com.example.ambulancia.models.entities.hospital.EnderecoHosp;
import com.example.ambulancia.services.hospital.EnderecoHospService;

@RestController
@RequestMapping(value = "api")
public class EnderecoHospController {

    @Autowired
    EnderecoHospService service;


    @PostMapping(value = "/hospital/{id}/endereco")
    public ResponseEntity<List<EnderecoHosp>> insertMany(@RequestBody List<EnderecoHosp> enderecos, @PathVariable Long id){
        List<EnderecoHosp> entity = service.insertMany(enderecos, id);
        // Construir a URI base no recurso do paciente
        URI location = ServletUriComponentsBuilder
        .fromCurrentRequest() // URL da requisição atual (/{id})
        .build() // Constrói a URI sem adicionar o ID específico de cada endereço
        .toUri();
        return ResponseEntity.created(location).body(entity);
    }


    @GetMapping(value = "/hospital/endereco")
    public ResponseEntity<List<EnderecoHosp>> findAll(){
        List<EnderecoHosp> list = service.findAll();
        return ResponseEntity.ok().body(list);
        
    }

    @GetMapping(value = "/hospital/endereco/{id}")
    public ResponseEntity<EnderecoHosp> findById(@PathVariable Long id){
        EnderecoHosp enderecoHosp = service.findById(id);
        return ResponseEntity.ok().body(enderecoHosp);
    }

    @PutMapping(value = "/hospital/endereco/{id}")
    public ResponseEntity<EnderecoHosp> updateById(@PathVariable Long id, @RequestBody EnderecoHosp novosEnderecos){
        EnderecoHosp obj = service.update(id, novosEnderecos);
        return ResponseEntity.ok(obj);
    }

    @PutMapping(value = "/hospital/{id}/endereco")
    public ResponseEntity<List<EnderecoHosp>> updateByIdMany(@PathVariable Long id, @RequestBody List<EnderecoHosp> novosEnderecos){
        List<EnderecoHosp> obj = service.updateMany(id, novosEnderecos);
        return ResponseEntity.ok(obj);
    }

    @DeleteMapping(value = "/hospital/endereco/{id}")
    public ResponseEntity<EnderecoHosp> deleteById(@PathVariable Long id){
        EnderecoHosp deletado = service.deleteById(id);
        return ResponseEntity.ok().body(deletado);
    }
    
    
}
