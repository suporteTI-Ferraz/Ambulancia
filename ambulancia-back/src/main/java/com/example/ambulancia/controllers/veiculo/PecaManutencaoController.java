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

import com.example.ambulancia.models.entities.veiculo.PecaManutencao;
import com.example.ambulancia.services.veiculo.PecaManutencaoService;

@RestController
@RequestMapping(value = "api")
public class PecaManutencaoController {
        
    @Autowired
    PecaManutencaoService service;

     @PostMapping(value = "/manutencao/{id}/peca")
    public ResponseEntity<List<PecaManutencao>> insertMany(@RequestBody List<PecaManutencao> pecas,  @PathVariable Long id){
        List<PecaManutencao> entity = service.insertMany(pecas, id);
        URI location = ServletUriComponentsBuilder
        .fromCurrentRequest() // URL da requisição atual (/{id})
        .build() // Constrói a URI sem adicionar o ID específico de cada manutenção
        .toUri();
        return ResponseEntity.created(location).body(entity);
    }

    @GetMapping(value = "/manutencao/peca")
    public ResponseEntity<List<PecaManutencao>> findAll(){
        List<PecaManutencao> list = service.findAll();
        return ResponseEntity.ok().body(list);
        
    }

    @GetMapping(value = "/manutencao/peca/{id}")
    public ResponseEntity<PecaManutencao> findById(@PathVariable Long id){
        PecaManutencao peca = service.findById(id);
        return ResponseEntity.ok().body(peca);
    }

    @PutMapping(value = "/manutencao/peca/{id}")
    public ResponseEntity<PecaManutencao> updateById(@PathVariable Long id, @RequestBody PecaManutencao peca){
        PecaManutencao obj = service.update(id, peca);
        
        return ResponseEntity.ok(obj);
    }

    
    @PutMapping(value = "/manutencao/{id}/peca")
    public ResponseEntity<List<PecaManutencao>> updateByIdMany(@PathVariable Long id, @RequestBody List<PecaManutencao> novasPecas){
        List<PecaManutencao> obj = service.updateMany(id, novasPecas);
        return ResponseEntity.ok(obj);
    }

    @DeleteMapping(value = "/manutencao/peca/{id}")
    public ResponseEntity<PecaManutencao> deleteById(@PathVariable Long id){
        PecaManutencao deletado = service.deleteById(id);
        return ResponseEntity.ok().body(deletado);
    }



}
