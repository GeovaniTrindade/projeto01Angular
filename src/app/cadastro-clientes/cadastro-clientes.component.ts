import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './cadastro-clientes.component.html',
  styleUrls: ['./cadastro-clientes.component.css']
})
export class CadastroClientesComponent implements OnInit {

  // atributos
  mensagem_sucesso: string;
  mensagem_erro: string;

  // capturar as mensagens de erro de validação da API
  errors = {
    Cpf: [], Email: [], Nome: []
  };

  // declarando uma variavel chamada httpClient por meio de
  // injeção de dependência (variavel será inicializada automaticamente)
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  // função executada no evento (submit) do formulário
  cadastrarCliente(formCadastro): void {

    this.limparMensagens();

    // capturando os campos do formulário
    let request = formCadastro.form.value;

    // enviando uma requisição HTTP POST para uma API..
    this.httpClient.post(environment.apiUrl + '/api/clientes', request)

      .subscribe( // capturando o PROMISSE da API (resposta )
        (data: any) => { // sucesso!

          // capturar a mensagem de sucesso obtida da API..
          this.mensagem_sucesso = data.mensagemSucesso;

          // limpar os campos do formulário (reset)
          formCadastro.form.reset();
        },
        e => { // erro!

          // verificando qual o status de
          // erro foi retornado pela API..
          switch (e.status) {
            case 400: // BAD REQUEST
              this.errors = e.error.errors;
              break;

            case 403: // FORBIDDEN
              this.mensagem_erro = e.error.mensagemErro;
              break;

            default:
              this.mensagem_erro = 'Não foi possível realizar a operação.';
              break;
          }

        }

      );

  }

  // função para limpar as mensagens do formulário
  limparMensagens(): void {

    this.mensagem_sucesso = '';
    this.mensagem_erro = '';
  }

}
