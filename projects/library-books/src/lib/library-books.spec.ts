import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBooks } from './library-books';

describe('LibraryBooks', () => {
  let component: LibraryBooks;
  let fixture: ComponentFixture<LibraryBooks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBooks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryBooks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
