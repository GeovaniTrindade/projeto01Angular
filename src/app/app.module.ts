import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CadastroClientesComponent } from './cadastro-clientes/cadastro-clientes.component';
import { ConsultaClientesComponent } from './consulta-clientes/consulta-clientes.component';

// importando a biblioteca de rotas do angular..
import { Routes, RouterModule } from '@angular/router';

// importando as classes para uso da biblioteca de formulários do angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// importando a classe que realizar a chamada dos serviços da API
import { HttpClientModule } from '@angular/common/http';

// importando o componente de paginação
import { NgxPaginationModule } from 'ngx-pagination';

// mapeamento das rotas para acesso aos componentes
const routes: Routes = [
  { path: 'cadastro-clientes', component: CadastroClientesComponent },
  { path: 'consulta-clientes', component: ConsultaClientesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CadastroClientesComponent,
    ConsultaClientesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // registrando biblioteca para formulários
    ReactiveFormsModule, // registrando biblioteca para formulários
    HttpClientModule, // registrando
    NgxPaginationModule, // registrando
    // registrando o mapeamento de rotas criado no projeto
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



