import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutesUploadDownloadComponent } from './upload-download.component';

describe('RoutesUploadDownloadComponent', () => {
  let component: RoutesUploadDownloadComponent;
  let fixture: ComponentFixture<RoutesUploadDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesUploadDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesUploadDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
