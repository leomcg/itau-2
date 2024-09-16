import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/*
 * Apenas um interceptor de exemplo, não faz nada além de logar as requisições.
 * Mas você poderia adicionar lógicas de autenticação, tratamento de erros, adicionar headers, etc.
 * para todoas as requisições e respostas HTTP.
 */
@Injectable()
export class DummyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Request intercepted:', req);

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          console.log('Response intercepted:', event);
        }
      })
    );
  }
}
