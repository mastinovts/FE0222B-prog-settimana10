import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/interface/todo';
import * as Service from '../todo.service';
import { annotazione } from '../todo.service';

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  //richiamo della lista generica
  lista:Todo[]=[]
  //richiama della lista dei completati per controllo numerico
  listacompleta!:Todo[]
  /* variabile controllo, usata per l'inserimento dei valori, se vie é già in processo una aggiunta di una task,
   l'aggiunta di un altra viene bloccata finchè la procedura precedente non è ultimata */
  controllo=false
  //variabile usata per identificare la stringa inserita nell'input neppa page ToDo
  oggetto!:string
  //controllo dello stato di caricamento della pagina, per la stampa a video di una pagina di caricamneto
  caricamentoPage!:boolean
  //conto alla rovescia per l'apertura alla pagina
  carica!:number
  //valore aumentato con intervallo di 15ms per decrescere il valore di carica
  tempo:number=1

  constructor() {
    //raccolta della lista dalla service e successiva trasposizione nella componente ToDo
    Service.stampa().then((lista)=>{
      this.lista=lista
    })
    this.caricamento()
  }
  //funzione usata per il controllo dello stato di caricamento della page
  caricamento(){
    //si attiva lo stato di caricamento, e viene mostrato a video una pagina di caricamento
    this.caricamentoPage=true
    //si avvia il calcolo per l'apertura di pagina
    setInterval(()=>{
      this.tempo++
      this.carica=parseInt((Math.round(2 * 100) / (this.tempo*2)).toFixed(2))
    },15)
    //la pagina di caricamento viene scambiata con quella della ToDo
    setTimeout(() => {
      this.caricamentoPage=false
    }, 2000);
  }

  //funzione usata per il controllo del valore dell'input ed aggiunta del valore se accettabile alla lista
  aggiungi(){
    if(this.oggetto == null || this.oggetto.trim() ==''){
      alert('Aggiungi un task valido')
    }
    else{
      //la funzione di aggiunta vien bloccata
      this.controllo=true
      setTimeout(() => {
        //controllo degli elementi nella lista generica e modifica dell'ids nel service
        Service.control()
        //annotazione dell'oggetto
        annotazione(this.oggetto).then((oggetto:Todo[])=>{
          //la lista nella ToDo viene eguagliata alla lista generica nel service
          this.lista=oggetto
        })
        //la funzione di aggiunta viene riattivata
        this.controllo=false
        //il campo input viene azzerato
        this.oggetto=''
      }, 2000)
    };
  }
  //cambia il valore della task da non completata a completata
  completaTask(id:number){
    setTimeout(() => {
      //va ad alterarsi lo stato di completamento dell'oggetto nella lista generica nel service con id corrispettivo a quello nella ToDo
      Service.completa(id).then((completo:Todo[])=>{
        //la lista nella ToDo viene eguagliata a quella generica nel service
        this.lista=completo
      })
    }, 2000);
  }
  ngOnInit(): void {
  }
}
