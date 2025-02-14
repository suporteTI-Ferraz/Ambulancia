package com.example.ambulancia.models.entities.veiculo;
import com.example.ambulancia.models.entities.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Fornecedor extends BaseEntity {
    private String nome;
    private String cnpj;
    private String telefone;
    private String endereco;
        
    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "fornecedor", cascade = CascadeType.ALL)
    private List<Manutencao> manutencoes = new ArrayList<>(); // HISTÓRICO DE MANUTENÇÕES FEITAS POR ESSE FORNECEDOR
}
