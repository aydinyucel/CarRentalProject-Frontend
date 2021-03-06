import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
brands:Brand[]=[];
dataExists:boolean=false;
currentBrand:Brand;
brandFilterText="";

  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
      this.getBrands();
    
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response) => {
      this.brands=response.data;
      this.dataExists=true;
      console.log(response.message);
      
    })
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand=brand;
  }

  getCurrentBrand(){
    return this.currentBrand.brandName;
  }

  getCurrentBrandClass(brand:Brand){
    if(brand==this.currentBrand){
      return "list-group-item active";
    }
    else{
      return "list-group-item";
    }
  }

}
