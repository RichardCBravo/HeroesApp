import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { HeroesService } from '../../service/heroes.service';
import { Heroe } from '../../interfaces/heroe.interfaces';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img{
      height: auto;
    }
    mat-card{
      width: 80%;
      margin: auto;
      border-radius: 5px;
    }
  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!:Heroe;

  constructor(private activateRouter:ActivatedRoute,
              private heroesService :HeroesService) { }

  ngOnInit(): void {
    this.activateRouter.params
    .pipe(
      switchMap( ({id}) => this.heroesService.getHeroeId(id) ),
      tap(console.log)
    )
    .subscribe(heroe=> this.heroe=heroe)
  }

}
