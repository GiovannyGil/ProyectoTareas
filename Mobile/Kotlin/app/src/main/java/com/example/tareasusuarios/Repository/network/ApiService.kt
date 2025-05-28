package com.example.tareasusuarios.Repository.network

import com.example.tareasusuarios.Modulos.Auth.Models.UsuarioAuth
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

interface ApiService {

    @POST("auth/login")
    suspend fun login(@Body user: UsuarioAuth): Response<String>

    // Ejemplo para listar usuarios
    @GET("usuarios")
    suspend fun getUsuarios(): Response<List<Any>> // Reemplaza `Any` por tu modelo real
}