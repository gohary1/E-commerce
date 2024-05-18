import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLogin:boolean=false;
  cartNumber:number=0
  wishNumber:number=0
  constructor(private _AuthService:AuthService,private _CartService:CartService,private _Router:Router){
    this._CartService.cartNumber.subscribe({
      next:(res)=>{
        this.cartNumber=res
      }
    })
    this._CartService.wishNumber.subscribe({
      next:(res)=>{this.wishNumber=res}
    })
  }
  ngOnInit(): void {
    this._AuthService.decodedData.subscribe({
      next:()=>{
        if(this._AuthService.decodedData.getValue()!==null){
        this.isLogin=true
        }
        else{
          this._Router.navigate(["/login"])
        this.isLogin=false
        }
      }
    })

  }
  logOut(){
    this._AuthService.logOut()
  }


}

