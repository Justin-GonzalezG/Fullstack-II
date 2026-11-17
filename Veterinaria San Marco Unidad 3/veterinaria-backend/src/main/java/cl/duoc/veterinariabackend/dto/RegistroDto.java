package cl.duoc.veterinariabackend.dto;

import lombok.Data;

@Data
public class RegistroDto {
    private String nombre;
    private String email;
    private String password;
}
