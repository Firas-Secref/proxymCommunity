import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationsCardComponent } from './publications-card.component';

describe('PublicationsCardComponent', () => {
  let component: PublicationsCardComponent;
  let fixture: ComponentFixture<PublicationsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
