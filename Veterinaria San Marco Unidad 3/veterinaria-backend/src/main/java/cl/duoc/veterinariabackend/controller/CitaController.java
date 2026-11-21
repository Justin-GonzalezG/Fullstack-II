package cl.duoc.veterinariabackend.controller;

import cl.duoc.veterinariabackend.model.Cita;
import cl.duoc.veterinariabackend.repository.CitaRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/citas")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Citas", description = "Gestión de agendamiento de horas médicas")
public class CitaController {

    @Autowired
    private CitaRepository citaRepository;

    @Operation(summary = "Listar todas las citas")
    @GetMapping
    public List<Cita> listarCitas() {
        return citaRepository.findAll();
    }

    @Operation(summary = "Obtener una cita por ID")
    @GetMapping("/{id}")
    public ResponseEntity<Object> obtenerCitaPorId(@PathVariable("id") Long id) {
        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada con ID: " + id));
        return ResponseEntity.ok(cita);
    }

    @Operation(summary = "Guardar una nueva cita")
    @PostMapping
    public ResponseEntity<Object> guardarCita(@RequestBody Cita cita) {
        Cita nuevaCita = citaRepository.save(cita);
        return ResponseEntity.ok(nuevaCita);
    }

    @Operation(summary = "Actualizar una cita existente")
    @PutMapping("/{id}")
    public ResponseEntity<Object> actualizarCita(@PathVariable("id") Long id, @RequestBody Cita detalles) {
        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada para actualizar con ID: " + id));

        cita.setServicio(detalles.getServicio());
        cita.setMascota(detalles.getMascota());
        cita.setFecha(detalles.getFecha());
        cita.setHora(detalles.getHora());
        cita.setEstado(detalles.getEstado());

        Cita actualizada = citaRepository.save(cita);
        return ResponseEntity.ok(actualizada);
    }

    @Operation(summary = "Eliminar o cancelar una cita")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> eliminarCita(@PathVariable("id") Long id) {
        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada para eliminar con ID: " + id));

        citaRepository.delete(cita);
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
}
