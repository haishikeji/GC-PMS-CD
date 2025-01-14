import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutesSharedModalProdutSelectComponent } from './produt-select.component';

describe('RoutesSharedModalProdutSelectComponent', () => {
  let component: RoutesSharedModalProdutSelectComponent;
  let fixture: ComponentFixture<RoutesSharedModalProdutSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesSharedModalProdutSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesSharedModalProdutSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
