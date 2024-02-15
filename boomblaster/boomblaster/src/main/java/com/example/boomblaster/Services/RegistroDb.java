package com.example.boomblaster.Services;

import java.sql.*;
import com.example.boomblaster.Models.Usuario;

public class RegistroDb {
    Connection _cn;

    public RegistroDb() {
        _cn = new Conexion().openDb();
    }

    public int RegistrarUsuario(Usuario usuario) {
        int resultado = 0;

        try {
            Statement stm = _cn.createStatement();
            String query = "INSERT INTO Usuarios (nombre, apellido, contrasena, correo) VALUES ('"
                    + usuario.getNombre() + "', '" + usuario.getApellido() + "', '" + usuario.getContrasena() + "', '"
                    + usuario.getCorreo() + "')";

            resultado = stm.executeUpdate(query);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resultado;
    }

    public Usuario obtenerUsuario(Usuario usuario) {
        String query = "SELECT cod_usuario, nombre, contrasena, apellido, correo, codRol FROM Usuarios WHERE correo = ? AND contrasena = ?";
        try {
            PreparedStatement pstmt = _cn.prepareStatement(query);
            pstmt.setString(1, usuario.getCorreo());
            pstmt.setString(2, usuario.getContrasena());
            ResultSet result = pstmt.executeQuery();

            if (result.next()) {
                Usuario usuarioEncontrado = new Usuario();
                usuarioEncontrado.setCodUsuario(result.getInt("cod_usuario"));
                usuarioEncontrado.setNombre(result.getString("nombre"));
                usuarioEncontrado.setContrasena(result.getString("contrasena"));
                usuarioEncontrado.setApellido(result.getString("apellido"));
                usuarioEncontrado.setCorreo(result.getString("correo"));
                usuarioEncontrado.setCodRol(result.getInt("codRol"));
                return usuarioEncontrado;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    /* AGREGAR METODO PARA RESTRABLECER CONTRASEÑA ABAJO */

    public int RestaurarContrasena(Usuario usuario) {
        int resultado = 0;
        try {

            String query = "UPDATE Usuarios SET contrasena = '" + usuario.getContrasena() + "' "
                    + "WHERE correo = '" + usuario.getCorreo() + "'";

            Statement stm = _cn.createStatement();
            resultado = stm.executeUpdate(query);
            stm.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resultado;
    }

}
