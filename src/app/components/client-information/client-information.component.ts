import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Cliente } from 'src/app/model/Cliente';
import { ClienteServiceService } from 'src/app/services/cliente-service.service';

@Component({
  selector: 'app-client-information',
  templateUrl: './client-information.component.html',
  styleUrls: ['./client-information.component.css']
})
export class ClientInformationComponent implements OnInit {
  selectedClient$ = this.clientesService.selectedClient$;
  dataClient : any = [];

  constructor(private clientesService: ClienteServiceService) {
    
   }



  ngOnInit(): void {
    this.selectedClient$.subscribe(data => {
      this.dataClient = data;
      console.log(this.dataClient);
    });
  }

}
