import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import validateAllForm from 'src/core/helpers/vaidateForm';
import { AuthService } from 'src/core/services/auth.service';
import { ResetPasswordService } from 'src/core/services/reset-password.service';
import { UserStoreService } from 'src/core/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
type: string = "password";
isText: boolean = false;
eyeIcon: string = "fa-eye-slash";

public resetPasswordEmail!:string;
public isValidEmail!:boolean;
public loginForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private userStore:UserStoreService,
    private resetService:ResetPasswordService
     ){}
  ngOnInit(): void{

this.loginForm=this.fb.group({
username:['',Validators.required],
password:['',Validators.required]

})
  }
  hideShowPass()
  {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash' );
    this.isText ? (this.type = "text") : (this.type) = "password";
  }

  onSubmit(){
  if(this.loginForm.valid)
  {  console.log(this.loginForm.value);
    // Send the object to database
     this.auth.signIn(this.loginForm.value).subscribe({
     next:(res)=>{
     this.loginForm.reset();
     this.auth.storeToken(res.accessToken);
     this.auth.storeRefreshToken(res.refreshToken);
     let tokenPayload= this.auth.decodeToken();
     this.userStore.setFullNameForStore(tokenPayload.name);
     this.userStore.setRoleForStore(tokenPayload.role);
     this.toast.success({detail:"Success", summary:res.message, duration:5000});
     this.router.navigate(['/authentication/dashboard']);
     },
     error:(err)=>{
      this.toast.error({detail:"ERROR", summary:"Something when wrong!", duration: 5000});
      console.log(err);
     }
   })
  }
 else{
  console.log("Form is not valid");
  //throw the error using toaster and with required fields
  validateAllForm.validateAllFormFileds(this.loginForm);
  }
  }
  checkValidEmail(event:string){
    const value=event;
    const pattern=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.isValidEmail= pattern.test(value);
    return this.isValidEmail;
  }
  confirmTosend(){
    if(this.checkValidEmail(this.resetPasswordEmail)){
    console.log(this.resetPasswordEmail);
    //Api call first
    this.resetService.sendResetPasswordLink(this.resetPasswordEmail).subscribe({
      next:(res)=>{
     
      this.toast.success({detail:"Success", summary:'Reset Sucess!', duration:5000});
      this.resetPasswordEmail="";
      const buttonRef= document.getElementById("closeBtn");
      buttonRef?.click();
      },
      error:(err)=>{
       this.toast.error({detail:"ERROR", summary:"Something when wrong!", duration: 5000});
      }
    })
    }
  }
}
