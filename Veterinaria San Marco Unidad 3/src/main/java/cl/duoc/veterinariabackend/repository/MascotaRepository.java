package cl.duoc.veterinariabackend.repository;

import cl.duoc.veterinariabackend.model.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MascotaRepository extends JpaRepository<Mascota, Long> {

    List<Mascota> findByDuenoId(Long usuarioId);
}
