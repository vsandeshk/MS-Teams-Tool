import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MyChannelsComponent } from './my-channels.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

describe('MyChannelsComponent', () => {
  let component: MyChannelsComponent;
  let fixture: ComponentFixture<MyChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientModule],
      declarations: [ MyChannelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
