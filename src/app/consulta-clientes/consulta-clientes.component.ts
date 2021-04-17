import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-consulta-clientes',
  templateUrl: './consulta-clientes.component.html',
  styleUrls: ['./consulta-clientes.component.css']
})
export class ConsultaClientesComponent implements OnInit {

  // atributos (campos)
  clientes = []; // JSON array

  // armazenar o numero da página que está sendo
  // acessada no componente de paginação
  page = 1;

  // inicializando o HttpClient por meio de injeção de dependência
  constructor(private httpClient: HttpClient) { }

  // função executada sempre que o componente é renderizado
  ngOnInit(): void {
    // executar a consulta de clientes
    this.consultarClientes();
  }

  // função para executar a consulta de clientes na API
  consultarClientes(): void {

    this.httpClient.get(environment.apiUrl + '/api/clientes')
      .subscribe( // promisse da API
        (data: any[]) => { // obtendo o retorno de sucesso da API..
          this.clientes = data;
        },
        e => { // obtendo o retorno de erro da API..
          console.log(e);
        }
      );
  }

  // função para realizar a paginação no
  // componente ngx-pagination
  handlePageChange(event): void {
    this.page = event;
  }
}


