package cl.duoc.veterinariabackend.repository;

import cl.duoc.veterinariabackend.model.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MascotaRepository extends JpaRepository<Mascota, Long> {
    List<Mascota> findByDuenoEmail(String email);
}
