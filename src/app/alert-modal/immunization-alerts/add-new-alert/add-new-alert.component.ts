import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-alert',
  templateUrl: './add-new-alert.component.html',
  styleUrls: ['./add-new-alert.component.css']
})
export class AddNewAlertComponent implements OnInit {
  @Output() formData = new EventEmitter<any>();



  constructor(public fb: FormBuilder) { }


  //variables

  initAddform: FormGroup;
  submitted: boolean = false;



  ngOnInit(): void {
    this.createAddform();
  }

  createAddform() {
    this.initAddform = this.fb.group({
      Name: new FormControl('', [Validators.required]),
      Description: new FormControl('', [Validators.required]),
      webReferences: new FormControl('', [Validators.required])
    })

  }

  addData() {
    console.log('addData :', this.initAddform.value,this.initAddform);
    this.submitted = true;
    if (this.initAddform.status=="VALID") {
      this.formData.emit(this.initAddform.value);
      this.initAddform.reset();
      this.initAddform.markAsPristine();
      this.initAddform.markAsUntouched();
      this.submitted = false;
    }
  }
}
