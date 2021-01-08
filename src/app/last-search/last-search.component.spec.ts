import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastSearchComponent } from './last-search.component';

describe('LastSearchComponent', () => {
  let component: LastSearchComponent;
  let fixture: ComponentFixture<LastSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
