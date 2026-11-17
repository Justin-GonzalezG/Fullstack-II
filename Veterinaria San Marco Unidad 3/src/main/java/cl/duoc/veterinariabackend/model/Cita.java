package cl.duoc.veterinariabackend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "citas")
@Data
public class Cita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String usuario;
    private String mascota;
    private String servicio;
    private String fecha;
    private String hora;
    private String estado;
}
