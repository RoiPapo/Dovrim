import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdiscussionComponent } from './newdiscussion.component';

describe('NewdiscussionComponent', () => {
  let component: NewdiscussionComponent;
  let fixture: ComponentFixture<NewdiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewdiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewdiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
