import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataBaseArchivesCostViewComponent } from './view.component';

describe('BasedataBaseArchivesCostViewComponent', () => {
  let component: BasedataBaseArchivesCostViewComponent;
  let fixture: ComponentFixture<BasedataBaseArchivesCostViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataBaseArchivesCostViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataBaseArchivesCostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
