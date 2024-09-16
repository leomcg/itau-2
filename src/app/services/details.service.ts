import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  private baseUrl = 'https://viacep.com.br/ws';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  getAddressByCEP(cep: string): Observable<any> {
    const url = `${this.baseUrl}/${cep}/json/`;
    return this.http.get<any>(url);
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  successMessage(name: string, id: string, action: string) {
    this.snackBar.open(`Polo ${name}#${id} ${action} com sucesso!`, 'OK');
  }

  errorMessage() {
    this.snackBar.open(
      'Por favor preencha todos os campos obrigatórios.',
      'OK'
    );
  }
}
