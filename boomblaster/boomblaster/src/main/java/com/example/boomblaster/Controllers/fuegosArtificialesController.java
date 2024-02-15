package com.example.boomblaster.Controllers;

import java.util.List;

import com.example.boomblaster.Models.fuegosArtificiales;
import com.example.boomblaster.Services.fuegosArtificialesDb;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class fuegosArtificialesController {

    @GetMapping("/fuegos")
    public List<fuegosArtificiales> obtenerFuegosArtificiales() {
        return new fuegosArtificialesDb().obtenerFuegosArtificiales();
    }
}