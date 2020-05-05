import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelperSheetComponent } from './helper-sheet.component';

describe('HelperSheetComponent', () => {
  let component: HelperSheetComponent;
  let fixture: ComponentFixture<HelperSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelperSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelperSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
