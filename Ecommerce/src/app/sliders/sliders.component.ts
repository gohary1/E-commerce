import { Component,OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../products.service';


@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css']
})
export class SlidersComponent implements OnInit{
  constructor(private _ProductsService:ProductsService){

  }
  productsCat:any;
  ngOnInit(): void {
    this._ProductsService.getAllCat().subscribe({
      next:(res)=>{this.productsCat=res.data}
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
  }
  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    dragEndSpeed:500,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 7
    },
  },
  nav:true
}
}
