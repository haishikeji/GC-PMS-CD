import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataBusinessRelationsComponent } from './business-relations.component';

describe('BasedataBusinessRelationsComponent', () => {
  let component: BasedataBusinessRelationsComponent;
  let fixture: ComponentFixture<BasedataBusinessRelationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataBusinessRelationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataBusinessRelationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
