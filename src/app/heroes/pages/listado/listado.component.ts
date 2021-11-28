import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../service/heroes.service';
import { Heroe } from '../../interfaces/heroe.interfaces';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [`
    mat-card{
      margin-top: 15px;
    }
  `
  ]
})
export class ListadoComponent implements OnInit {

  heroes:Heroe[]=[];

  constructor( private heroesService : HeroesService ) { }

  ngOnInit(): void {

    this.heroesService.getHeroes()
    .subscribe(heroes=>this.heroes=heroes);

  }

}
