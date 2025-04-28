import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedREcipeComponentComponent } from './saved-recipe-component.component';

describe('SavedREcipeComponentComponent', () => {
  let component: SavedREcipeComponentComponent;
  let fixture: ComponentFixture<SavedREcipeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedREcipeComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedREcipeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
