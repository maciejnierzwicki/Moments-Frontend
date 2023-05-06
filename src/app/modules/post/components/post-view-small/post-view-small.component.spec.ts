import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostViewSmallComponent } from './post-view-small.component';

describe('PostViewSmallComponent', () => {
  let component: PostViewSmallComponent;
  let fixture: ComponentFixture<PostViewSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostViewSmallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostViewSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
