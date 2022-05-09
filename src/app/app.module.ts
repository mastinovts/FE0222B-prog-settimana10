import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CompletatiComponent } from './components/completed-todo/completed-todo.component';
import { TodoComponent } from './components/todo/todo.component';

const routes:Route[]=[
  {
    path:'',
    component:TodoComponent
  },
  {
    path:'completati',
    component:CompletatiComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    CompletatiComponent,
    NavbarComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
