import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataBaseArchivesCollectionLineViewComponent } from './view.component';

describe('BasedataBaseArchivesCollectionLineViewComponent', () => {
  let component: BasedataBaseArchivesCollectionLineViewComponent;
  let fixture: ComponentFixture<BasedataBaseArchivesCollectionLineViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataBaseArchivesCollectionLineViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataBaseArchivesCollectionLineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
