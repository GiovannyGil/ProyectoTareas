package com.example.tareasusuarios.Modulos.Usuarios.Models

data class Usuarios(
    val nombres: String,
    val apellidos: String,
    val nombreusuario: String,
    val edad: Int,
    val correo: String,
    val clave: String,
    val estado: Int
)
