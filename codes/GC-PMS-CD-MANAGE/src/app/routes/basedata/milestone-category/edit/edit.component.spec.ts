import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataMilestoneCategoryEditComponent } from './edit.component';

describe('BasedataMilestoneCategoryEditComponent', () => {
  let component: BasedataMilestoneCategoryEditComponent;
  let fixture: ComponentFixture<BasedataMilestoneCategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataMilestoneCategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataMilestoneCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
