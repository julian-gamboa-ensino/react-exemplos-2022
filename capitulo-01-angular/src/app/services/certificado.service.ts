import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, throwError } from 'rxjs';
import { Certificado } from '../models/certificado.model';

@Injectable({
  providedIn: 'root'
})

export class CertificadoService {
  private apiUrl = 'http://localhost:3000/certificados'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) { }

  getCertificados(): Observable<Certificado[]> {
    return this.http.get<Certificado[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Erro ao buscar certificados:', error);
          if (error.status === 0) { // Erro de conexão
            return throwError(() => new Error('Não foi possível conectar ao servidor. Verifique sua conexão ou se o servidor está ativo.'));
          } else { // Outros erros HTTP
            return throwError(() => new Error('Ocorreu um erro ao buscar os certificados.'));
          }
        })
      );
  }
}