import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private baseUrl:string="http://localhost:5200/api/Base/"
  constructor(private http:HttpClient, private rout:Router) { }

  // getInfo(): Observable<any> {

  //   return this.api.get('Base/Info', null, true, true);
  // }

  getUsers(){
    return this.http.get<any>(this.baseUrl);
   // return this.http.post<any>(`${this.baseUrl}register`,userObj);
  }
  
  
}
