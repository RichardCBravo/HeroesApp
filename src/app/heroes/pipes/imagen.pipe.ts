import { Pipe, PipeTransform } from "@angular/core";
import { Heroe } from '../interfaces/heroe.interfaces';



@Pipe({

    name:'imagen'

})
export class ImagesPipe implements PipeTransform{

    transform(heroe:Heroe):string{
        return `assets/heroes/${heroe.id}.jpg`
    }

}