import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataBaseArchivesCollectionLineAddComponent } from './add.component';

describe('BasedataBaseArchivesCollectionLineAddComponent', () => {
  let component: BasedataBaseArchivesCollectionLineAddComponent;
  let fixture: ComponentFixture<BasedataBaseArchivesCollectionLineAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataBaseArchivesCollectionLineAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataBaseArchivesCollectionLineAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
