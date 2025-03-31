package com.example.ambulancia.controllers.veiculo;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

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

import com.example.ambulancia.dto.ManutencaoDTO;
import com.example.ambulancia.dto.VeiculoDTO;
import com.example.ambulancia.models.entities.veiculo.Manutencao;
import com.example.ambulancia.models.entities.veiculo.Veiculo;
import com.example.ambulancia.services.veiculo.ManutencaoService;

@RestController
@RequestMapping(value = "api")
public class ManutencaoController {

    @Autowired
    ManutencaoService service;

    @PostMapping(value = "/veiculo/{idVeic}/fornecedor/{idForn}/manutencao")
    public ResponseEntity<ManutencaoDTO> insert(@RequestBody Manutencao obj, @PathVariable Long idVeic, @PathVariable Long idForn){
        Manutencao entity = service.insert(obj, idVeic, idForn);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .build()
                .toUri();
        return ResponseEntity.created(location).body(convertToDto(entity));
    }

    @PostMapping(value = "/veiculo/{idVeic}/fornecedor/{idForn}/manutencoes")
    public ResponseEntity<List<ManutencaoDTO>> insertMany(@RequestBody List<Manutencao> manutencoes, @PathVariable Long idVeic, @PathVariable Long idForn){
        List<Manutencao> entities = service.insertMany(manutencoes, idVeic, idForn);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .build()
                .toUri();
        List<ManutencaoDTO> dtoList = entities.stream().map(this::convertToDto).collect(Collectors.toList());
        return ResponseEntity.created(location).body(dtoList);
    }

    @GetMapping(value = "/veiculo/manutencao")
    public ResponseEntity<List<ManutencaoDTO>> findAll(){
        List<Manutencao> list = service.findAll();
        List<ManutencaoDTO> dtoList = list.stream().map(this::convertToDto).collect(Collectors.toList());
        return ResponseEntity.ok().body(dtoList);
    }

    @GetMapping(value = "/veiculo/manutencao/{id}")
    public ResponseEntity<ManutencaoDTO> findById(@PathVariable Long id){
        Manutencao manutencao = service.findById(id);
        return ResponseEntity.ok().body(convertToDto(manutencao));
    }

    @PutMapping(value = "/veiculo/{idVeic}/fornecedor/{idForn}/manutencao/{id}")
    public ResponseEntity<ManutencaoDTO> updateById(@PathVariable Long id, @RequestBody Manutencao manutencao,  
            @PathVariable Long idVeic, @PathVariable Long idForn){
        Manutencao updated = service.update(id, manutencao, idVeic, idForn);
        return ResponseEntity.ok(convertToDto(updated));
    }

    @PutMapping(value = "/veiculo/{id}/manutencao")
    public ResponseEntity<List<ManutencaoDTO>> updateByIdMany(@PathVariable Long id, @RequestBody List<Manutencao> novasManutencoes){
        List<Manutencao> updatedList = service.updateMany(id, novasManutencoes);
        List<ManutencaoDTO> dtoList = updatedList.stream().map(this::convertToDto).collect(Collectors.toList());
        return ResponseEntity.ok(dtoList);
    }

    @DeleteMapping(value = "/veiculo/manutencao/{id}")
    public ResponseEntity<ManutencaoDTO> deleteById(@PathVariable Long id){
        Manutencao deletado = service.deleteById(id);
        return ResponseEntity.ok().body(convertToDto(deletado));
    }

    // Método para converter Manutencao para ManutencaoDTO, incorporando VeiculoDTO
    private ManutencaoDTO convertToDto(Manutencao manutencao) {
        if(manutencao == null) {
            return null;
        }
        Veiculo veiculo = manutencao.getVeiculo();
        VeiculoDTO veiculoDto = null;
        if(veiculo != null) {
            veiculoDto = VeiculoDTO.builder()
                    .id(veiculo.getId())
                    .placaVeic(veiculo.getPlacaVeic())
                    .build();
        }
        return ManutencaoDTO.builder()
                .id(manutencao.getId())
                .descricao(manutencao.getDescricao())
                .dataEntradaManutencao(manutencao.getDataEntradaManutencao())
                .dataSaidaManutencao(manutencao.getDataSaidaManutencao())
                .status(manutencao.getStatus())
                .tipoManutencao(manutencao.getTipoManutencao())
                .descricaoProblema(manutencao.getDescricaoProblema())
                .servicoRealizado(manutencao.getServicoRealizado())
                .custoManutencao(manutencao.getCustoManutencao())
                .veiculo(veiculoDto)
                .build();
    }
}