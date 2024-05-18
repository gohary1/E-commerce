import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent {
  constructor(private _AuthService:AuthService ,private _Router:Router){

  }
  errorMessage:any;
  resetForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    newPassword:new FormControl(null,[Validators.required])
  })


  resetData(resetForm:FormGroup){
    this._AuthService.resetEmail(resetForm.value).subscribe({
      next:(res)=>{
        localStorage.setItem('userData',res.token)
        this._AuthService.decodedUserData()
        this._Router.navigate(['/home'])
      },
      error:(err)=>{
        this.errorMessage=err.error.message
      }
    })
  }
}
