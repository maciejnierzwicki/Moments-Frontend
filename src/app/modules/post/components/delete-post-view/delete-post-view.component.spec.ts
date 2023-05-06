import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePostViewComponent } from './delete-post-view.component';

describe('DeletePostViewComponent', () => {
  let component: DeletePostViewComponent;
  let fixture: ComponentFixture<DeletePostViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePostViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
