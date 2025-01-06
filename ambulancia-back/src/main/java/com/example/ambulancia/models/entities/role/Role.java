package com.example.ambulancia.models.entities.role;


import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import static com.example.ambulancia.models.entities.role.Permission.ADMIN_CREATE;
import static com.example.ambulancia.models.entities.role.Permission.ADMIN_READ;
import static com.example.ambulancia.models.entities.role.Permission.ADMIN_UPDATE;
import static com.example.ambulancia.models.entities.role.Permission.ADMIN_DELETE;

import static com.example.ambulancia.models.entities.role.Permission.EMPLOYEE_CREATE;
import static com.example.ambulancia.models.entities.role.Permission.EMPLOYEE_READ;
import static com.example.ambulancia.models.entities.role.Permission.EMPLOYEE_UPDATE;
import static com.example.ambulancia.models.entities.role.Permission.EMPLOYEE_DELETE;

import lombok.Getter;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
public enum Role {
    //Define o conjunto de permissões das roles ADMIN e USER_
    ADMIN(
        Set.of(
           ADMIN_CREATE,
           ADMIN_READ,
           ADMIN_UPDATE,
           ADMIN_DELETE

        )
    ),
    CLIENT(
        Set.of(
            EMPLOYEE_CREATE,
            EMPLOYEE_READ,
            EMPLOYEE_UPDATE,
            EMPLOYEE_DELETE
        )
    ),
    ;
    
    //Gera o método getter para o campo permissions
    @Getter
    private final Set<Permission> permissions; //Set é uma lista que não contém elementos duplicados de permissões de Permission.java

    //Método para determinar quais permissões cada role tem, retorna uma lista de objetos SimpleGrantedAuthority
    public List<SimpleGrantedAuthority> getAuthorities(){

        var authorities = getPermissions() //Variável que conterá todas as permissões/roles
        .stream()
        .map(permission -> new SimpleGrantedAuthority(permission.getPermission())) //Cria um SimpleGrantedAuthority para cada permission
        .collect(Collectors.toList()); //Coleta os objetos SimpleGrantedAuthority gerados pelo map() em uma lista
        

        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name())); // atribui a lista acima a variável authorities.
        return authorities;
    }
}
