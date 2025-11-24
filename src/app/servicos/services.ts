import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servico, ServicoCategoria } from '../models/servico';
//import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ServicosService {
  private http = inject(HttpClient);
  private baseUrl = '/api/services';


  list(params?: { categoria?: ServicoCategoria; q?: string; page?: number; size?: number }): Observable<any> {
    return this.http.get<any>(this.baseUrl, { params: params as any });
  }
  get(id: number): Observable<Servico> {
    return this.http.get<Servico>(`${this.baseUrl}/${id}`);
  }
  create(s: Servico): Observable<Servico> {
    return this.http.post<Servico>(this.baseUrl, s);
  }
  update(id: number, s: Servico): Observable<Servico> {
    return this.http.put<Servico>(`${this.baseUrl}/${id}`, s);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
