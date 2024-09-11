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

  // Get all branches
  getBranches(): Observable<BranchDetails[]> {
    return this.http.get<any>(this.apiUrl);
  }

  // Get a single branch by ID
  getBranch(id: number): Observable<BranchDetails> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Create a new branch
  createBranch(branch: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, branch);
  }

  // Update an existing branch
  updateBranch(id: number, branch: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, branch);
  }

  // Delete a branch
  deleteBranch(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
