package com.example.boomblaster.Controllers;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.example.boomblaster.Models.local;
import com.example.boomblaster.Services.*;;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class localesController {
    @GetMapping("/local/all")
    public List<local> obtenerLocales() {
        return new localesDb().obtenerLocales();
    }

    @PostMapping("/local")
    public int InsertarLocal(@RequestBody local local) {
        return new localesDb().GuardarLocal(local);
    }

    @DeleteMapping("/local/{idLocal}")
    public int BorrarLocal(@PathVariable("idLocal") int idLocal) {
        return new localesDb().EliminarLocal(idLocal);
    }

    @PutMapping("/local")
    public int ActualizarLocal(@RequestBody local local) {
        return new localesDb().ActualizarLocal(local);
    }
}
