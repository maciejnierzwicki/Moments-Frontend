import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostViewComponent } from './edit-post-view.component';

describe('EditPostViewComponent', () => {
  let component: EditPostViewComponent;
  let fixture: ComponentFixture<EditPostViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPostViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
