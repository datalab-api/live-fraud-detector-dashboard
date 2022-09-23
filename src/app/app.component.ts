import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as fileSaver from 'file-saver';

import { FormBuilder } from '@angular/forms';
import { BackendService } from './@core/backend.service';
import { ActivatedRoute, Router } from '@angular/router';

var type = ["fraud", "fraud2", "non-fraud"];
const TOKEN_DATA = 'data-fraud';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'live fraud detector dashboard';

  name = 'data';
  fileUrl: any;
  data: any;
  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  onSubmitForm = this.formBuilder.group({
    type: ''
  });

  ngOnInit(): void {

  }

  private saveData(data: string): void {
    window.sessionStorage.removeItem(TOKEN_DATA);
    window.sessionStorage.setItem(TOKEN_DATA, data);
  }

  private getData(): string | null {
    return window.sessionStorage.getItem(TOKEN_DATA);
  }

  onSubmit() {
    this.onSubmitForm
    this.onSubmitForm.value.type = type[Math.floor(Math.random() * type.length)];
    this.backendService.onSubmitService(this.onSubmitForm.value.type).subscribe
      (
        (result) => {
          console.info('Your order has been submitted is succefully :', result.data);
          const res = result.data;
          this.saveData(JSON.stringify(res, null, 2));
          console.info(this.getData());

        },
        (err) => {
          console.warn('Error your order has been submitted', err);
        }
      )
  }

  public downloadJson() {

    let blob: any = new Blob([JSON.stringify(this.getData(), null, 4)], { type: 'text/json; charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    fileSaver.saveAs(blob, 'data.json');
    this.router.navigate(['**', { relativeTo: this.route }]);
  }

}
