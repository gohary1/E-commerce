import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService,private _Router:Router){

  }

  loginError:string='';
  spinner:boolean=false;
  loginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[a-z0-9]{5,}$/)])
  })
  handleLogin(loginData:FormGroup){
    this.spinner=true
   this._AuthService.login(loginData.value).subscribe({
    next:(res)=>{
      this.spinner=false;
      localStorage.setItem('userData',res.token)
      this._AuthService.decodedUserData()
      this._Router.navigate(['home'])
    },
    error:(err)=>{
      this.spinner=false;
      if(err.status==400){
        this.loginError=err.error.errors.msg
      }
      else{
        this.loginError=err.error.message
      }
    }
   })
  }
}
