import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router';
import { ProductServer } from '../servers/product.server'
import { Title } from '@angular/platform-browser';
import CONFIG from '../base.config'

import 'rxjs/add/operator/switchMap';

class UlrCode {
  "target": string
}
@Component({
  providers: [ProductServer],
  templateUrl: './product.component.html'
})

export class ProductComponent implements OnInit {
  private productData: any = {}
  private tmpParam: any
  public urlcode: UlrCode
  public qrCode: string = ''
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

    // this.route.params
    //   .switchMap((params: Params) => {
    //     this.qrCode = `${CONFIG.host}/d/qrcode?target=${params['code']}`
    //     const obj = {
    //       // "target": params['code']
    //       "target": 'https://www.amazon.com/AmazonBasics-External-Hard-Drive-Case/dp/B00F5CKWBA/ref=sr_1_10?s=pc&srs=10112675011&ie=UTF8&qid=1498553493&sr=1-10'
    //     }
    //     return this.product.getProduct(obj)
    //   })
    //   .subscribe((data) => {
    //     console.log('data')
    //     console.log(data)
    //     this.productData = data.Data
    //   });




  }
}