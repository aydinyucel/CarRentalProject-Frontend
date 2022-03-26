import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Color } from 'src/app/models/color';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
colors:Color[]=[];
dataExists:boolean=false;
currentColor:Color;
colorFilterText:string="";
  constructor(private colorService:ColorService, private carService:CarService,private router:Router) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe((response) =>{
      this.colors=response.data;
      this.dataExists=true;
    })
  }

  setCurrentColor(color:Color){
    this.currentColor=color;
    this.router.navigateByUrl("color/detail/"+color.id);
  }

  getCurrentColorClass(color:Color){
    if(color==this.currentColor){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }

}
