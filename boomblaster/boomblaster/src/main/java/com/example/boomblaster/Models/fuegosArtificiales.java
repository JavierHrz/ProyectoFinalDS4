package com.example.boomblaster.Models;

public class fuegosArtificiales {
    private String nombre;
    private float precio;
    private String descripcion;
    private float mediaCalificacion;
    private String tipo;
    private int cantidad;
    private String tienda;
    private String direccionTienda;
    private String imagen;
    private String magnitud;
    private String telefono;
    private int cod_fuego;

    public int getCod_fuego() {
        return cod_fuego;
    }

    public void setCod_fuego(int cod_fuego) {
        this.cod_fuego = cod_fuego;
    }

    public fuegosArtificiales(
            int cod_fuego, String nombre, float precio, String descripcion, float mediaCalificacion, String tipo,
            int cantidad, String tienda, String direccionTienda, String imagen, String magnitud, String telefono) {
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.mediaCalificacion = mediaCalificacion;
        this.tipo = tipo;
        this.cantidad = cantidad;
        this.tienda = tienda;
        this.direccionTienda = direccionTienda;
        this.imagen = imagen;
        this.magnitud = magnitud;
        this.telefono = telefono;
        this.cod_fuego = cod_fuego;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getMagnitud() {
        return magnitud;
    }

    public void setMagnitud(String magnitud) {
        this.magnitud = magnitud;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public float getMediaCalificacion() {
        return mediaCalificacion;
    }

    public void setMediaCalificacion(float mediaCalificacion) {
        this.mediaCalificacion = mediaCalificacion;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public String getTienda() {
        return tienda;
    }

    public void setTienda(String tienda) {
        this.tienda = tienda;
    }

    public String getDireccionTienda() {
        return direccionTienda;
    }

    public void setDireccionTienda(String direccionTienda) {
        this.direccionTienda = direccionTienda;
    }

    public fuegosArtificiales() {
    }

}
