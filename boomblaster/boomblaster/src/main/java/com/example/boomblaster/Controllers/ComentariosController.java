package com.example.boomblaster.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.boomblaster.Models.Comentarios;
import com.example.boomblaster.Services.ComentariosDb;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class ComentariosController {

    @GetMapping("/comentarios/all")
    public List<Comentarios> obtenerComentarios() {
        return new ComentariosDb().obtenerTodosComentarios();
    }

    @PostMapping("/comentarios")
    public int InsertarComentario(@RequestBody Comentarios comentario) {
        return new ComentariosDb().AgregarComentario(comentario);
    }

    @DeleteMapping("/comentarios/{cod_comentario}")
    public int EliminarComentario(@PathVariable("cod_comentario") int cod_comentario) {
        return new ComentariosDb().EliminarComentario(cod_comentario);
    }

    @GetMapping("/comentarios/info/{cod_fuego}")
    public List<Comentarios> obtenerComentariosFuego(@PathVariable int cod_fuego, HttpSession session) {
        return new ComentariosDb().obtenerComentariosFuego(cod_fuego);
    }

}
