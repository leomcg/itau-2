import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import BranchDetails from '../models/branch-details.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ItauBranchesService {
  private branchCreatedSubject = new Subject<BranchDetails>();
  branchCreated$ = this.branchCreatedSubject.asObservable();

  private branchUpdatedSubject = new Subject<BranchDetails>();
  branchUpdated$ = this.branchUpdatedSubject.asObservable();

  apiUrl = 'https://antlia-mockapi.azurewebsites.net/api/v1/itau_teste';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getBranches(): Observable<BranchDetails[]> {
    return this.http.get<any>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getBranch(id: number): Observable<BranchDetails> {
    return this.http
      .get<any>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /*
   * Precisei usar esses Timeout como solução temporária porque o DetailsComponent sempre recebia os dados cedo demais e a UI não atualizava.
   * Tentei resolver com Delay (RxJS operator), changeDetectorRef, renderRows(do proprio MatTable), ReplaySubject mas nada funcionou.
   * Infelizmente não consegui resolver a tempo. =(
   */

  createBranch(branchData: BranchDetails): void {
    setTimeout(() => {
      this.branchCreatedSubject.next(branchData);
    }, 1000);
  }

  updateBranch(branchData: any): void {
    setTimeout(() => {
      this.branchUpdatedSubject.next(branchData);
    }, 1000);
  }

  deleteBranch(name: string, id: number): void {
    this.snackBar.open(`Polo ${name}#${id} excluído com sucesso!`, 'OK');
  }

  handleError(error: any) {
    console.error('Error:', error);
    return throwError(() => new Error(error.message || 'Ops. Ocorreu um erro'));
  }
}
