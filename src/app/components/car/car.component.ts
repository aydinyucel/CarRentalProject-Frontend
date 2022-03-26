import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { ListResponseModel } from 'src/app/models/ListResponseModel';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:Car[] = [];
  images:CarImage[]=[];
  dataExists:boolean=false;
  currentCar:Car;
  carFilterText ="";
 

  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute, 
    private brandService:BrandService, 
    private colorService:ColorService) { }

  ngOnInit(): void {    
  this.activatedRoute.params.subscribe(params => {
    if(params["colorName"] && params["brandName"]){
      this.getFilteredCars(params["colorName"],params["brandName"]);
    }

    else if(params["brandName"]){
      this.getCarsByBrand(params["brandName"]);
    }
    
    
    else if (params["colorName"]){
      this.getCarsByColorName(params["colorName"]);
    }
    else{
      this.getCars();
      
    }

  });
  }

  getCars(){
    this.carService.getCars().subscribe((response) =>{this.setCarsAndImages(response); this.dataExists=true;
    })
  }

  getCarsByBrand(brandName:string){
    this.carService.getCarsByBrand(brandName).subscribe((response) =>{this.setCarsAndImages(response); this.dataExists=true;})
  }

  setCurrentCar(car:Car){
    this.currentCar=car;
    
  }

  getCarsByColorName(colorName:string){
    this.carService.getCarsByColorName(colorName).subscribe((response) =>{this.setCarsAndImages(response); this.dataExists=true;})
  }

 getFilteredCars(colorName:string,brandName:string){
  
    this.carService.getFilteredCars(colorName,brandName).subscribe((response) =>{this.setCarsAndImages(response); this.dataExists=true;})
  
 }
 setCarsAndImages(response:ListResponseModel<Car>) {
   this.cars=[];
   this.images=[];
  response.data.forEach(car=>{
  this.carService.getCarImagesByCarId(car.id).subscribe(carImages=>{
  this.images.push(carImages.data[0]);
  this.cars.push(car);
  })
  this.dataExists=true;
});
}

}
