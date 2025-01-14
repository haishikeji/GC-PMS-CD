import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataBaseArchivesMilestoneAddComponent } from './add.component';

describe('BasedataBaseArchivesMilestoneAddComponent', () => {
  let component: BasedataBaseArchivesMilestoneAddComponent;
  let fixture: ComponentFixture<BasedataBaseArchivesMilestoneAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataBaseArchivesMilestoneAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataBaseArchivesMilestoneAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
