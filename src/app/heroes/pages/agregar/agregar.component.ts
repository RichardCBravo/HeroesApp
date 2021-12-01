import { Component, OnInit } from '@angular/core';
import { Publisher, Heroe } from '../../interfaces/heroe.interfaces';
import { HeroesService } from '../../service/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width:60%;
    }
    button{
      margin-top:1rem;
    }
  `]
})
export class AgregarComponent implements OnInit {

  publishers: Publisher[] = [Publisher.DCComics, Publisher.MarvelComics] ;

  heroe: Heroe = {
    alter_ego       : '',
    characters      : '',
    first_appearance: '',
    publisher       : Publisher.DCComics,
    superhero       : ''
  }

  constructor(private heroesService:HeroesService,
              private activatedRoute:ActivatedRoute,
              private router:Router,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    if(this.router.url.includes('editar')){

      this.activatedRoute.params
        .pipe(
          switchMap(( {id} ) => this.heroesService.getHeroeId(id))
        )
        .subscribe(heroe => this.heroe=heroe)
    
    }

  }

  guardar() {
    if(this.heroe.superhero.trim().length===0){
      return;
    }
    if(this.heroe.id){

      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe(heroe=> this.mostrarSnakbar('Registro actualizado'))

    }
    else{

      this.heroesService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(['/heroes/editar',heroe.id]);
          this.mostrarSnakbar('Registro creado')
        })
    
    }
  }

  borrarHeroe(){

    const dialog = this.dialog.open( ConfirmarComponent, {
      width:'250px',
      data:this.heroe
    } )

    dialog.afterClosed().subscribe(
      (result) => {
        if(result){
          this.heroesService.borrarHeroe(this.heroe.id!)
          .subscribe(resp => {
            this.router.navigate(['/heroes']);
            this.mostrarSnakbar('Registro borrado')
          });
        }
      }
    )

  }

  mostrarSnakbar(mensaje:string){
    this._snackBar.open(mensaje,'Cerrar',{
      duration: 2500
    })
  }
}
