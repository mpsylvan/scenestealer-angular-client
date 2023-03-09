import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisFormComponent } from './user-regis-form.component';

describe('UserRegisFormComponent', () => {
  let component: UserRegisFormComponent;
  let fixture: ComponentFixture<UserRegisFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRegisFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRegisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
