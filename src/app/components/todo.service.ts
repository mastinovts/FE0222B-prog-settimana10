import { Todo } from "../interface/todo"
import { TmplAstTextAttribute } from '@angular/compiler';
import { Injectable } from '@angular/core';

let lista:Todo[]=[]
//lista generica delle task
let ids:number
//valore utilizzato per identificazione dei singoli oggetti
let listacompletati:Todo[]=[]
//lista delle sole task completate

//controllo degli oggetti nella lista task generica
export async function control(){
  if(lista.length===0){
    //se la lista ha 0 oggetti, l'identificativo viene settato a zero
    ids=0
  }
  else if(lista.length>=1){
   /*  se la lista ha almeno un oggetto, viene pescato l'id dell'ultimo oggetto nella lista ed usato come riferimento
   per l'aggiunta di quello successivo, cosi da non creare id doppi */
   ids=(lista[lista.length-1].id+1)
  }
}

//funzione usata per inviare la lista generica delle task, per successiva stampa a video degli oggetti
export async function stampa() {
    return await (new Promise<Todo[]>((res)=>{
        setTimeout(()=>{
            res(lista)
        },2000)
    }))
}

//aggiunta di task alla lista generica
export async function annotazione(oggettoToDo:string){
  return await (new Promise<Todo[]>(()=>{
    //l'oggetto(task) creato viene inserito nella lista generica
    lista.push({id:ids,title:oggettoToDo,completed:false})
    return lista
  }))
}

//alterazione del valore nell'attributo completed da false a true, per i singoli oggetti nella task generica
export async function completa(index:number) {
    return await (new Promise<Todo[]>(()=>{
      //identificazione dell'indice dell'oggetto nella lista generica
      let numero =lista.findIndex(x => x.id == index)
      //successiva alterazione del valore nell'attributo
      lista[numero].completed=true
      //aggiunto alla lista dei completati
      listacompletati.push(lista[numero])
      //gli oggetti ven
      return lista
    }))
}

//funzione usata per inviare la lista delle task completate per calcolo numerico e stampa del valore nella navbar
export async function prendiCompleti() {
  return await (new Promise<Todo[]>((res)=>{
    setTimeout(()=>{
      res(listacompletati)
    },2000)
  }))
}
