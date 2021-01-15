import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'syneco';

  pressCalc(){
    let calc = document.getElementById("calc");
    if(calc.style.display === "none"){
      calc.style.display = "unset";
    }else{
      calc.style.display = "none";
    }
  }
}
