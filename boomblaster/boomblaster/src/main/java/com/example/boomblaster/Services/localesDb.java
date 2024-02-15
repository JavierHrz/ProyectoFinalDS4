package com.example.boomblaster.Services;

import java.sql.Statement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.boomblaster.Models.local;
public class localesDb {
    Connection _cn;

    public localesDb() {
        _cn = new Conexion().openDb();
    }

    public List<local> obtenerLocales() {
        try {
            Statement stmt = _cn.createStatement();
            String query = "SELECT cod_local, ubicacion, nombre_local, telefono FROM locales";

            List<local> listaLocales = new ArrayList<>();
            ResultSet result = stmt.executeQuery(query);
            while (result.next()) {
                local local = new local(
                        result.getInt("cod_local"),
                        result.getString("ubicacion"),
                        result.getString("nombre_local"),
                        result.getString("telefono"));

                listaLocales.add(local);
            }

            result.close();
            stmt.close();
            return listaLocales;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public int GuardarLocal(local local) {
        int resultado = 0;

        try {
            Statement stm = _cn.createStatement();
            String query = "INSERT INTO locales (nombre_local, ubicacion, telefono) VALUES ('"
                    + local.getNombre_local() + "', '" + local.getUbicacion() + "', '" + local.getTelefono() + "')";

            resultado = stm.executeUpdate(query);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resultado;
    }

    public int EliminarLocal(int idLocal) {
        int resultado = 0;
        try {
            Statement stmt = _cn.createStatement();
            String query = "DELETE FROM locales WHERE cod_local = " + idLocal + "";

            return stmt.executeUpdate(query);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resultado;
    }

    public int ActualizarLocal(local local) {
        int resultado = 0;

        try {
            Statement stm = _cn.createStatement();
            String query = "UPDATE locales SET nombre_local = '" + local.getNombre_local() + "', ubicacion = '"
                    + local.getUbicacion() + "', telefono = '" + local.getTelefono() + "' WHERE cod_local = '"
                    + local.getCod_local() + "'";

            resultado = stm.executeUpdate(query);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resultado;
    }

}