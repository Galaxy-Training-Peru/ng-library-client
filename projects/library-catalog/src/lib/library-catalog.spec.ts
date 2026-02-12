import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryCatalog } from './library-catalog';

describe('LibraryCatalog', () => {
  let component: LibraryCatalog;
  let fixture: ComponentFixture<LibraryCatalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryCatalog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryCatalog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
