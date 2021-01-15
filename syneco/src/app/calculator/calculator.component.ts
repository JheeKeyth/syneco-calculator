import { Component } from "@angular/core";
import { HistoricService } from "../shared/service/historic.service";

@Component({
  selector: 'ng-calculator',
  templateUrl: 'calculator.component.html',
  styleUrls: ['calculator.component.css'],
})

export class CalculatorComponent {

  subText = '';
  mainText = '0';
  aux = '';
  operand1: number = 0;
  operand2: number = 0;
  operator = '';
  calculationString = '';
  answered = false;
  operatorSet = false;
  dotSet = false;

  constructor(private historicService: HistoricService){ }
  
  pressHistoric(){
    this.historicService.getHistoric();
    let tableCalc = document.getElementById("tableCalc");
    let historic = document.getElementById("ng-historic");
    if(tableCalc.style.display === "none"){
      tableCalc.style.display = "unset";
      historic.style.display = "none";
    }else{
      tableCalc.style.display = "none";
      historic.style.display = "unset";
    }
  }
    
  pressKey(key: string) {
    let lastKey = this.mainText[this.mainText.length - 1];
      //treatments
      if(lastKey === '0' && (this.mainText.length < 2)){

        //do not accept two or more zeros alone
        if(key.match('0'))
          return;
        
        //clears the initial zero of the string if it is a number greater than zero
        if(!isNaN(parseFloat(key))){
          this.mainText = '';
        }
          
      }
      //Cannot accept more than one comma per number
      if((lastKey === ',') && (key.match(',')) && isNaN(parseFloat(key))){
        this.dotSet = true;
        return;
      }
      
      if(key === ','){
        if(!this.dotSet)
          this.dotSet = true;
        else         
          return;
      }
        
      //is operator?
      if (key === '/' || key === 'x' || key === '-' || key === '+') {
        lastKey = this.mainText[this.mainText.length - 1];
        this.dotSet = false;

        // if you have two sequential operators, stop execution.
        if (lastKey === '/' || lastKey === 'x' || lastKey === '-' || lastKey === '+')  {
          this.operatorSet = true;
        }

        // stop execution, if the previous conditions are true. && this.answered === false
        if (((this.operatorSet) || (this.mainText === ''))) {
          return;
        }
        
        this.aux = this.mainText.replace(/\,/g,'.');
        this.operand1 = parseFloat(this.aux);
        this.operator = key;
        this.operatorSet = true;
      }

      //character limit
      if (this.mainText.length === 10) {
        return;
      }

      this.mainText += key;
      return;
  }
    
  allClear() {
    this.mainText = '0';
    this.subText = '';
    this.operatorSet = false;

    //Não está Previsto:
    //• Limpar históricos anteriores 
    //this.historicService.deleteAllHistoric().subscribe();
  }
    
  getAnswer() {
    this.calculationString = this.mainText;
    this.aux = this.mainText.replace(/\,/g,'.');
    this.operand2 = parseFloat(this.aux.split(this.operator)[1]);
    
    
    if (this.operator === '/') {
      this.subText = this.mainText;
      this.mainText = (this.operand1 / this.operand2).toString();
      this.subText = this.calculationString;
      if (this.mainText.length > 9) {
        this.mainText = this.mainText.substr(0, 9);
      }
    } else if (this.operator === 'x') {
      this.subText = this.mainText;
      this.mainText = (this.operand1 * this.operand2).toString();
      this.subText = this.calculationString;

    } else if (this.operator === '-') {
      this.subText = this.mainText;
      this.mainText = (this.operand1 - this.operand2).toString();
      this.subText = this.calculationString;
    } else if (this.operator === '+') {
      this.subText = this.mainText;
      this.mainText = (this.operand1 + this.operand2).toString();
      this.subText = this.calculationString;

    } else {
      this.subText = 'ERRO: Operação Inválida';
    }

    this.mainText = this.mainText.replace(/\./g,',');
    //save operation in database
    this.historicService.postHistoric({
      "expression": this.subText,
      "result": this.mainText
    }).subscribe();

    this.subText += ' =';    

    this.answered = true;
    this.operatorSet = false;
  }
      
}
