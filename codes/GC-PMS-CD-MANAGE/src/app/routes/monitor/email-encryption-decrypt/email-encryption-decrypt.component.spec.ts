import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorEmailEncryptionDecryptComponent } from './email-encryption-decrypt.component';

describe('MonitorEmailEncryptionDecryptComponent', () => {
  let component: MonitorEmailEncryptionDecryptComponent;
  let fixture: ComponentFixture<MonitorEmailEncryptionDecryptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorEmailEncryptionDecryptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorEmailEncryptionDecryptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
