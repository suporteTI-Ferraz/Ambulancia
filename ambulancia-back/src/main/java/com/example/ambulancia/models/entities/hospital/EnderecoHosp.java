package com.example.ambulancia.models.entities.hospital;

import com.example.ambulancia.models.entities.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "EnderecoHospital")
public class EnderecoHosp extends BaseEntity{
    private String ruaHosp;
    private String numeroHosp;
    private String bairroHosp;
    private String cidadeHosp;
    @Builder.Default
    private String estadoHosp = "SP";;
    private String cepHosp;
    
    @ManyToOne
    @JoinColumn(name = "hospital_id", referencedColumnName = "id", nullable = false)
    private Hospital hospital;
}
