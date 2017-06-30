import { Component } from '@angular/core'
import { WetoastServer } from '../../servers/wetoast.server'
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'wetoast',
  templateUrl: './wetoast.component.html',
  animations: [
    trigger('flyInOut', [
      state('in', style({
        transform: 'translateX(0)',
        opacity: 0
      })),
      transition('void => *', [
        style({ transform: 'scale(0.9)', opacity: 0 }),
        animate(100)
      ]),
      transition('* => void', [
        style({ transform: '*' }),
        animate(100, style({ transform: 'scale(0.9)' }))
      ])
    ])
  ]
})

export class WetoastComponent {
  public tipsObj: any = {}
  public showLoadingBalls: boolean
  constructor(private wetoastServer: WetoastServer) {
    this.tipsObj = wetoastServer
  }
}