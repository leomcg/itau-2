import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  constructor(private snackBar: MatSnackBar) {}

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  successMessage(name: string, id: string, action: string) {
    this.snackBar.open(
      `Polo ${name}#${id} ${action} com sucesso! Dados no console.`,
      'OK',
      {
        duration: 4000,
      }
    );
  }

  errorMessage() {
    this.snackBar.open(
      'Por favor preencha todos os campos obrigatórios.',
      'OK',
      {
        duration: 4000,
      }
    );
  }
}
