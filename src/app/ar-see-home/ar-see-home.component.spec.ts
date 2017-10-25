import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArSeeHomeComponent } from './ar-see-home.component';

describe('ArSeeHomeComponent', () => {
  let component: ArSeeHomeComponent;
  let fixture: ComponentFixture<ArSeeHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArSeeHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArSeeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
