package com.example.boomblaster.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.boomblaster.Models.crudFuegos;
import com.example.boomblaster.Services.crudFuegosDb;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class crudFuegosController {
    @GetMapping("/crudFuego/all")
    public List<crudFuegos> ObtenerFuegos() {
        return new crudFuegosDb().obtenerFuegosArtificiales();
    }

    @PostMapping("/crudFuego")
    public int InsertarFuego(@RequestBody crudFuegos fuego) {
        return new crudFuegosDb().GuardarFuego(fuego);
    }

    @DeleteMapping("/crudFuego/{idFuego}")
    public int BorrarFuego(@PathVariable("idFuego") int fuego) {
        return new crudFuegosDb().EliminarFuego(fuego);
    }

    @PutMapping("/crudFuego")
    public int ActualizarFuego(@RequestBody crudFuegos fuego) {
        return new crudFuegosDb().ActualizarFuego(fuego);
    }

}
