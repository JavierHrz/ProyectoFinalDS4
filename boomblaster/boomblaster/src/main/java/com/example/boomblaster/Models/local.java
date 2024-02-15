package com.example.boomblaster.Models;

public class local {
      private int cod_local;
    private String ubicacion;
    private String nombre_local;
    private String telefono;

    public local(int cod_local, String ubicacion, String nombre_local, String telefono) {
        this.cod_local = cod_local;
        this.ubicacion = ubicacion;
        this.nombre_local = nombre_local;
        this.telefono = telefono;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public int getCod_local() {
        return cod_local;
    }

    public void setCod_local(int cod_local) {
        this.cod_local = cod_local;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public String getNombre_local() {
        return nombre_local;
    }

    public void setNombre_local(String nombre_local) {
        this.nombre_local = nombre_local;
    }
}
