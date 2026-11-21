package cl.duoc.veterinariabackend.controller;

import cl.duoc.veterinariabackend.dto.LoginDto;
import cl.duoc.veterinariabackend.dto.MascotaDto;
import cl.duoc.veterinariabackend.dto.RegistroDto;
import cl.duoc.veterinariabackend.model.Mascota;
import cl.duoc.veterinariabackend.model.Usuario;
import cl.duoc.veterinariabackend.repository.MascotaRepository;
import cl.duoc.veterinariabackend.repository.UsuarioRepository;
import cl.duoc.veterinariabackend.security.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@Tag(name = "Autenticación y Usuarios", description = "Gestión de registros, login, mascotas y usuarios")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MascotaRepository mascotaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Operation(summary = "Listar todos los usuarios del sistema")
    @GetMapping("/usuarios")
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    @Operation(summary = "Registrar un nuevo usuario")
    @PostMapping("/registro")
    public ResponseEntity<Object> registrarUsuario(@RequestBody RegistroDto dto) {
        if (usuarioRepository.findByEmail(dto.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El correo ya se encuentra registrado.");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre());
        usuario.setEmail(dto.getEmail());
        usuario.setPassword(passwordEncoder.encode(dto.getPassword()));

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

    @Operation(summary = "Iniciar sesión")
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginDto dto) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(dto.getEmail());

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Correo o contraseña incorrectos.");
        }

        Usuario usuario = usuarioOpt.get();
        if (!passwordEncoder.matches(dto.getPassword(), usuario.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Correo o contraseña incorrectos.");
        }

        String token = jwtService.generarToken(usuario.getEmail(), usuario.getRol());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("nombre", usuario.getNombre());
        response.put("email", usuario.getEmail());
        response.put("rol", usuario.getRol());

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Registrar mascota para un usuario")
    @PostMapping("/registro-mascota")
    public ResponseEntity<Object> registrarMascota(@RequestBody MascotaDto dto) {
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

    @Operation(summary = "Listar mascotas de un usuario por correo")
    @GetMapping("/mascotas")
    public ResponseEntity<List<Mascota>> listarMascotasPorEmail(@RequestParam("email") String email) {
        List<Mascota> mascotas = mascotaRepository.findByDuenoEmail(email);
        return ResponseEntity.ok(mascotas);
    }

    @Operation(summary = "Eliminar un usuario por ID")
    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Object> eliminarUsuario(@PathVariable("id") Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));

        usuarioRepository.delete(usuario);
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
}
