import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

@Component({
  templateUrl: './product.component.html'
})

export class ProductComponent implements OnInit {
  private target: string
  private tmpParam: string
  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.tmpParam = params['code'])
      .subscribe(() => this.target = this.tmpParam);
    console.log(this.target)
  }
}