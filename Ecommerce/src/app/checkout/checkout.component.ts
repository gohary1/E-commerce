import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cartId:any;
  constructor(private _CartService:CartService){
    this.cartId=localStorage.getItem('cartId');
  }

  shippingAddress:FormGroup=new FormGroup({
    details:new FormControl(null),
    phone:new FormControl(null),
    city:new FormControl(null),
  })

navigateUrl(url:string){
  window.location.href=url
}

  checkout(cartId:any,shippingAddress:FormGroup){
    this._CartService.checkOut(cartId,shippingAddress.value).subscribe({
      next:(res)=>{
        this.navigateUrl(res.session.url)
      },
      error:(err)=>{console.log(err)}
    })
  }
}
