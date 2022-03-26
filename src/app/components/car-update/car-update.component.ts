import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm:FormGroup;
  selectedCar:Car;
  brands:Brand[] = [{id:0,brandName:""}];
  colors:Color[] =[{id:0,colorName:""}];
  constructor(private carService:CarService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private colorService:ColorService,
    private brandService:BrandService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if(params["id"]){
        this.getCar(params["id"]);
      }
    });
    this.createCarUpdateForm();
    this.getColors();
    this.getBrands();
  }

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      brandId : ["",Validators.required],
      colorId : ["",Validators.required],
      modelYear : ["",Validators.required],
      dailyPrice : ["",Validators.required],
      description : ["",Validators.required]
    });
  }

  getCar(id:number){
    this.carService.getCarById(id).subscribe(response=>{
      this.selectedCar=response.data[0];
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    });
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    });
  }

  update(){
    if(this.carUpdateForm.valid){
      let updatedCar:Car = Object.assign({},this.carUpdateForm.value);
    updatedCar.id=this.selectedCar.id;
    this.carService.update(updatedCar).subscribe(response=>{
      this.toastrService.success("Güncellendi!");
    }, responseError=>{
      if(responseError.error.Errors.length>0){
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage);
        }
      }
    })
    }else{
      this.toastrService.error("Form Hatalı!")
    }
    
  }

}
