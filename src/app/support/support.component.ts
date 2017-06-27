import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './support.component.html'
})

export class SupportComponent implements OnInit {
  constructor(private titleService: Title) {

  }
  ngOnInit() {
    this.titleService.setTitle('支持的海外网站')
  }
}