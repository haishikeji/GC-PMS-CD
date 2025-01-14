import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportFormProjectSituationComponent } from './project-situation.component';

describe('ReportFormProjectSituationComponent', () => {
  let component: ReportFormProjectSituationComponent;
  let fixture: ComponentFixture<ReportFormProjectSituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportFormProjectSituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFormProjectSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
