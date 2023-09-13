import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResetPassword } from '../model/reset.password.model';


@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
    private baseUrl:string="http://localhost:5200/api/Account/"
  constructor(private http:HttpClient, private rout:Router) { }

  sendResetPasswordLink(email:string){
    return this.http.post<any>(`${this.baseUrl}/send-reset-email/${email}`,{})
  }

  resetPassword(resetPasswordObj: ResetPassword){
    return this.http.post<any>(`${this.baseUrl}/reset-password/${resetPasswordObj}`,{})
  }
  
  
}
