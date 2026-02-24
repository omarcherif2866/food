import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Specialite } from 'src/app/Models/specialite/specialite';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {
  private apiUrl = environment.apiUrl;
  constructor(private _http: HttpClient) {}

  addSpecialite(data: any): Observable<Specialite> {
    return this._http.post<Specialite>(`${this.apiUrl}/specialites/AddSpecialite`,data)
  }

  updateSpecialite(id: number, data: any){
    return this._http.put<Specialite>(`${this.apiUrl}/specialites/${id}`, data);
  }

  getSpecialiteList(){
    return this._http.get<Specialite[]>(`${this.apiUrl}/specialites/`);
  }

  deleteSpecialite(id: number) {
    return this._http.delete<Specialite>(`${this.apiUrl}/specialites/${id}`);
  }


}
