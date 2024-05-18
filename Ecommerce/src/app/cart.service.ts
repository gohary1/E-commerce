import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

cartNumber= new BehaviorSubject(0)
wishNumber=new BehaviorSubject(0)
cartId:any;
  constructor(private _HttpClient:HttpClient) {
      this.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartNumber.next(res.numOfCartItems)
      },
      error:(err)=>{console.log(err)}
    })
    this.getWishList().subscribe({
      next:(res)=>{this.wishNumber.next(res.count)}
    })
  }

  header:any={
  token:localStorage.getItem('userData')
  }
  addToCart(productId:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId:productId},
    {headers:this.header})
  }
  getUserLogged():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart',{headers:this.header})
  }
  deleteItem(productId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers:this.header})
  }
  updateItem(productId:string,count:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {count:count},
    {headers:this.header})
  }
  checkOut(cartId:string,shoppingAdress:FormGroup):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
    {shoppingAdress:shoppingAdress},
    {headers:this.header})
  }
  getLoggedUserCart():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:this.header})
  }
  addWishList(id:any):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    {productId:id},
    {headers:this.header})
  }
  getWishList():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist',{headers:this.header})
  }
  removeWishList(id:any):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers:this.header})
  }
  getAllCat():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`,{headers:this.header})
  }
  getAllBrand():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands`,{headers:this.header})
  }
}
