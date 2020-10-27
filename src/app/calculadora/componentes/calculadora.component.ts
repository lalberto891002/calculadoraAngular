import { Component, OnInit } from '@angular/core';
import {CalculadoraService} from '../services';


@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

	private numero1:string;
	private numero2:string;
	private resultado:number;
	private operacao:string;

	constructor(private calculadoraService:CalculadoraService) { 
  		this.calculadoraService = calculadoraService;
  	}

  ngOnInit(): void {
  	this.limpar();
  }

  /**Inicializa tudos os valores
  **
  **@return void
  **/
  limpar():void{
  	this.numero1 = "0";
  	this.numero2 = null;
  	this.resultado = null;
  	this.operacao = null;
  }
 /**Adiciona o numero seleccionado para calculo posteriormente
  **@param string numero
  **@return void
  **/
  adicionarNumero(numero:string):void{
  	if(this.operacao == null){
  		this.numero1 = this.concatenarNumero(this.numero1,numero);
  	}
  	else{
  		this.numero2 = this.concatenarNumero(this.numero2,numero);
  	}
  }
 /**retorna nuero contatenado
  **@param string numActual
  **@param string numConcat
  **@return void
  **/
  concatenarNumero(numActual:string,numConcat:string){
  	//se e 0 o actual reiniciar valor
  	if(numActual === '0' || numActual === null){
  		numActual = '';
  	}

  	//se vem . de primeor coloca 0 antes do .
  	if(numActual === '' && numConcat === '.'){
  		return '0.';
  	} 
  	//caso seja . e ja tenha . retorna
  	if(numActual.indexOf('.')>-1 && numConcat === '.'){
  		return numActual;
  	}
  	return numActual + numConcat; 
  }

  /**Metodo que define a operacao
  **@param string operacao
  **@return void
  **/

  definirOperacao(operacao:string):void{
  	if(this.operacao === null){
  		this.operacao = operacao;
  	}

  	/*se o numero2 ja estiver definido calcula*/
  	if(this.numero2 !== null){
  		this.resultado = this.calculadoraService.calcular(
  		parseFloat(this.numero1),
  		parseFloat(this.numero2),
  		this.operacao);
  		this.operacao = operacao;
  		this.numero1 = this.resultado.toString();
  		this.numero2 = null;
  		this.resultado = null;
  	}
  	
  }

  /**efetua o metodo de calcular
  * @return void
  **/
  calcular():void{
  	if(this.numero2 === null){
  		return;
  	}
  	this.resultado = this.calculadoraService.calcular(
  		parseFloat(this.numero1),
  		parseFloat(this.numero2),
  		this.operacao);
  }
  /**Display resultado na tela da calculadora
  * @return string
  **/
  get display():string{
  	if(this.resultado !== null){
  		return this.resultado.toString();
  	}
  	if(this.numero2 !== null){
  		return this.numero2;
  	}
  	return this.numero1;
  }

}
