import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-detail',
  templateUrl: './color-detail.component.html',
  styleUrls: ['./color-detail.component.css']
})
export class ColorDetailComponent implements OnInit {
colors:Color[]=[{id:0,colorName:""}];
colorUpdateForm:FormGroup;
  constructor(private colorService:ColorService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createColorUpdateForm();
    this.getColors();
  }

  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorId : ["",Validators.required],
      updatedColor : ["",Validators.required]
    });
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }

  update(){
    if(this.colorUpdateForm.valid){
      let updatedColor:Color ={id:this.colorUpdateForm.value.colorId, colorName:this.colorUpdateForm.value.updatedColor};
      this.colorService.update(updatedColor).subscribe(response=>{
      this.toastrService.success("Güncellendi!")
    }, responseError=>{
      if(responseError.error.Errors.length>0){
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors.ErrorMessage[i]);
        }
      }
    });
    }else{
      this.toastrService.error("Formunuz Hatalı!")
    }
    
  }
}

