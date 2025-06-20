import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';

import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormsModule,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatDividerModule,
    FormsModule,
    MatToolbarModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {}

  addAddressButton = localStorage.getItem('address') ? false : true;
  name = localStorage.getItem('name');
  email = localStorage.getItem('email');
  mobnumber = localStorage.getItem('mobilenumber');

  isEditClicked = false;
  editIndex: number | null = null;

  addressArray: any[] = [];

  addressForm: FormGroup = this.fb.group({
    address: new FormControl('', [Validators.required]),
    cityOrTown: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    const stored = localStorage.getItem('address');
    if (stored) {
      this.addressArray = JSON.parse(stored);
    }
  }

  onClickHome(): void {
    this.router.navigate(['']);
  }

  addNewAddress(): void {
    this.addAddressButton = true;
    this.addressForm.reset();
    this.editIndex = null;
    this.isEditClicked = false;
  }

  onClickAddAddress(): void {
    if (this.addressForm.valid) {
      this.addressArray.push(this.addressForm.value);
      localStorage.setItem('address', JSON.stringify(this.addressArray));
      this.addressForm.reset();
      this.addAddressButton = false;
    }
  }

  onEditAddress(index: number): void {
    this.editIndex = index;
    this.isEditClicked = true;

    const current = this.addressArray[index];
    this.addressForm.setValue({
      address: current.address,
      cityOrTown: current.cityOrTown,
      state: current.state,
      type: current.type,
    });
  }

  saveEditedAddress(): void {
    if (this.editIndex !== null && this.addressForm.valid) {
      this.addressArray[this.editIndex] = this.addressForm.value;
      localStorage.setItem('address', JSON.stringify(this.addressArray));
      this.editIndex = null;
      this.isEditClicked = false;
      this.addressForm.reset();
    }
  }
}
