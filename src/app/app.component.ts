import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as fileSaver from 'file-saver';

import { FormBuilder } from '@angular/forms';
import { BackendService } from './@core/backend.service';

var type = ["fraud", "fraud2", "non-fraud"];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'live fraud detector dashboard';

  name = 'data';
  fileUrl: any;

  constructor(private backendService: BackendService, private formBuilder: FormBuilder, private sanitizer: DomSanitizer) { }
  onSubmitForm = this.formBuilder.group({
    type: ''
  });
  ngOnInit(): void {

  }

  onSubmit() {
    this.onSubmitForm
    this.onSubmitForm.value.type = type[Math.floor(Math.random() * type.length)];
    this.backendService.onSubmitService(this.onSubmitForm.value.type).subscribe
      (
        (result: any) => {
          console.info('Your order has been submitted is succefully :', result);
          if (result.code === 210) {
            console.info(result);
            let blob: any = new Blob([JSON.stringify(result, null, 2)], { type: 'text/json; charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            fileSaver.saveAs(blob,'data.json');
          }
        },
        (err) => {
          console.warn('Error your order has been submitted', err);
        }
      )
  }

  downloadJson (){

  }

}
