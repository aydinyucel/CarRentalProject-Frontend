import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorDetailComponent } from './components/color-detail/color-detail.component';
import { ColorComponent } from './components/color/color.component';
import { RentPaymentComponent } from './components/rent-payment/rent-payment.component';
import { RentalComponent } from './components/rental/rental.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {path:"",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"car/add",component:CarAddComponent},
  {path:"car/update/:id",component:CarUpdateComponent},
  {path:"color/add",component:ColorAddComponent},
  {path:"color/detail/:id",component:ColorDetailComponent},
  {path:"brand/add",component:BrandAddComponent},
  {path:"users",component:UserComponent},
  {path:"rentals",component:RentalComponent},
  {path:"cars/brand/:brandName",component:CarComponent},
  {path:"brands",component:BrandComponent},
  {path:"car/detail/:id",component:CarDetailComponent},
  {path:"car/filtered/:colorName/:brandName",component:CarComponent},
  {path:"cars/color/:colorName",component:CarComponent},
  {path:"colors",component:ColorComponent},
  {path:"payment",component:RentPaymentComponent},
  {path:"side",component:SideBarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
