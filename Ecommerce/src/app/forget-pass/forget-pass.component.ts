import { CSP_NONCE, Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent {

  constructor(private _AuthService:AuthService,private _Router:Router){

  }
  errorForgetEmail:boolean=false
  flag:boolean=false
  forgetmessage:any;
  resetMessage:any;
  resetErrorMessage:boolean=false
  forgetFrom:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  })
  resetFrom:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.minLength(4)])
  })

  forgetSubmit(forgetFrom:FormGroup){
    this._AuthService.forgetPass(forgetFrom.value).subscribe({
      next:(res)=>{
        this.flag=true;
        this.forgetmessage=res
        this.errorForgetEmail=false;
      },
      error:(err)=>{
        this.errorForgetEmail=true;
      }
    })
  }
  resetSubmit(resetCode:FormGroup){
    this._AuthService.verifyResetCode(resetCode.value).subscribe({
      next:(res)=>{
        this._Router.navigate(['/resetpass'])
      },
      error:(err)=>{
        this.resetErrorMessage=true
      }
    })
  }

  }

