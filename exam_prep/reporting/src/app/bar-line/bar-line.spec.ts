import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarLine } from './bar-line';

describe('BarLine', () => {
  let component: BarLine;
  let fixture: ComponentFixture<BarLine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarLine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarLine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
