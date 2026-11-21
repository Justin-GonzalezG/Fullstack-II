package cl.duoc.veterinariabackend.controller;

import cl.duoc.veterinariabackend.model.Categoria;
import cl.duoc.veterinariabackend.model.Producto;
import cl.duoc.veterinariabackend.repository.CategoriaRepository;
import cl.duoc.veterinariabackend.repository.ProductoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Productos", description = "Gestión del catálogo de productos y tienda")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    private Categoria resolverCategoria(Categoria categoriaRecibida) {
        if (categoriaRecibida != null && categoriaRecibida.getId() != null) {
            return categoriaRepository.findById(categoriaRecibida.getId())
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada con ID: " + categoriaRecibida.getId()));
        }

        String nombreCat = (categoriaRecibida != null && categoriaRecibida.getNombre() != null && !categoriaRecibida.getNombre().isBlank())
                ? categoriaRecibida.getNombre().trim()
                : "General";

        return categoriaRepository.findByNombreIgnoreCase(nombreCat)
                .orElseGet(() -> {
                    Categoria nueva = new Categoria();
                    nueva.setNombre(nombreCat);
                    return categoriaRepository.save(nueva);
                });
    }

    @Operation(summary = "Listar todos los productos")
    @GetMapping
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    @Operation(summary = "Obtener un producto por ID")
    @GetMapping("/{id}")
    public ResponseEntity<Object> obtenerProductoPorId(@PathVariable Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + id));
        return ResponseEntity.ok(producto);
    }

    @Operation(summary = "Guardar un nuevo producto")
    @PostMapping
    public ResponseEntity<Object> guardarProducto(@RequestBody Producto producto) {
        if (producto.getStock() == null) {
            producto.setStock(1);
        }
        producto.setCategoria(resolverCategoria(producto.getCategoria()));
        Producto nuevoProducto = productoRepository.save(producto);
        return ResponseEntity.ok(nuevoProducto);
    }

    @Operation(summary = "Actualizar un producto existente")
    @PutMapping("/{id}")
    public ResponseEntity<Object> actualizarProducto(@PathVariable Long id, @RequestBody Producto detalles) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado para actualizar con ID: " + id));

        producto.setNombre(detalles.getNombre());
        producto.setPrecio(detalles.getPrecio());
        if (detalles.getStock() != null) {
            producto.setStock(detalles.getStock());
        }
        if (detalles.getCategoria() != null) {
            producto.setCategoria(resolverCategoria(detalles.getCategoria()));
        }

        Producto actualizado = productoRepository.save(producto);
        return ResponseEntity.ok(actualizado);
    }

    @Operation(summary = "Eliminar un producto")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> eliminarProducto(@PathVariable Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado para eliminar con ID: " + id));

        productoRepository.delete(producto);
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
}
