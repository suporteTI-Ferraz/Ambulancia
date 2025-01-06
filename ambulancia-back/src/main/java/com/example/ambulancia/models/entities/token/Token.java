package com.example.ambulancia.models.entities.token;

import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Token {
    public String token;

    @Enumerated
    public TokenType tokenType = TokenType.BEARER;
    
}