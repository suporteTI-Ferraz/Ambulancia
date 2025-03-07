package com.example.ambulancia.controllers.veiculo;
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

import com.example.ambulancia.models.entities.veiculo.Manutencao;
import com.example.ambulancia.services.veiculo.ManutencaoService;
@RestController
@RequestMapping(value = "api")
public class ManutencaoController {

    
    @Autowired
    ManutencaoService service;

    
    @PostMapping(value = "/veiculo/{idVeic}/fornecedor/{idForn}/manutencao")
    public ResponseEntity<Manutencao> insertMany(@RequestBody Manutencao obj,  @PathVariable Long idVeic, @PathVariable Long idForn){
        Manutencao entity = service.insert(obj, idVeic, idForn);
        URI location = ServletUriComponentsBuilder
        .fromCurrentRequest() // URL da requisição atual (/{id})
        .build() // Constrói a URI sem adicionar o ID específico de cada manutenção
        .toUri();
        return ResponseEntity.created(location).body(entity);
    }
    

    @PostMapping(value = "/veiculo/{idVeic}/fornecedor/{idForn}/manutencoes")
    public ResponseEntity<List<Manutencao>> insertMany(@RequestBody List<Manutencao> manutencoes,  
    @PathVariable Long idVeic, @PathVariable Long idForn){
        List<Manutencao> entity = service.insertMany(manutencoes, idVeic, idForn);
        URI location = ServletUriComponentsBuilder
        .fromCurrentRequest() // URL da requisição atual (/{id})
        .build() // Constrói a URI sem adicionar o ID específico de cada manutenção
        .toUri();
        return ResponseEntity.created(location).body(entity);
    }
    

    @GetMapping(value = "/veiculo/manutencao")
    public ResponseEntity<List<Manutencao>> findAll(){
        List<Manutencao> list = service.findAll();
        return ResponseEntity.ok().body(list);
        
    }

    @GetMapping(value = "/veiculo/manutencao/{id}")
    public ResponseEntity<Manutencao> findById(@PathVariable Long id){
        Manutencao manutencao = service.findById(id);
        return ResponseEntity.ok().body(manutencao);
    }

    @PutMapping(value = "/veiculo/{idVeic}/fornecedor/{idForn}/manutencao/{id}")
    public ResponseEntity<Manutencao> updateById(@PathVariable Long id, @RequestBody Manutencao manutencao,  
    @PathVariable Long idVeic, @PathVariable Long idForn){
        Manutencao obj = service.update(id, manutencao, idVeic, idForn);
        return ResponseEntity.ok(obj);
    }

    
    @PutMapping(value = "/veiculo/{id}/manutencao")
    public ResponseEntity<List<Manutencao>> updateByIdMany(@PathVariable Long id, @RequestBody List<Manutencao> novasManutencoes){
        List<Manutencao> obj = service.updateMany(id, novasManutencoes);
        return ResponseEntity.ok(obj);
    }

    @DeleteMapping(value = "veiculo/manutencao/{id}")
    public ResponseEntity<Manutencao> deleteById(@PathVariable Long id){
        Manutencao deletado = service.deleteById(id);
        return ResponseEntity.ok().body(deletado);
    }
    
    
}
