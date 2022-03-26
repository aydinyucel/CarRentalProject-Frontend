import { Pipe, PipeTransform } from '@angular/core';
import { CarImage } from '../models/carImage';

@Pipe({
  name: 'imageFilter'
})
export class ImageFilterPipe implements PipeTransform {

  transform(value: CarImage[], id: number): any {    
    return value.filter((i:CarImage)=>i.carId==id);
  }

}
