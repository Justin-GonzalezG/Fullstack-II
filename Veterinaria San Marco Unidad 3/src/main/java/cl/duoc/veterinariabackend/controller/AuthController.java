package cl.duoc.veterinariabackend.controller;

import cl.duoc.veterinariabackend.dto.LoginDto;
import cl.duoc.veterinariabackend.dto.MascotaDto;
import cl.duoc.veterinariabackend.dto.RegistroDto;
import cl.duoc.veterinariabackend.model.Mascota;
import cl.duoc.veterinariabackend.model.Usuario;
import cl.duoc.veterinariabackend.repository.MascotaRepository;
import cl.duoc.veterinariabackend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MascotaRepository mascotaRepository;

    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@RequestBody RegistroDto dto) {
        if (usuarioRepository.findByEmail(dto.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El correo ya se encuentra registrado.");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre());
        usuario.setEmail(dto.getEmail());
        usuario.setPassword(dto.getPassword());

        if (dto.getEmail().contains(".admin@vetesm.cl")) {
            usuario.setRol("ROLE_ADMIN");
        } else if (dto.getEmail().contains(".trabajador@vetesm.cl")) {
            usuario.setRol("ROLE_TRABAJADOR");
        } else {
            usuario.setRol("ROLE_CLIENTE");
        }

        Usuario guardado = usuarioRepository.save(usuario);

        Map<String, Object> response = new HashMap<>();
        response.put("mensaje", "Usuario registrado con éxito");
        response.put("usuario", guardado);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto dto) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(dto.getEmail());

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Correo o contraseña incorrectos.");
        }

        Usuario usuario = usuarioOpt.get();
        if (!usuario.getPassword().equals(dto.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Correo o contraseña incorrectos.");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("nombre", usuario.getNombre());
        response.put("email", usuario.getEmail());
        response.put("rol", usuario.getRol());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/registro-mascota")
    public ResponseEntity<?> registrarMascota(@RequestBody MascotaDto dto) {
        Optional<Usuario> duenoOpt = usuarioRepository.findByEmail(dto.getEmailDueno());

        if (duenoOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El dueño ingresado no existe.");
        }

        Mascota mascota = new Mascota();
        mascota.setNombre(dto.getNombre());
        mascota.setEspecie(dto.getEspecie() != null ? dto.getEspecie() : "No especificada");
        mascota.setRaza(dto.getRaza());
        mascota.setEdad(dto.getEdad());
        mascota.setVacunas(dto.getVacunas());
        mascota.setDueno(duenoOpt.get());

        mascotaRepository.save(mascota);

        return ResponseEntity.status(HttpStatus.CREATED).body("Mascota registrada exitosamente.");
    }
}
