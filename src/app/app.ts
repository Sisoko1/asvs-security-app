import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AsvsService } from './services/asvs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JsonPipe], // ← مهم جدا
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {

  data: any;

  constructor(private asvsService: AsvsService) {}

  ngOnInit() {
    this.asvsService.getASVSData().subscribe(res => {
      this.data = res;
      console.log(this.data);
    });
  }
}
