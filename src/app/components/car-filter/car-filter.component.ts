import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {
  brands:Brand[]=[];
  colors:Color[]=[];
  currentColor:Color;
  carFilterForm: FormGroup;

  constructor(private colorService:ColorService,private brandService:BrandService,
    private formBuilder:FormBuilder,private carService:CarService, private router:Router) { }

  ngOnInit(): void {
    
    this.getBrands();
    this.getColors();
    this.carFilterForm = this.formBuilder.group({
      brand : new FormControl(null,null),
      color : new FormControl(null,null)
    });
    
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=> this.brands = response.data);
  }

  getColors(){
    this.colorService.getColors().subscribe(response=> this.colors = response.data);
  }

  filterCars(){
    let brandName = this.carFilterForm.value.brand;
    let colorName = this.carFilterForm.value.color;
    this.carFilterForm.reset();
    if(colorName==null){
      this.router.navigateByUrl("cars/brand/"+brandName)
    }
    else if(brandName==null){
      this.router.navigateByUrl("cars/color/"+colorName)
    }
    else {
      this.router.navigateByUrl("car/filtered/"+colorName+"/"+brandName)
    }
    
  }

}
