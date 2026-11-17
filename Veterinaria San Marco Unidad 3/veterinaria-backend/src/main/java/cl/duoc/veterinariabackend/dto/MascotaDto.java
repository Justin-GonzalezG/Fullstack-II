package cl.duoc.veterinariabackend.dto;

import lombok.Data;

@Data
public class MascotaDto {
    private String nombre;
    private String especie;
    private String raza;
    private Integer edad;
    private Integer vacunas;
    private String emailDueno;
}
