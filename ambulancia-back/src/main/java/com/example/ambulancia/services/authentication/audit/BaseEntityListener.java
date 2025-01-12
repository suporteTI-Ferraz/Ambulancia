package com.example.ambulancia.services.authentication.audit;

import java.time.LocalDateTime;

import org.springframework.security.core.context.SecurityContextHolder;

import com.example.ambulancia.models.entities.BaseEntity;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

public class BaseEntityListener {


        @PrePersist
    public void onPrePersist(BaseEntity entity) {
        // Não precisa definir 'createdAt' manualmente, pois @CreatedDate cuida disso
        if (entity.getCreatedBy() == null) {
            entity.setCreatedBy(getCurrentAuditor());
        }
        entity.setSourceIp(RequestContextFilter.getClientIp());
        entity.setUpdatedAt(null); 
        entity.setUpdatedBy(null);
        
    }
    @PreUpdate
    public void onPreUpdate(BaseEntity entity) {
        // 'updatedAt' deve ser atualizado apenas em atualizações, não na criação
        if (entity.getDeletedAt() != null) {
            // Se a entidade for deletada, atualize apenas 'deletedBy' e 'sourceIp'
            if (entity.getDeletedBy() == null) {
                entity.setDeletedBy(getCurrentAuditor());
                entity.setSourceIp(RequestContextFilter.getClientIp());
            }
        } else {
            // Atualize 'updatedAt' apenas em atualizações (não na criação)
            if (entity.getUpdatedAt() == null) {
                entity.setUpdatedAt(LocalDateTime.now());
                entity.setUpdatedBy(getCurrentAuditor());
                entity.setSourceIp(RequestContextFilter.getClientIp());
            }
        }
    }


    private String getCurrentAuditor() {
        // Pega o usuário autenticado do contexto de segurança
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
