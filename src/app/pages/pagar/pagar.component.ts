import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.scss'],
})
export class PagarComponent implements OnInit {

  user;
  constructor(
    private qrScanner: QRScanner,
    private router: Router
    ) { }
  isOn = false;
  scannedData: {};
  codLinhaOnibus = '857R-10';
  horaInicio;
  horaIntegracao;
  LinhaOnibus ="Parada Faria Lima A/B"

  ngOnInit() {

    
    this.startScanner();
    this.horaInicio = moment().format('LT');
    var time = new Date();
    var outraData = new Date();
    outraData.setHours(time.getHours() + 2); // Adiciona 2 horas
        
    this.horaIntegracao = moment(outraData).format('LT');
  }

  
  startScanner() {

    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {

          

          // start scanning
          const scanSub = this.qrScanner.scan().subscribe((text: string) => {
            
            this.scannedData = text
            this.isOn = false;
            this.qrScanner.hide().then();
            scanSub.unsubscribe();
          });

          this.qrScanner.show().then();


        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
          this.qrScanner.openSettings();
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }


  stopScanner(){
    this.isOn = !this.isOn
    this.qrScanner.hide();
    this.isOn = true;
  }

  back(){
    this.router.navigate(['inside'])
  }

}