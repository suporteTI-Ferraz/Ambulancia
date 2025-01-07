package com.example.ambulancia.models.entities.veiculo;
import com.example.ambulancia.models.entities.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table
public class Veiculo extends BaseEntity {
    private String numVeic;
    private String placaVeic;
    private Double kilometragem; 
}
