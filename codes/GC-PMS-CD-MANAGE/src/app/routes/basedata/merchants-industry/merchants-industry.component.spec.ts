import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataMerchantsIndustryComponent } from './merchants-industry.component';

describe('BasedataMerchantsIndustryComponent', () => {
  let component: BasedataMerchantsIndustryComponent;
  let fixture: ComponentFixture<BasedataMerchantsIndustryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataMerchantsIndustryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataMerchantsIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
