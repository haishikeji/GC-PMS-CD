import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataBaseArchivesMilestoneComponent } from './base-archives-milestone.component';

describe('BasedataBaseArchivesMilestoneComponent', () => {
  let component: BasedataBaseArchivesMilestoneComponent;
  let fixture: ComponentFixture<BasedataBaseArchivesMilestoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataBaseArchivesMilestoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataBaseArchivesMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
