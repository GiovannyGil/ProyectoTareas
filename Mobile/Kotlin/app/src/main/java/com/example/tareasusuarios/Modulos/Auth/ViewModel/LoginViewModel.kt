package com.example.tareasusuarios.Modulos.Auth.ViewModel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.tareasusuarios.Modulos.Auth.Models.UsuarioAuth
import com.example.tareasusuarios.Modulos.Auth.Repository.AuthRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class LoginViewModel: ViewModel() {
    private val repository = AuthRepository()

    private val _loginResult = MutableStateFlow<String?>(null)
    val loginResult: StateFlow<String?> = _loginResult

    fun login(nombreusuario: String, clave: String) {
        val user = UsuarioAuth(nombreusuario, clave)
        viewModelScope.launch {
            try {
                val response = repository.login(user)
                if (response.isSuccessful) {
                    _loginResult.value = response.body()
                } else {
                    _loginResult.value = "Error: ${response.code()}"
                }
            } catch (e: Exception) {
                _loginResult.value = "Error: ${e.message}"
            }
        }
    }
}