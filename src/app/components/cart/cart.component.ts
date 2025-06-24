import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { CartService } from 'src/app/service/cart/cart.service';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { LoginSignupComponent } from '../login-signup/login-signup.component';
import { DialogRef } from '@angular/cdk/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextFieldModule } from '@angular/cdk/text-field';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormsModule,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSelectModule,
    MatRadioModule,
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    TextFieldModule,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly cartService: CartService,
    private readonly fb: FormBuilder
  ) {
    this.initializeAddressForm();
  }

  isCartOpen = true;
  items: any[] = [];
  dialog = inject(MatDialog);
  clickedIndex: null | number = null;

  name = '';
  mobnumber = '';
  addressArray: any[] = [];
  isEditClicked = false;
  isAddNewAddress = false;
  selectedAddressIndex = -1;
  selectedIndex = -1;
  saveBtnIndex = -1;
  editBtnIndex = -1;

  continueToAddress = false;
  continueToOrderSummary = false;
  defaultPanel = true;

  totalAmount = 0;

  addressForm!: FormGroup;

  ngOnInit(): void {
    this.loadUserData();
    this.loadAddresses();
    this.loadCartItems();
  }

  calTotal(): void {
    for (let item of this.items) {
      this.totalAmount += item.product_id.discountPrice * item.quantityToBuy;
    }
  }

  initializeAddressForm(): void {
    this.addressForm = this.fb.group({
      fullName: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      cityOrTown: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    });
  }

  loadUserData(): void {
    this.name = localStorage.getItem('name') || '';
    this.mobnumber = localStorage.getItem('mobilenumber') || '';
  }

  loadAddresses(): void {
    const stored = localStorage.getItem('address');
    if (stored) {
      this.addressArray = JSON.parse(stored);
    }
  }

  loadCartItems(): void {
    this.cartService.getAllCartItems();
    this.cartService.cartList$.subscribe({
      next: (res: any) => {
        // console.log('this is cart response', res);
        this.items = res.result;
        this.calTotal();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onClickHomeBtn(): void {
    this.router.navigate(['']);
  }

  removeItem(productId: any): void {
    this.cartService.deleteCartItem(productId).subscribe({
      next: (res: any) => {
        this.cartService.getAllCartItems();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  decreaseQuant(productId: any): void {
    const item = this.items.find((i) => i._id === productId);

    let freq = item.quantityToBuy;
    freq = freq - 1;

    if (freq >= 1) {
      let data = {
        quantityToBuy: freq,
      };
      this.cartService.updateCartItemQuant(productId, data).subscribe({
        next: () => {
          this.cartService.getAllCartItems();
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      alert('Quantity should be between 1 to 10');
    }
  }

  increaseQuant(productId: any): void {
    const item = this.items.find((i) => i._id === productId);
    console.log('product id of moonlight in cart', productId);

    let freq = item.quantityToBuy;
    freq = freq + 1;

    if (freq <= 10) {
      let data = {
        quantityToBuy: freq,
      };
      this.cartService.updateCartItemQuant(productId, data).subscribe({
        next: () => {
          this.cartService.getAllCartItems();
        },
        error: (err) => {
          console.error('Error updating quantity:', err);
        },
      });
    } else {
      alert('Quantity should be between 1 to 10');
    }
  }

  onClickPlaceOrder(): void {
    this.continueToAddress = true;
    const token = localStorage.getItem('token');
    if (!token || token === '') {
      this.openDialog();
    }
  }

  openDialog(): void {
    this.dialog.open(LoginSignupComponent, {
      panelClass: 'custom-dialog',
      data: { DialogRef },
    });
  }

  onClickRadioBtn(index: number): void {
    if (this.clickedIndex === index) {
      this.clickedIndex = null;
    } else {
      this.clickedIndex = index;
    }
  }

  onClickAddNewAddress(): void {
    this.isAddNewAddress = !this.isAddNewAddress;
    if (this.isAddNewAddress) {
      this.resetAddressForm();
    }
  }

  resetAddressForm(): void {
    this.addressForm.reset();
    this.addressForm.patchValue({
      fullName: this.name,
      mobileNumber: this.mobnumber,
    });
  }

  onClickCheckBox(idx: number): void {
    this.selectedAddressIndex = idx;
  }

  onEditAddress(index: number): void {
    this.isEditClicked = true;
    this.selectedIndex = index;
    this.saveBtnIndex = index;
    this.editBtnIndex = index;
  }

  onClickSave(index: number): void {
    this.isEditClicked = false;
    this.selectedIndex = -1;
    this.saveBtnIndex = -1;
    this.editBtnIndex = -1;

    localStorage.setItem('address', JSON.stringify(this.addressArray));
  }

  onSubmitNewAddress(): void {
    if (this.addressForm.valid) {
      const formValue = this.addressForm.value;
      const newAddress = {
        address: formValue.address,
        cityOrTown: formValue.cityOrTown,
        state: formValue.state,
        type: formValue.type,
      };

      this.addressArray.push(newAddress);

      localStorage.setItem('address', JSON.stringify(this.addressArray));
      console.log('New address added successfully');
      this.isAddNewAddress = false;
      this.resetAddressForm();
    } else {
      console.log('Form is invalid');
    }
  }

  showSelectedAddress = false;
  get selectedAddress() {
    return this.selectedAddressIndex >= 0
      ? this.addressArray[this.selectedAddressIndex]
      : null;
  }

  onClickContinue(): void {
    if (this.selectedAddressIndex === -1) {
      alert('Please select an address');
      return;
    }
    this.showSelectedAddress = true;
    this.continueToOrderSummary = true;
    let selectedAddress = this.selectedAddress;
    localStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
  }

  onClickCheckout(): void {
    this.router.navigate(['checkout']);
  }
}
