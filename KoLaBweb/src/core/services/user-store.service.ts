import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
private fullName$=new BehaviorSubject<string>("");
private roles$= new BehaviorSubject<string>("");
  constructor() { }
  public getRoleFromStore(){
    return this.roles$.asObservable();
  }
  public setRoleForStore(role:string){
    this.roles$.next(role);
  }
public getFullNameFromStore(){
  return this.fullName$.asObservable();
}
public setFullNameForStore(fullname:string){
  this.fullName$.next(fullname);
}

}
