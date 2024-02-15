package com.example.boomblaster.Controllers;

import org.springframework.web.bind.annotation.*;

import com.example.boomblaster.Models.Usuario;
import com.example.boomblaster.Services.RegistroDb;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class RegistroController {
    @PostMapping("/registro")
    public int RegistrarUsuario(@RequestBody Usuario usuario) {
        return new RegistroDb().RegistrarUsuario(usuario);
    }

    @PostMapping("/iniciar-sesion")
    public Usuario iniciarSesion(@RequestBody Usuario usuario, HttpSession session) {
        RegistroDb registroDb = new RegistroDb();

        Usuario usuarioEncontrado = registroDb.obtenerUsuario(usuario);

        if (usuarioEncontrado != null) {
            session.setAttribute("usuario", usuarioEncontrado);
            return usuarioEncontrado;
        } else {
            return null;
        }
    }

    @PutMapping("/cambioContrasena")
    public int ActualizarContrasena(@RequestBody Usuario usuario) {
        return new RegistroDb().RestaurarContrasena(usuario);
    }

}
