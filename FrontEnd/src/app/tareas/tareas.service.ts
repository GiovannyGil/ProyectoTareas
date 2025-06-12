import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  // ruta -> url
  private apiURL = 'http://localhost:3000/api/tareas';

  constructor(private http: HttpClient) {}

  // Obtener todas las tareas
  ObtenerTareas(): Observable<any> {
    return this.http.get<any>(this.apiURL, { withCredentials: true });
  }

  // Obtener una tarea por ID
  ObtenerTareaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${id}`, { withCredentials: true });
  }

  ObtenerHabilidades(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/habilidades', { withCredentials: true });
  }

  // Crear una nueva tarea
  CrearTarea(tarea: any): Observable<any> {
    return this.http.post<any>(this.apiURL, tarea, { withCredentials: true });
  }

  // Actualizar una tarea
  ActualizarTarea(id: number, tarea: any): Observable<any> {
    return this.http.patch<any>(`http://localhost:3000/api/tareas/${id}`, tarea, { withCredentials: true });
  }

  // Eliminar una tarea
  EliminarTarea(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`, { withCredentials: true });
  }
}
