package com.example.boomblaster.Services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.example.boomblaster.Models.crudFuegos;

public class crudFuegosDb {
    Connection _cn;

    public crudFuegosDb() {
        _cn = new Conexion().openDb();
    }

    public List<crudFuegos> obtenerFuegosArtificiales() {
        try {
            Statement stmt = _cn.createStatement();
            String query = "SELECT Cod_fuego, nombre, precio, cantidad, descripcion, tienda, TipoFuego, imagen, Magnitud "
                    + "FROM fuegos";

            List<crudFuegos> crudFuegos = new ArrayList<>();
            ResultSet result = stmt.executeQuery(query);
            while (result.next()) {
                crudFuegos crudFuego = new crudFuegos(
                        result.getInt("Cod_fuego"),
                        result.getString("nombre"),
                        result.getFloat("precio"),
                        result.getInt("cantidad"),
                        result.getString("descripcion"),
                        result.getString("tienda"),
                        result.getString("tipoFuego"),
                        result.getString("imagen"),
                        result.getString("magnitud"));

                crudFuegos.add(crudFuego);
            }

            result.close();
            stmt.close();
            return crudFuegos;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public int GuardarFuego(crudFuegos fuego) {
        int resultado = 0;
        try {
            Statement stm = _cn.createStatement();

            System.out.println("Datos recibidos para inserción:");
            System.out.println("Nombre: " + fuego.getNombre());
            System.out.println("Precio: " + fuego.getPrecio());
            System.out.println("Cantidad: " + fuego.getCantidad());
            System.out.println("Descripción: " + fuego.getDescripcion());
            System.out.println("Tienda: " + fuego.getTienda());
            System.out.println("TipoFuego: " + fuego.getTipoFuego());
            System.out.println("Imagen: " + fuego.getImagen());
            System.out.println("Magnitud: " + fuego.getMagnitud());

            String query = " INSERT INTO fuegos (nombre, precio, cantidad, descripcion, tienda, TipoFuego, imagen, Magnitud) "
                    + " VALUES ('" + fuego.getNombre() + "', '" + fuego.getPrecio() + "', '" + fuego.getCantidad()
                    + "', '" + fuego.getDescripcion() + "', '" + fuego.getTienda() + "','" + fuego.getTipoFuego()
                    + "', '" + fuego.getImagen() + "','" + fuego.getMagnitud() + "')";

            resultado = stm.executeUpdate(query);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resultado;
    }

    public int EliminarFuego(int idFuego) {
        int resultado = 0;
        try {
            Statement stm = _cn.createStatement();
            String query = "DELETE FROM fuegos WHERE Cod_fuego = " + idFuego + "";

            return stm.executeUpdate(query);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resultado;
    }

    public int ActualizarFuego(crudFuegos fuego) {
        int resultado = 0;
        try {
            Statement stm = _cn.createStatement();
            String query = "UPDATE fuegos "
                    + "SET nombre = '" + fuego.getNombre() + "', "
                    + "    precio = '" + fuego.getPrecio() + "', "
                    + "    cantidad = '" + fuego.getCantidad() + "', "
                    + "    descripcion = '" + fuego.getDescripcion() + "', "
                    + "    tienda = '" + fuego.getTienda() + "', "
                    + "    TipoFuego = '" + fuego.getTipoFuego() + "', "
                    + "    imagen = '" + fuego.getImagen() + "', "
                    + "    Magnitud = '" + fuego.getMagnitud() + "' WHERE cod_fuego = '" + fuego.getCod_fuego() + "';";

            resultado = stm.executeUpdate(query);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resultado;
    }

}
