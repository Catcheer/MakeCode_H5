import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router';
import { ProductServer } from '../../servers/product.server'
import { Title } from '@angular/platform-browser';
import CONFIG from '../../base.config'

import 'rxjs/add/operator/switchMap';

class UlrCode {
  "target": string
}
@Component({
  templateUrl: './product.component.html'
})

export class ProductComponent implements OnInit {
  private productData: any = {
    Picture:'/src/assets/images/balls.svg'
  }
  private tmpParam: any
  public urlcode: UlrCode
  public qrCode: string = '/src/assets/images/placeholderImg.png'
  constructor(private route: ActivatedRoute, private product: ProductServer, private titleService: Title) { }
  ngOnInit(): void {

    console.log('ngOnInit')
    console.log(localStorage.target)
    this.qrCode = `${CONFIG.host}/d/qrcode?target=${localStorage.target}`

    const obj = {
      "target": `${localStorage.target}`
    }
    this.product.getProduct(obj).then(res => {
      console.log("resdata")
      console.log(res)
      this.productData = res.Data

    })

    // set title
    this.titleService.setTitle('长按二维码下单')

  }
}