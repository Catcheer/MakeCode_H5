import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser';
import { ProductServer } from '../../servers/product.server'


@Component({
  templateUrl: './support.component.html'
})

export class SupportComponent implements OnInit {
  public flag: string = 'active'
  public webListAll: any = []
  public allCountryList: string[] = ["全部国家", "中国", "日本", "美国", "法国", "德国"]
  constructor(private product: ProductServer, private titleService: Title) {

  }
  ngOnInit() {
    // set html title
    this.titleService.setTitle('支持的海外网站')
    this.product.getAllWebs()
      .then(res => {
        console.log(res)
        this.webListAll = res.List
      })

  }
}