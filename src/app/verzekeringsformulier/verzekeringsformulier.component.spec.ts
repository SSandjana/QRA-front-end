import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerzekeringsformulierComponent } from './verzekeringsformulier.component';

describe('VerzekeringsformulierComponent', () => {
  let component: VerzekeringsformulierComponent;
  let fixture: ComponentFixture<VerzekeringsformulierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerzekeringsformulierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerzekeringsformulierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
