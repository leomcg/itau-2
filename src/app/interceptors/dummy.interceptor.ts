import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

// Just a dummy interceptor to showcase its usage: it adds a custom header to all outgoing requests

@Injectable()
export class DummyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      headers: req.headers.set('X-Dummy-Header', 'DummyHeaderValue'),
    });

    return next.handle(clonedRequest);
  }
}
