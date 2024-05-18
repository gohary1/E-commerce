import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  constructor(private _CartService:CartService){

  }
  allCat:any;
   ngOnInit(): void {
     this._CartService.getAllCat().subscribe({
      next:(res)=>{
        this.allCat=res.data
      },
      error:(err)=>{console.log(err)}
     })
   }

}
