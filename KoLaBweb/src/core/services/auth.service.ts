import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenModel } from '../model/token.api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private baseUrl:string="http://localhost:5200/api/Account/"
private userPayload:any; 
constructor(private http:HttpClient, private rout:Router) { 
  this.userPayload=this.decodeToken();
}
  signUp(userObj:any)
  {
     return this.http.post<any>(`${this.baseUrl}register`,userObj);

  }
  signIn(loginObj:any)
  {
    return this.http.post<any>(`${this.baseUrl}login`,loginObj);
  }
  signOut(){
    localStorage.clear();
    this.rout.navigate(['/authentication/login']);
  }
  storeToken(tokenValue:string)
  {
   localStorage.setItem('token',tokenValue)
  }
  storeRefreshToken(tokenValue:string)
  {
   localStorage.setItem('refreshToken', tokenValue);

  }
  getToken(){
   return localStorage.getItem('token')
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken')
   }
  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }
  decodeToken(){
    const jwtHelper=new JwtHelperService();
    const token=this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
   
    return jwtHelper.decodeToken(token);
  }
  
  getfullNameFromToken(){
  if(this.userPayload)
  return this.userPayload.unique_name;
  }
  getRoleFromToken(){
  if(this.userPayload)
  return this.userPayload.role;
  }
  renewToken(tokenModel : TokenModel )
  {
   return this.http.post<any>(`${this.baseUrl}refresh`, tokenModel);
  }
}

