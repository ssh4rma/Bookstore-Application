import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { BookDetailComponent } from './book-detail.component';
import { CartService } from 'src/app/service/cart/cart.service';
import { BookService } from 'src/app/service/books/book.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BookDetailComponent (Add to Cart only)', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let mockCartService: jasmine.SpyObj<Pick<CartService, 'addToCart'>>;

  beforeEach(async () => {
    const cartSpy = jasmine.createSpyObj<Pick<CartService, 'addToCart'>>(
      'CartService',
      ['addToCart']
    );

    await TestBed.configureTestingModule({
      imports: [
        BookDetailComponent,
        CommonModule,
        MatDividerModule,
        MatIconModule,
        TextFieldModule,
        FormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '123' } },
          },
        },
        {
          provide: BookService,
          useValue: jasmine.createSpyObj('BookService', [], { books$: of([]) }),
        },
        { provide: CartService, useValue: cartSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    mockCartService = TestBed.inject(CartService) as unknown as jasmine.SpyObj<
      Pick<CartService, 'addToCart'>
    >;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('onClickAddToCart()', () => {
    beforeEach(() => {
      component.productId = '123';
    });

    it('should call addToCart and set showQuantBtn to true', () => {
      mockCartService.addToCart.and.returnValue(of(new ArrayBuffer(0)));
      component.onClickAddToCart();
      expect(mockCartService.addToCart).toHaveBeenCalledWith('123');
      expect(component.showQuantBtn).toBeTrue();
    });

    it('should handle error from addToCart', () => {
      spyOn(console, 'log');
      mockCartService.addToCart.and.returnValue(
        throwError('Add to cart failed')
      );
      component.onClickAddToCart();
      expect(console.log).toHaveBeenCalledWith('Add to cart failed');
    });
  });
});
