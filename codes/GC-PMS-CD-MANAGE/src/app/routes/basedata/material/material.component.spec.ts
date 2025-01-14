import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataMaterialComponent } from './material.component';

describe('BasedataMaterialMaterialComponent', () => {
  let component: BasedataMaterialComponent;
  let fixture: ComponentFixture<BasedataMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
