import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.page.html',
  styleUrls: ['./inside.page.scss'],
})
export class InsidePage implements OnInit {

user = 'Fernando';
saldo = '50,00'
saldoReal;
saldoCents;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    // let saudacao = moment().format('LT');
    //  saudacao
    
    this.saldoReal = this.saldo.split(',', 6);
    this.saldoCents = this.saldo.slice(-2)
  }

  pagar(){
    
    this.router.navigate(['inside/pagar']);
  }

}
