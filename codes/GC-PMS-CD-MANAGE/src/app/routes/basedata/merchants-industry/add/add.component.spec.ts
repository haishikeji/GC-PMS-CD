import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataMerchantsIndustryAddComponent } from './add.component';

describe('BasedataMerchantsIndustryAddComponent', () => {
  let component: BasedataMerchantsIndustryAddComponent;
  let fixture: ComponentFixture<BasedataMerchantsIndustryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataMerchantsIndustryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataMerchantsIndustryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
