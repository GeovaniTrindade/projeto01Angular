import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';

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

  // atributo para armazenar o filtro de pesquisa
  filtro: string;

  //atributo para armazenar os dados do cliente
  cliente = {
    idCliente: 0, nome: '', email: '', cpf: ''
  }

  // inicializando o ClientesService por meio de injeção de dependência
  constructor(private clientesService: ClientesService) { }

  // função executada sempre que o componente é renderizado
  ngOnInit(): void {
    // executar a consulta de clientes
    this.consultarClientes();
  }

  // função para executar a consulta de clientes na API
  consultarClientes(): void {

    this.clientesService.getAll()
      .subscribe( // promisse da API
        (data: any[]) => { // obtendo o retorno de sucesso da API..
          this.clientes = data;
        },
        e => { // obtendo o retorno de erro da API..
          console.log(e);
        }
      );
  }

  obterCliente(idCliente): void {

    this.clientesService.getById(idCliente)
      .subscribe(
        (data: any) => {
          this.cliente = data;
        },
        e => {
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
