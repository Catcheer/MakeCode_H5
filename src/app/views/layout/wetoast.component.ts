import { Component } from '@angular/core'
import { WetoastServer } from '../../servers/wetoast.server'


@Component({
  selector: 'wetoast',
  templateUrl: './wetoast.component.html'
})

export class WetoastComponent {
  public tipsObj: any = {}
  constructor(private wetoastServer: WetoastServer) {
    this.tipsObj = wetoastServer
  }
}