import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataMaterialFileProductAddComponent } from './product-add.component';

describe('BasedataMaterialFileProductAddComponent', () => {
  let component: BasedataMaterialFileProductAddComponent;
  let fixture: ComponentFixture<BasedataMaterialFileProductAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataMaterialFileProductAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataMaterialFileProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
