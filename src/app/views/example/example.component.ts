import { Component } from '@angular/core'
import { WetoastServer } from '../../servers/wetoast.server'

@Component({
  templateUrl: './example.component.html'
})

export class ExampleComponent {
  constructor(private wetoastServer: WetoastServer) {
    this.wetoastServer.httpFail = false
    this.wetoastServer.httpMes = ""
    this.wetoastServer.curHash = ''
  }
}