import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/interface/todo';
import * as Service from '../todo.service'
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  lista!: Todo[];
  listacompletati!: Todo[];
  constructor() {
    //la lista nella componente navbar viene eguagliata a quella nella service
    Service.stampa().then((lista) => {
      this.lista = lista;
    });
    //la lista
    Service.prendiCompleti().then((listaTask) =>{
      this.listacompletati=listaTask
    })
  }
  ngOnInit(): void {}
}
