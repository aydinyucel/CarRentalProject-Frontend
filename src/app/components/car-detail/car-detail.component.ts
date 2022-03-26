import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  selectedCar:Car[]=[];
  carImages:CarImage[]=[];
  dataExists:boolean;
  carRentForm:FormGroup;
  rentDate :Date = new Date();
  rentDateString = formatDate(this.rentDate,'yyyy-MM-dd',"en_US");
  returnDate :Date;
  rentals:Rental[]=[]
  availableRentDate:Date;
  availableReturnDate:Date;
  todayString = formatDate(new Date(),'yyyy-MM-dd',"en_US");

  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,private toastr:ToastrService
    ,private formBuilder:FormBuilder, private rentalService:RentalService,private router:Router) { }

  ngOnInit(): void {
    this.carRentForm = this.formBuilder.group({
      rentDate: new FormControl(null,null),
      returnDate: new FormControl(null,null)
    });


    this.activatedRoute.params.subscribe(params =>{
      if (params["id"]){
        this.getCarById(params["id"]);
      }
    });

    
  }

  getCarById(id:number){
    this.carService.getCarById(id).subscribe((response) =>{
      this.selectedCar=response.data; 
    })
    this.carService.getCarImagesByCarId(id).subscribe((response=>{
      this.carImages=response.data
    }))
    this.dataExists=true;

this.rentalService.getRentals().subscribe((response) => {this.rentals=response.data.filter(r => r.carId == id);});

  }


  CheckRentDates() {
    this.availableRentDate=this.rentals[0].rentDate;
    this.availableReturnDate=this.rentals[0].returnDate;
    this.rentals.forEach(rental => {
      if(this.availableRentDate<rental.rentDate){
        this.availableRentDate=rental.rentDate;
        this.availableReturnDate=rental.returnDate;
      }
    });

    this.setDates();
    if(this.rentDate===null || this.returnDate===null){
      this.toastr.error("Hata","Başlangıç ve Bitiş tarihi seçin!")
    }
    else if(this.rentDate<=this.availableRentDate || this.returnDate<=this.availableReturnDate){
      this.toastr.warning("Bu tarihler arasında seçilen araba kiralık!")
    }
    else{
      this.router.navigateByUrl("payment");
    }
    }
  



  rentTheCar(){
    this.CheckRentDates();

  }

  setDates(){
    this.rentDate = this.carRentForm.value.rentDate;
    let returnDate = this.carRentForm.value.returnDate;
  }

  setRentDate(){
    this.rentDateString = this.carRentForm.value.rentDate;
  }

}
