import { Component } from '@angular/core';
import {FormGroup ,FormControl, Validators} from '@angular/forms'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService  , private _Router:Router){

  }
  spinner:boolean=false;
  errorText:string='';
  registerForm:FormGroup=new FormGroup({
    name:new FormControl(null , [Validators.required,Validators.minLength(3)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[a-z0-9]{5,}$/)]),
    rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^[a-z0-9]{5,}$/)]),
    phone:new FormControl(null,[Validators.pattern(/^01[0125]{1}[0-9]{8}$/),Validators.required])
  })
  handleRegister(registerForm:FormGroup){
    this.spinner=true;
    this._AuthService.register(registerForm.value).subscribe({
      next:(res)=>{
        this.spinner=false;
        this._Router.navigate(['login'])
      },
      error:(err)=>{
        this.spinner=false;
        if(err.status==400){
          this.errorText=err.error.errors.msg;
        }
        else{
          this.errorText=err.error.message;
        }

      }
    })
  }
}
