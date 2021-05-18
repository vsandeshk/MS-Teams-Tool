import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewMembersComponent } from './view-members.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

describe('ViewMembersComponent', () => {
  let component: ViewMembersComponent;
  let fixture: ComponentFixture<ViewMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientModule],
      declarations: [ViewMembersComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
