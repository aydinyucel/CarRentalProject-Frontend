import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
carAddForm :FormGroup;
brands:Brand[]= [{id:0,brandName:""}];
colors:Color[]= [{id:0,colorName:""}];
  constructor(private formBuilder:FormBuilder,
    private carService:CarService,
    private tostrService:ToastrService,
    private brandService:BrandService,
    private colorService:ColorService) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId : ["",Validators.required],
      colorId : ["",Validators.required],
      modelYear : ["",[Validators.required,Validators.max(new Date().getFullYear())]],
      dailyPrice : ["",[Validators.required, Validators.min(0)]],
      description : ["",[Validators.required]]
    });
  }
  
  add(){
    console.log(this.carAddForm.value);
    
    if(this.carAddForm.valid){
      let carModel :Car = Object.assign({},this.carAddForm.value);
      this.carService.add(carModel).subscribe(response =>{
        this.tostrService.success("Eklendi!",carModel.description);
      },responseError =>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.tostrService.error("Hata",responseError.error.Errors[i].ErrorMessage);
          }
        }
      })    
    }else{
      this.tostrService.error("Formunuz Hatalı!")
    }
    
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }
}
