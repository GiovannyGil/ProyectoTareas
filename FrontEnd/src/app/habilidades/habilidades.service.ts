import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {
  // URL de la api modulo habilidades
  private apiUrl = 'http://localhost:3000/api/habilidades'

  // injectar metodos http
  constructor(private http: HttpClient) { }

  // Metodo para obtener todas las habilidades
  getHabilidades(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { withCredentials: true });
  }


  // Método para eliminar una habilidad
  deleteHabilidad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  // metodo crear habilidad
  createHabilidad(habilidad: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, habilidad, { withCredentials: true });
  }
  
  // metodo obtener habilidad por id
  getHabilidad(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
  
  
  // metodo actualizar
  updateHabilidad(id: number, habilidad: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, habilidad, { withCredentials: true });
  }  
  
}
