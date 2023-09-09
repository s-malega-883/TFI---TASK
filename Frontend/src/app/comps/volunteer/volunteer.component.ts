import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { first } from "rxjs/operators";
import { User } from 'src/app/models/User';

// import { View_List } from "src/app/models/View_List";

import { Volunteer } from 'src/app/models/Volunteer';

import { AuthService } from "src/app/services/auth.service";
import { VolunteerService } from 'src/app/services/volunteer.service';
// import { ViewListService } from 'src/app/services/view-list.service';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.scss']
})
export class VolunteerComponent implements OnInit {
  @ViewChild("formDirective") formDirective: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();

  volunteer$: Observable<Volunteer[]>;
  userId: Pick<User, "id"> | number;

  constructor(
    private authService: AuthService,
    private volunteerService: VolunteerService
  ) { }

  volunteerForm: FormGroup;

  languageArray:string[] = ['English', 'Hindi', 'Marathi'];

  availabilityArray:string[] = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

  ngOnInit(): void {
    this.volunteerForm = this.createFormGroup();
    this.volunteer$ = this.fetchAll();
    this.userId = this.authService.userId;
  }

  fetchAll(): Observable<Volunteer[]> {
    return this.volunteerService.fetchAll();
  }

  createVolunteer(): void {
    this.volunteer$ = this.fetchAll();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [Validators.required,]),
      email: new FormControl('', [Validators.required, Validators.email]),
      // password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]),
      city: new FormControl('', [Validators.required]),

      languages: new FormArray([]),
      availability: new FormArray([])
    });
    // return new FormGroup({
    //   name: new FormControl(""),
    //   email: new FormControl(''),
    //   // password: new FormControl(''),
    //   phone: new FormControl(''),
    //   city: new FormControl(''),

    //   languages: new FormArray([]),
    //   availability: new FormArray([])
    // });
  }

  volunteerSubmit(formData: Pick<Volunteer, "name" | "email" | "phone" | "city" | "languages" | "availability">): void {
    console.log(this.volunteerForm.value);

    this.volunteerService
      .createVolunteer(formData, this.authService.userId)
      .pipe(first())
      .subscribe(() => {
        this.create.emit(null);
      });
    this.formDirective.resetForm();
  }

  get nameValidator(){ return this.volunteerForm.get('name'); }
  get emailValidator(){ return this.volunteerForm.get('email'); }
  // get passwordValidator(){ return this.volunteerForm.get('password'); }
  get phoneValidator(){ return this.volunteerForm.get('phone'); }
  get cityValidator(){ return this.volunteerForm.get('city'); }

  get languageValidator(){ return this.volunteerForm.get('languages'); }
  get availabilityValidator(){ return this.volunteerForm.get('availability'); }


  alert(){
    alert("Data Submitted Successfully!");
  }

  onChangeLang(e: any){
    const checkedValue = e.target.value;
    const checked = e.target.checked;
    // console.log(checkedValue, checked);

    const checkedArray = this.volunteerForm.get('languages') as FormArray;
    if(checked){
      checkedArray.push(new FormControl(checkedValue));
    } else{
      let i:number = 0;
      checkedArray.controls.forEach((item) => {
        if (item.value == checkedValue){
          checkedArray.removeAt(i);
        }
        i++;
      });
    }
  }

  onChangeAvailability(e: any){
    const checkedValue = e.target.value;
    const checked = e.target.checked;
    // console.log(checkedValue, checked);

    const checkedArray = this.volunteerForm.get('availability') as FormArray;
    if(checked){
      checkedArray.push(new FormControl(checkedValue));
    } else{
      let i:number = 0;
      checkedArray.controls.forEach((item) => {
        if (item.value == checkedValue){
          checkedArray.removeAt(i);
        }
        i++;
      });
    }
  }


}
