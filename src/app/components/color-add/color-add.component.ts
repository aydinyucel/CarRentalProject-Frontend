import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
colorAddForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private colorService:ColorService, private tostrService:ToastrService) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName : ["",Validators.required]
    });
  }

  add(){
    if(this.colorAddForm.valid){
      let colorModel :Color = Object.assign({},this.colorAddForm.value);
      this.colorService.add(colorModel).subscribe(response=>{
        this.tostrService.success("Eklendi!",colorModel.colorName);
      }, responseError =>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.tostrService.error(responseError.error.Errors[i].ErrorMessage);
          }
        }
      })
    }else{
      this.tostrService.error("Formunuz Hatalı!")
    }
    
  }

}
