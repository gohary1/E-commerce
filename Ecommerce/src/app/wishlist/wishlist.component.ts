import { Component,OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  constructor(private _CartService:CartService){

  }
  wishCount:number=0;
  wishList:any;
  wishListUpdate:any;
  ngOnInit(): void {
    this._CartService.getWishList().subscribe({
      next:(res)=>{
        this.wishCount=res.count;
        this.wishList=res.data;
      },
      error:(err)=>{console.log(err)}
    })
  }
  removeWishList(id:any){
    this._CartService.removeWishList(id).subscribe({
      next:(res)=>{
        for(let i=0;i<this.wishList.length;i++){
          if(!res.data.includes(this.wishList[i].id)){
            this.wishList.splice(i,1);
          }
        }
        this._CartService.wishNumber.next(res.data.length)
      },
      error:(err)=>{console.log(err)}
    })
  }
  addToCart(id:any){
    this._CartService.addToCart(id).subscribe({
      next:(res)=>{
        this._CartService.cartNumber.next(res.numOfCartItems)
      },
      error:(err)=>{console.log(err)}
    })
  }
}
