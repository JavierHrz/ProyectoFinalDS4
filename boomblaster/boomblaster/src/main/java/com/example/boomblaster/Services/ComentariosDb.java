package com.example.boomblaster.Services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.example.boomblaster.Models.Comentarios;

public class ComentariosDb {
    Connection _cn;

    public ComentariosDb() {
        _cn = new Conexion().openDb();
    }

    public List<Comentarios> obtenerTodosComentarios() {
        try {
            Statement stm = _cn.createStatement();
            String query = "SELECT c.cod_comentario, c.cod_usuario, c.comentario, c.video, c.calificacion, u.nombre, u.apellido, c.cod_fuego, f.nombre AS nombreFuego "
                    + "FROM comentarios c " +
                    "INNER JOIN Usuarios u ON c.cod_usuario = u.cod_usuario " +
                    "INNER JOIN fuegos f ON c.cod_fuego = f.Cod_fuego ";

            List<Comentarios> Comentarios = new ArrayList<>();
            ResultSet result = stm.executeQuery(query);
            while (result.next()) {
                Comentarios comentario = new Comentarios(
                        result.getInt("cod_comentario"),
                        result.getInt("cod_usuario"),
                        result.getString("comentario"),
                        result.getString("video"),
                        result.getInt("calificacion"),
                        result.getString("nombre"),
                        result.getString("apellido"),
                        result.getInt("cod_fuego"),
                        result.getString("nombreFuego"));

                Comentarios.add(comentario);
            }
            result.close();
            stm.close();
            return Comentarios;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Comentarios> obtenerComentariosFuego(int cod_fuego) {

        String query = "SELECT c.cod_comentario, c.cod_usuario, c.comentario, c.video, c.calificacion, u.nombre, u.apellido, c.cod_fuego "
                +
                "FROM comentarios c " +
                "INNER JOIN Usuarios u ON c.cod_usuario = u.cod_usuario " +
                "WHERE c.cod_fuego = ?";
        List<Comentarios> Comentarios = new ArrayList<>();
        try {
            PreparedStatement pstm = _cn.prepareStatement(query);
            pstm.setInt(1, cod_fuego);

            ResultSet result = pstm.executeQuery();
            while (result.next()) {
                Comentarios infoComentario = new Comentarios();
                infoComentario.setCod_comentario(result.getInt("cod_comentario"));
                infoComentario.setCod_usuario(result.getInt("cod_usuario"));
                infoComentario.setComentario(result.getString("comentario"));
                infoComentario.setVideo(result.getString("video"));
                infoComentario.setCalificacion(result.getInt("calificacion"));
                infoComentario.setNombre(result.getString("nombre"));
                infoComentario.setApellido(result.getString("apellido"));
                infoComentario.setCod_fuego(result.getInt("cod_fuego"));
                Comentarios.add(infoComentario);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Comentarios;
    }

    public int AgregarComentario(Comentarios comentario) {
        int resultado = 0;
        try {
            Statement stm = _cn.createStatement();

            String query = "INSERT INTO comentarios (cod_usuario, comentario, video, calificacion, cod_fuego) " +
                    "VALUES ('" + comentario.getCod_usuario() + "', '" + comentario.getComentario() + "', '"
                    + comentario.getVideo() + "', '" + comentario.getCalificacion() + "', '" + comentario.getCod_fuego()
                    + "');";

            resultado = stm.executeUpdate(query);
            stm.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resultado;
    }

    public int EliminarComentario(int cod_comentario) {
        int resultado = 0;
        try {
            Statement stmt = _cn.createStatement();
            String query = "DELETE FROM comentarios WHERE cod_comentario = " + cod_comentario + "";

            return stmt.executeUpdate(query);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resultado;
    }
}
