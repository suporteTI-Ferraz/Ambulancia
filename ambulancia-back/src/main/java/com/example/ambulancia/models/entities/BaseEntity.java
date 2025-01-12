package com.example.ambulancia.models.entities;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.example.ambulancia.services.authentication.audit.BaseEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
@EntityListeners({AuditingEntityListener.class, BaseEntityListener.class})
public class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate // Preenchido automaticamente quando o registro é criado
    @Column(updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate // Atualizado automaticamente quando o registro é alterado
    @Column(nullable = true)
    private LocalDateTime updatedAt;

    @Column(nullable = true)
    private LocalDateTime deletedAt;

    @CreatedBy
    @Column(updatable = false, nullable = true)
    private String createdBy;

    @LastModifiedBy
    @Column(nullable = true)
    private String updatedBy;

    @Column(nullable = true)
    private String deletedBy;

    @Column(nullable = true)
    private String sourceIp; // IP de onde a ação foi realizada


    
}
