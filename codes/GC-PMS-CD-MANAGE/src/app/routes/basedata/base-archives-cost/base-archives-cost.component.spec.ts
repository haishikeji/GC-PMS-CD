import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataBaseArchivesCostComponent } from './base-archives-cost.component';

describe('BasedataBaseArchivesCostComponent', () => {
  let component: BasedataBaseArchivesCostComponent;
  let fixture: ComponentFixture<BasedataBaseArchivesCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataBaseArchivesCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataBaseArchivesCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
