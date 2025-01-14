import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportFormProjectStatisticsComponent } from './project-statistics.component';

describe('ReportFormProjectStatisticsComponent', () => {
  let component: ReportFormProjectStatisticsComponent;
  let fixture: ComponentFixture<ReportFormProjectStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportFormProjectStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFormProjectStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
