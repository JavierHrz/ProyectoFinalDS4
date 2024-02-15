package com.example.boomblaster.Models;

public class crudFuegos {
    private int cod_fuego;
    private String nombre;
    private float precio;
    private int cantidad;
    private String descripcion;
    private String tienda;
    private String tipoFuego;
    private String imagen;
    private String magnitud;

    public crudFuegos() {
    }

    public crudFuegos(int cod_fuego, String nombre, float precio, int cantidad, String descripcion, String tienda,
            String tipoFuego, String imagen, String magnitud) {
        this.cod_fuego = cod_fuego;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.descripcion = descripcion;
        this.tienda = tienda;
        this.tipoFuego = tipoFuego;
        this.imagen = imagen;
        this.magnitud = magnitud;
    }

    public int getCod_fuego() {
        return cod_fuego;
    }

    public void setCod_fuego(int cod_fuego) {
        this.cod_fuego = cod_fuego;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public float getPrecio() {
        return precio;
    }

    public void setPrecio(float precio) {
        this.precio = precio;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getTienda() {
        return tienda;
    }

    public void setTienda(String tienda) {
        this.tienda = tienda;
    }

    public String getTipoFuego() {
        return tipoFuego;
    }

    public void setTipoFuego(String tipoFuego) {
        this.tipoFuego = tipoFuego;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getMagnitud() {
        return magnitud;
    }

    public void setMagnitud(String magnitud) {
        this.magnitud = magnitud;
    }

}
