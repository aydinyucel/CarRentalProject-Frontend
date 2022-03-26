import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'carFilter'
})
export class CarFilterPipe implements PipeTransform {

  transform(value: Car[], filterCar:string): Car[] {
    filterCar=filterCar?filterCar.toLocaleLowerCase():""
    return filterCar?value.filter((c:Car)=>c.description.toLocaleLowerCase().indexOf(filterCar)!==-1):value;
  }

}
