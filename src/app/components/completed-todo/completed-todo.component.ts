import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/interface/todo';
import {stampa} from '../todo.service';

@Component({
  templateUrl: './completed-todo.component.html',
  styleUrls: ['./completed-todo.component.scss']
})
export class CompletatiComponent implements OnInit {
  lista:Todo[]=[]
  caricamentoPage!:boolean
  taskcompleti!:number
  carica!:number
  tempo:number=1

  constructor() {
    stampa().then((lista)=>{
      this.lista=lista
      this.taskcompleti=this.lista.findIndex(x => x.completed == true)
    })
    this.caricamento()
  }
  caricamento(){
    this.caricamentoPage=true
    setInterval(()=>{
      this.tempo++
      this.carica=parseInt((Math.round(2 * 100) / (this.tempo*2)).toFixed(2))
    },15)
    setTimeout(() => {
      this.caricamentoPage=false
    }, 2000);
  }
  ngOnInit(): void {
  }

}
