package com.example.boomblaster.Services;

import java.sql.Statement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.example.boomblaster.Models.fuegosArtificiales;

public class fuegosArtificialesDb {
    Connection _cn;

    public fuegosArtificialesDb() {
        _cn = new Conexion().openDb();
    }

    public List<fuegosArtificiales> obtenerFuegosArtificiales() {
        try {
            Statement stmt = _cn.createStatement();
            String query = "SELECT f.Cod_fuego, f.nombre, f.precio, f.descripcion, AVG(ISNULL(c.calificacion, 0)) as mediaCalificacion, "
                    +
                    "f.TipoFuego as tipo, f.cantidad, f.tienda, l.ubicacion, f.imagen, f.Magnitud, l.telefono " +
                    "FROM fuegos f " +
                    "LEFT JOIN comentarios c ON f.Cod_fuego = c.cod_fuego " +
                    "LEFT JOIN locales l ON f.tienda = l.nombre_local " +
                    "GROUP BY f.Cod_fuego, f.nombre, f.precio, f.descripcion, f.TipoFuego, f.cantidad, f.tienda, " +
                    "l.ubicacion, f.imagen, f.Magnitud, l.telefono;";

            List<fuegosArtificiales> fuegosArt = new ArrayList<>();
            ResultSet result = stmt.executeQuery(query);
            while (result.next()) {
                fuegosArtificiales fuegoArtificial = new fuegosArtificiales(
                        result.getInt("Cod_fuego"),
                        result.getString("nombre"),
                        result.getFloat("precio"),
                        result.getString("descripcion"),
                        result.getFloat("mediaCalificacion"),
                        result.getString("tipo"),
                        result.getInt("cantidad"),
                        result.getString("tienda"),
                        result.getString("ubicacion"),
                        result.getString("imagen"),
                        result.getString("magnitud"),
                        result.getString("telefono"));

                fuegosArt.add(fuegoArtificial);
            }

            result.close();
            stmt.close();
            return fuegosArt;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
