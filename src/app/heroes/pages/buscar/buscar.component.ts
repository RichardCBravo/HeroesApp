import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interfaces';
import { HeroesService } from '../../service/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] =[];
  heroeSelect: Heroe | undefined;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesService.getSugerencias(this.termino.trim())
    .subscribe(heroes=> this.heroes = heroes);
  }

  opcionSeleccionada(e:MatAutocompleteSelectedEvent){
    if(e.option.value===''){
      this.termino='';
      this.heroeSelect = undefined;
      return;
    }

      const heroe: Heroe = e.option.value;
      this.termino=heroe.superhero;
  
      this.heroeSelect=heroe;
  
      this.heroesService.getHeroeId(heroe.id!)
      .subscribe(heroe => this.heroeSelect = heroe)
      
  }

}
