import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageResponse, Servico, ServicoCategoria } from '../models/servico';

@Injectable({ providedIn: 'root' })
export class ServicosService {

  // usando CORS com @CrossOrigin no back:
  private readonly baseUrl = 'http://localhost:8080/api/services';


  constructor(private http: HttpClient) {}

  list(params?: {
    categoria?: ServicoCategoria;
    q?: string;
    page?: number;
    size?: number;
  }): Observable<PageResponse<Servico>> {
    let httpParams = new HttpParams();

    if (params?.categoria) {
      httpParams = httpParams.set('categoria', params.categoria);
    }
    if (params?.q) {
      httpParams = httpParams.set('q', params.q);
    }
    if (params?.page != null) {
      httpParams = httpParams.set('page', params.page);
    }
    if (params?.size != null) {
      httpParams = httpParams.set('size', params.size);
    }

    // backend retorna Page<ServicoResponse>
    return this.http.get<any>(this.baseUrl, { params: httpParams });
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


  // {
  //         id: 1,
  //         nome: 'Escola Inovação',
  //         telefone: '519991831001',
  //         categoria: 'EDUCACAO',
  //         descricao: 'Cursos profissionalizantes. Aulas Presenciais e EAD.'
  //       },
  //       {
  //         id: 2,
  //         nome: 'MR Soluções Elétricas',
  //         telefone: '51992325581',
  //         categoria: 'OUTROS_SERVICOS',
  //         descricao: 'Soluções Elétricas.'
  //       }
  //     ];