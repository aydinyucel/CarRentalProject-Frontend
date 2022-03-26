import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rent-payment',
  templateUrl: './rent-payment.component.html',
  styleUrls: ['./rent-payment.component.css']
})
export class RentPaymentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  pay(){
    console.log("Ödeme Alındı");
    
  }
}
