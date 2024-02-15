package com.example.boomblaster.Models;

public class Comentarios {
    private int cod_comentario;
    private int cod_usuario;
    private String comentario;
    private String video;
    private int calificacion;
    private String nombre;
    private String apellido;
    private int cod_fuego;
    private String nombreFuego;

    public String getNombreFuego() {
        return nombreFuego;
    }

    public void setNombreFuego(String nombreFuego) {
        this.nombreFuego = nombreFuego;
    }

    public Comentarios(int cod_comentario, int cod_usuario, String comentario, String video, int calificacion,
            String nombre, String apellido, int cod_fuego, String nombreFuego) {
        this.cod_comentario = cod_comentario;
        this.cod_usuario = cod_usuario;
        this.comentario = comentario;
        this.video = video;
        this.calificacion = calificacion;
        this.nombre = nombre;
        this.apellido = apellido;
        this.cod_fuego = cod_fuego;
        this.nombreFuego = nombreFuego;
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

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public Comentarios() {
    }

    public int getCod_comentario() {
        return cod_comentario;
    }

    public void setCod_comentario(int cod_comentario) {
        this.cod_comentario = cod_comentario;
    }

    public int getCod_usuario() {
        return cod_usuario;
    }

    public void setCod_usuario(int cod_usuario) {
        this.cod_usuario = cod_usuario;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public int getCalificacion() {
        return calificacion;
    }

    public void setCalificacion(int calificacion) {
        this.calificacion = calificacion;
    }

}
