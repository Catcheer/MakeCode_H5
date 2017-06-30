import { Injectable } from '@angular/core'


@Injectable()
export class WetoastServer {
  public tipsFlag: boolean = false
  public tipsMes: string = ""
  public showLoadingBalls: boolean = false
  public httpFail: boolean = false
  public httpMes: string = ""
}