import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataBaseArchivesCostAddComponent } from './add.component';

describe('BasedataBaseArchivesCostAddComponent', () => {
  let component: BasedataBaseArchivesCostAddComponent;
  let fixture: ComponentFixture<BasedataBaseArchivesCostAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataBaseArchivesCostAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataBaseArchivesCostAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
