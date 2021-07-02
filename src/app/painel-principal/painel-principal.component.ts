import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-painel-principal',
  templateUrl: './painel-principal.component.html',
  styleUrls: ['./painel-principal.component.css']
})
export class PainelPrincipalComponent implements OnInit {

  graficoColunas: Chart;

  constructor(private clientesService: ClientesService) { }

  ngOnInit(): void {
    this.gerarGraficoDeColunas();
  }

  gerarGraficoDeColunas(): void {

    // executando a consulta de historico de clientes na API..
    this.clientesService.getHistorico()
      .subscribe(
        (data: any[]) => {

          const array = [];
          const names = [];

          for (let i = 0; i < data.length; i++) {
            array.push([
              data[i].name, data[i].data
            ]);
            names.push([
              data[i].name
            ]);
          }

          this.graficoColunas = new Chart({
            chart: {
              type: 'column',
            },
            title: {
              text: 'Histórico de Cadastro de Clientes por data'
            },
            subtitle: {
              text: 'Resumo de cadastrados realizados'
            },
            xAxis: {
              categories: names
            },
            yAxis: {
              min: 0,
              title: {
                text: 'Total de clientes cadastrados'
              }
            },
            legend: {
              enabled: false
            },
            tooltip: {
              headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat: '<tr><td style="padding:0">Clientes cadastrados: <b>{point.y:.1f}</b></td></tr>',
              footerFormat: '</table>',
              shared: true,
              useHTML: true
            },
            credits: {
              enabled: false
            },
            series: [{
              data: array,
              type: undefined
            }]
          });

        },
        e => {
          console.log(e);
        }
      );
  }

}



