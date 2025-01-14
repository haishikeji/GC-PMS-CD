import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataMilestoneCategoryComponent } from './milestone-category.component';

describe('BasedataMilestoneCategoryComponent', () => {
  let component: BasedataMilestoneCategoryComponent;
  let fixture: ComponentFixture<BasedataMilestoneCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataMilestoneCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataMilestoneCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
