import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  constructor(private _CartService:CartService){

  }
  cartItems:any=null;
  cartItemsNum:any=null;
  totalPrice:any=null;
  flag:boolean=false;
  ngOnInit(): void {
    this._CartService.getUserLogged().subscribe({
      next:(res)=>{
        this.cartItems=res.data.products;
        this.cartItemsNum=res.numOfCartItems;
        this.totalPrice=res.data.totalCartPrice
        localStorage.setItem('cartId',res.data._id)
      },
      error:(err)=>{console.log(err)}
    })
  }
  deleteItem(productId:string){
    this._CartService.deleteItem(productId).subscribe({
      next:(res)=>{
        this.cartItems=res.data.products;
        this.cartItemsNum=res.numOfCartItems;
        this.totalPrice=res.data.totalCartPrice
        this._CartService.cartNumber.next(res.numOfCartItems)
      },
      error:(err)=>{console.log(err)}
    })
  }
  updateItem(productId:string,count:number){
    this.flag=true;
    this._CartService.updateItem(productId,count).subscribe({
      next:(res)=>{
        this.flag=false;
        this.cartItems=res.data.products;
        this.cartItemsNum=res.numOfCartItems;
        this.totalPrice=res.data.totalCartPrice;
      },
      error:(err)=>{console.log(err)
      this.flag=false;
      }
    })
  }
}
