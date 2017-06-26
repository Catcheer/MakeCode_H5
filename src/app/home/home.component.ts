import { Component } from '@angular/core'
@Component({
  templateUrl: './home.component.html'
})

export class HomeComponent {
  private webUrl: string = ''
  constructor() { }
  update() {
    if (this.webUrl.length == 0) {
      return
    }
    
  }

}