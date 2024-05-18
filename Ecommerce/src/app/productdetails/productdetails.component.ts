import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute , private _ProductsService:ProductsService, private _CartService:CartService){
  }


  productId:any;
  productdetails:any;
  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe((res)=>{
      this.productId=res.get('id')
    })
    this._ProductsService.getSpecificProduct(this.productId).subscribe({
      next:(res)=>{
        this.productdetails=res.data
      },
      error:(err)=>{console.log(err)}
    })

}
    addToCart(id:string){
      this._CartService.addToCart(id).subscribe({
        next:(res)=>{
          this._CartService.cartNumber.next(res.numOfCartItems)
        },
        error:(err)=>{console.log(err)}
      })
    }
customOptions: OwlOptions = {
  loop: false,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots: true,
  dotsSpeed: 1000,
  dragEndSpeed:1000,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
  },
}
}

