package com.example.tareasusuarios.Modulos.Auth.Repository

import com.example.tareasusuarios.Modulos.Auth.Models.UsuarioAuth
import com.example.tareasusuarios.Repository.network.RetrofitClient
import retrofit2.Response

class AuthRepository {

    suspend fun login(user: UsuarioAuth): Response<String> {
        return RetrofitClient.api.login(user)
    }
}