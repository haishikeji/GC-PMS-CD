import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataInformationSourcesComponent } from './information-sources.component';

describe('BasedataInformationSourcesComponent', () => {
  let component: BasedataInformationSourcesComponent;
  let fixture: ComponentFixture<BasedataInformationSourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataInformationSourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataInformationSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
