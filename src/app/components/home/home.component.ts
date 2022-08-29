import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/model/Cliente';
import { ClienteServiceService } from 'src/app/services/cliente-service.service';
import { NumeralPipe } from 'ngx-numeral';
import { formatNumber } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  consultaForm: FormGroup;
  informacionDeCliente: Cliente[] = [];
  numeroValor !: any;
  isAlert = false;
  alertMessage: string = '';
  alertColor: string = '';
  

  constructor(private clienteService: ClienteServiceService, @Inject(LOCALE_ID) public locale: string) {
      this.consultaForm = new FormGroup({
        numeroDeDocumento: new FormControl('', [Validators.maxLength(11), Validators.minLength(8),Validators.pattern('^[0-9]+$')]),
        tipoDeDocumento: new FormControl(''),
      });

   }


   consultarCliente() {
    //this.processMyValue();
    console.log(this.consultaForm.value);
    let numDoc = this.consultaForm.controls['numeroDeDocumento'].value;
    let tipDoc = this.consultaForm.controls['tipoDeDocumento'].value;
    this.clienteService.getInformacionCliente(numDoc,tipDoc).subscribe(data => {
      this.informacionDeCliente = data;
      this.clienteService.setCliente(data);
      this.isAlert = true; 
      this.alertMessage = 'Cliente encontrado con exito';
      this.alertColor = 'success';
    },err => {
      if(err.status == 404) {
        this.isAlert = true;
        this.alertMessage = 'Cliente no encontrado';
        this.alertColor = 'danger';
      } else {
        //this.router.navigate([`/error/${err.status}/${err.statusText}`]);
      }
    })
  }

  processMyValue() {
    var parts = this.consultaForm.controls['numeroDeDocumento'].value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.consultaForm.controls['numeroDeDocumento'].setValue(parts.join("."));
    console.log(parts.join("."));
    var nueva = this.consultaForm.controls['numeroDeDocumento'].value.replace(/,/g,'');
    console.log(nueva);
  }

  ngOnInit(): void {
  }

  changeAlert(){
    this.isAlert = false;
  }



}
