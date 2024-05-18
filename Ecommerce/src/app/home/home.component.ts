import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private _ProductService:ProductsService,private _CartService:CartService){

  }

  products:any[]=[]
  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next:(response)=>{
        this.products=response.data
      }
    })
  }
  addToCart(id:string){
    this._CartService.addToCart(id).subscribe({
      next:(res)=>{
        this._CartService.cartNumber.next(res.numOfCartItems)
        $(".popUpIn").addClass("d-flex")
        setTimeout(function(){$(".popUpIn").removeClass("d-flex")},2000);
      },
      error:(err)=>{console.log(err)}
    })
  }
  addWishList(id:any){
    this._CartService.addWishList(id).subscribe({
      next:(res)=>{
        this._CartService.wishNumber.next(res.data.length)
        $(".popUpIn").addClass("d-flex")
        setTimeout(function(){$(".popUpIn").removeClass("d-flex")},2000);
      },
      error:(err)=>{console.log(err)}
    })

  }
}

