import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataBaseArchivesCollectionLineComponent } from './base-archives-collection-line.component';

describe('BasedataBaseArchivesCollectionLineComponent', () => {
  let component: BasedataBaseArchivesCollectionLineComponent;
  let fixture: ComponentFixture<BasedataBaseArchivesCollectionLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataBaseArchivesCollectionLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataBaseArchivesCollectionLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
