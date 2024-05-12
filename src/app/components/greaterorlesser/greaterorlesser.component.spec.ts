import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreaterorlesserComponent } from './greaterorlesser.component';

describe('GreaterorlesserComponent', () => {
  let component: GreaterorlesserComponent;
  let fixture: ComponentFixture<GreaterorlesserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreaterorlesserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GreaterorlesserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
