import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import BranchDetails from '../models/branch-details.model';

@Injectable({
  providedIn: 'root',
})
export class ItauBranchesService {
  apiUrl = 'https://antlia-mockapi.azurewebsites.net/api/v1/itau_teste';

  constructor(private http: HttpClient) {}

  getBranches(): Observable<BranchDetails[]> {
    return this.http.get<any>(this.apiUrl);
  }

  getBranch(id: number): Observable<BranchDetails> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createBranch(branch: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, branch);
  }

  updateBranch(id: number, branch: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, branch);
  }

  deleteBranch(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
