import { Component } from '@angular/core';

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
  constructor(private backendService: BackendService, private formBuilder: FormBuilder) { }
  onSubmitForm = this.formBuilder.group({
    type: ''
  });
  ngOnInit(): void {

  }

  onSubmit(){
    this.onSubmitForm
    this.onSubmitForm.value.type = type[Math.floor(Math.random() * type.length)];
    this.backendService.onSubmitService(this.onSubmitForm.value.type).subscribe(
      (data)=>{
        console.info('Your order has been submitted is succefully :', data.message);

      },
      (err)=>{
        console.warn('Error your order has been submitted', err);
      }
    )

  }

}
