package com.example.tareasusuarios

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.ElevatedButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight.Companion.W700
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.tareasusuarios.ui.theme.TareasUsuariosTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            TareasUsuariosTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Greeting(
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun Greeting(modifier: Modifier = Modifier) {
    Column(
        modifier = modifier
            .fillMaxSize()
    ) {
        // Parte superior - INICIAR SESIÓN
        Box(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .background(color = Color(0xFFB6B5B5)),
            contentAlignment = Alignment.Center
        ) {
            ElevatedButton(
                modifier = Modifier
                    .padding(5.dp)
                    .shadow(
                        elevation = 12.dp,
                        shape = RoundedCornerShape(16.dp),
                        ambientColor = Color.Black.copy(alpha = 0.25f),
                        spotColor = Color.Black.copy(alpha = 0.25f)
                    ),
                onClick = {  },
                enabled = true,
                shape = RoundedCornerShape(15.dp),
                colors = ButtonDefaults.elevatedButtonColors(
                    containerColor = Color(0xFFD31A5A), // Fondo del botón
                    contentColor = Color.Black,         // Color del texto o contenido
                    disabledContainerColor = Color.Gray,
                    disabledContentColor = Color.LightGray
                ),
                elevation = ButtonDefaults.elevatedButtonElevation(
                    defaultElevation = 8.dp,
                    pressedElevation = 12.dp,
                    disabledElevation = 0.dp
                ),
                contentPadding = PaddingValues( start = 20.dp, top = 12.dp, end = 20.dp, bottom = 12.dp),
                interactionSource = remember { MutableInteractionSource() },
            ) {
                Text("INICIAR SESIÓN", fontSize = 24.sp, fontWeight = W700, color = Color.Black)
            }
        }

        // Parte inferior - REGISTRARSE
        Box(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .background(color = Color(0xFFB6B5B5)),
            contentAlignment = Alignment.Center
        ) {
            ElevatedButton(
                modifier = Modifier
                    .padding(5.dp)
                    .shadow(
                        elevation = 12.dp,
                        shape = RoundedCornerShape(16.dp),
                        ambientColor = Color.Black.copy(alpha = 0.25f),
                        spotColor = Color.Black.copy(alpha = 0.25f)
                    ),
                onClick = {  },
                enabled = true,
                shape = RoundedCornerShape(15.dp),
                colors = ButtonDefaults.elevatedButtonColors(
                    containerColor = Color(0xFF1DC2D7), // Fondo del botón
                    contentColor = Color.Black,         // Color del texto o contenido
                    disabledContainerColor = Color.Gray,
                    disabledContentColor = Color.LightGray
                ),
                elevation = ButtonDefaults.elevatedButtonElevation(
                    defaultElevation = 8.dp,
                    pressedElevation = 12.dp,
                    disabledElevation = 0.dp
                ),
                contentPadding = PaddingValues( start = 20.dp, top = 12.dp, end = 20.dp, bottom = 12.dp),
                interactionSource = remember { MutableInteractionSource() },
            ) {
                Text("REGISTRARSE", fontSize = 24.sp, fontWeight = W700, color = Color.Black)
            }
        }
    }
}


