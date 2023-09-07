import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import validateAllForm from 'src/core/helpers/vaidateForm';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    type: string = "password";
    isText: boolean = false;
    eyeIcon: string = "fa-eye-slash";
    registerForm!:FormGroup;
    constructor(private fb:FormBuilder,private auth:AuthService, private router: Router, private toast:NgToastService){}
      ngOnInit(): void{
        this.registerForm=this.fb.group({
          firstname:['',Validators.required],
          lastname:['',Validators.required],
          email:['',Validators.required],
          username:['',Validators.required],
          password:['',Validators.required]
          })  
      }

 hideShowPass()
 {
  this.isText = !this.isText;
  this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon="fa-eye-slash";
  this.isText ? this.type = "text" : this.type = "password";
 }

 onRegister(){
  if(this.registerForm.valid)
  {
     //console.log(this.registerForm.value);
    // Send the object to database
     this.auth.signUp(this.registerForm.value)
     .subscribe({
     next:(res)=>{
     this.registerForm.reset();
     this.toast.success({detail:"Success", summary:res.message, duration:5000});
     this.router.navigate(['/authentication/login']);
     },
     error:(err)=>{
      this.toast.error({detail:"ERROR", summary:"Something went wrong!", duration:5000});
      console.log(err);
     }
   })
  }
 else{
  //throw the error using toaster and with required fields
  validateAllForm.validateAllFormFileds(this.registerForm)
  }
  
  }
 
}

