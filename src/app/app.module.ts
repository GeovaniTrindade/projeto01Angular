import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CadastroClientesComponent } from './cadastro-clientes/cadastro-clientes.component';
import { ConsultaClientesComponent } from './consulta-clientes/consulta-clientes.component';
import { PainelPrincipalComponent } from './painel-principal/painel-principal.component';

// importando as classes para uso da biblioteca de rotas do angular
// estas rotas serão utilizadas para navegação da SPA - Single Page Application
import { Routes, RouterModule } from '@angular/router';

// importando as classes para uso da biblioteca de formulários do angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// importando as classes para uso da biblioteca de acesso à APIs do angular (Http Client)
import { HttpClientModule } from '@angular/common/http';

// importando o módulo para configuração da biblioteca NgxPagination
import { NgxPaginationModule } from 'ngx-pagination';

// importando o módulo para configuração do Ng2SearchFilter
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// importando o módulo para configuração do NgxMask
import { NgxMaskModule, IConfig } from 'ngx-mask';

// importando o módulo angular-highcharts
import { ChartModule } from 'angular-highcharts';

// mapear uma rota (URL) para cada componente do projeto..
const routes: Routes = [
  { path : 'cadastro-clientes', component : CadastroClientesComponent },
  { path : 'consulta-clientes', component : ConsultaClientesComponent },
  { path : '', component : PainelPrincipalComponent }
];

// configuração para inicialização do NgxMask
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    CadastroClientesComponent,
    ConsultaClientesComponent,
    PainelPrincipalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // registrando biblioteca para chamadas de API
    FormsModule, // registrando biblioteca para formulários
    ReactiveFormsModule, // registrando biblioteca para formulários
    NgxPaginationModule, // registrando biblioteca NgxPagination
    Ng2SearchPipeModule, // registrando biblioteca Ng2SearchFilter
    NgxMaskModule.forRoot(), // registrando biblioteca NgxMask
    ChartModule, // registrando biblioteca angular highcharts
    RouterModule.forRoot(routes) // registrando a configuração de rotas!
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



