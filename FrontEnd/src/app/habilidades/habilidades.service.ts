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
    const authToken = localStorage.getItem('authToken'); // obtener el token del localstorage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    }); 

    return this.http.get<any>(this.apiUrl, { headers });
  }


  // Método para eliminar una habilidad
  deleteHabilidad(id: number): Observable<void> {
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  // metodo crear habilidad
  createHabilidad(habilidad: any): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.post<any>(this.apiUrl, habilidad, { headers });
  }
  
  // metodo obtener habilidad por id
  getHabilidad(id: number): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }
  
  
  // metodo actualizar
  updateHabilidad(id: number, habilidad: any): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.put<any>(`${this.apiUrl}/${id}`, habilidad, { headers });
  }  
  
}
