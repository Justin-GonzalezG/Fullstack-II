package cl.duoc.veterinariabackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "mascota")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mascota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(length = 50)
    private String especie;

    @Column(length = 50)
    private String raza;

    private Integer edad;

    private Integer vacunas;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario dueno;
}
