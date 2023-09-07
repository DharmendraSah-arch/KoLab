import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/core/base.service';
import { AuthService } from 'src/core/services/auth.service';
import { UserStoreService } from 'src/core/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
public users:any=[];
public fullName:string="";
public role!:string;

constructor(
  private base:BaseService,
  private auth:AuthService,
  private userStore: UserStoreService
  ){}
ngOnInit(){
  this.base.getUsers()
  .subscribe(res=>{
    this.users=res;
  });

  this.userStore.getFullNameFromStore()
  .subscribe(val=>{
  let fullNamefromToken= this.auth.getfullNameFromToken(); 
  this.fullName=val || fullNamefromToken;

  });

  this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
}
logout()
{
 this.auth.signOut();
}
}
