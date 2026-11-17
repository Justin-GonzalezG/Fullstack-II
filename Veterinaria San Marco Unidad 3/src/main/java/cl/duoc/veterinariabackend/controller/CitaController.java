package cl.duoc.veterinariabackend.controller;

import cl.duoc.veterinariabackend.model.Cita;
import cl.duoc.veterinariabackend.repository.CitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/citas")
@CrossOrigin(origins = "*")
public class CitaController {

    @Autowired
    private CitaRepository citaRepository;

    @GetMapping
    public List<Cita> listarCitas() {
        return citaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Cita> guardarCita(@RequestBody Cita cita) {
        Cita nuevaCita = citaRepository.save(cita);
        return ResponseEntity.ok(nuevaCita);
    }
}
