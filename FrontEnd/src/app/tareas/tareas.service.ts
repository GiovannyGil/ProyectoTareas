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
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.get<any>(this.apiURL, { headers });
  }

  // Obtener una tarea por ID
  ObtenerTareaPorId(id: number): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.get<any>(`${this.apiURL}/${id}`, { headers });
  }

  ObtenerHabilidades(): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
  
    return this.http.get<any>('http://localhost:3000/api/habilidades', { headers });
  }

  // Crear una nueva tarea
  CrearTarea(tarea: any): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.post<any>(this.apiURL, tarea, { headers });
  }

  // Actualizar una tarea
  ActualizarTarea(id: number, tarea: any): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
  
    return this.http.patch<any>(`http://localhost:3000/api/tareas/${id}`, tarea, { headers });
  }

  // Eliminar una tarea
  EliminarTarea(id: number): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.delete<any>(`${this.apiURL}/${id}`, { headers });
  }
}
