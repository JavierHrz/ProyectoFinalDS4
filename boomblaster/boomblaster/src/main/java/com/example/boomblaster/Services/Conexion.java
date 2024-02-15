package com.example.boomblaster.Services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexion {
    public Connection openDb() {
        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            return DriverManager.getConnection(
                    "jdbc:sqlserver://localhost:1433;encrypt=true;trustServerCertificate=true;databaseName=BoomBlasters",
                    "sa", "12345");
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException cnfex) {
            cnfex.printStackTrace();
        }
        return null;
    }
}
