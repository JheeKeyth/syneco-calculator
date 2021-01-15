import { Input, OnChanges, SimpleChanges } from "@angular/core";
import { Component } from "@angular/core";
import { Historic } from "../shared/model/historic";
import { HistoricService } from "../shared/service/historic.service";


@Component({
    selector: 'ng-historic',
    templateUrl: 'historic.component.html',
    styleUrls: ['historic.component.css'],
    
})

export class HistoricComponent implements OnChanges{
    
    @Input() historic: Historic[] = [];

    constructor(private historicService: HistoricService) {}
    
    ngOnChanges(changes: SimpleChanges): void {
      if(changes.historicService)
        this.historicService.getHistoric().subscribe(historic => this.historic = historic);
    }

    ngOnInit(): void {     
      this.historicService.getHistoric().subscribe(historic => this.historic = historic);
    }


}


