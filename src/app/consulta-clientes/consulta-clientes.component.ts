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

  // mensagens
  mensagem_exclusao: string;
  mensagem_edicao: string;

  // atributo para armazenar os dados do cliente
  cliente = {
    idCliente : 0, nome: '', email : '', cpf : ''
  };

  // erros de validação no formulário de edição de cliente
  errors = { Nome : [] };

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

    this.limparMensagens();

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

  excluirCliente(idCliente): void {

    this.clientesService.delete(idCliente)
      .subscribe(
        (data: any) => {
          this.mensagem_exclusao = data.mensagemSucesso;
          this.consultarClientes();
        },
        e => {
          console.log(e);
        }
      );
  }

  atualizarCliente(formEdicao): void {

    this.limparMensagens();

    const request = formEdicao.form.value;

    this.clientesService.update(request)
      .subscribe(
        (data: any) => {
          this.mensagem_edicao = data.mensagemSucesso;
          this.consultarClientes();
        },
        e => {
          switch (e.status){
            case 400: // BAD REQUEST
              this.errors = e.error.errors;
              break;
            default:
              console.log(e);
          }
        }
      );
  }

  // função para limpar as mensagens
  limparMensagens(): void {
    this.mensagem_exclusao = '';
    this.mensagem_edicao = '';
    this.errors.Nome = [];
  }

  // função para realizar a paginação no
  // componente ngx-pagination
  handlePageChange(event): void {
    this.page = event;
  }
}



