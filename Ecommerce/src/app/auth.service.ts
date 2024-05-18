import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private _HttpClient:HttpClient , private _Router:Router) {
    if(localStorage.getItem('userData')!=null){
      this.decodedUserData()
    }
  }

  decodedData=new BehaviorSubject(null);

  decodedUserData(){
    let encodedToken=JSON.stringify(localStorage.getItem('userData'))
    let decodedToken:any=jwtDecode(encodedToken)
    this.decodedData.next(decodedToken)
  }
  logOut(){
    localStorage.removeItem('userData')
    localStorage.removeItem('cartId')
    this.decodedData.next(null)
    this._Router.navigate(['login'])
  }
  register(userData:Object):Observable<any>
  {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',userData)
  }
  login(userLogin:object):Observable<any>
  {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin',userLogin)
  }
  forgetPass(userEmail:any):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,userEmail)
  }
  verifyResetCode(resetCode:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,resetCode)
  }
  resetEmail(newPass:object):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,newPass)
  }
}
