import { Injectable } from '@angular/core'

// class TipsClass {
//   flag: boolean
//   tipsMes: string
// }

@Injectable()
export class WetoastServer {
  public tipsFlag: boolean = false
  public tipsMes: string = ""
}