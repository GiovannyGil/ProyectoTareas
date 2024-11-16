import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasEditComponent } from './tareas-edit.component';

describe('TareasEditComponent', () => {
  let component: TareasEditComponent;
  let fixture: ComponentFixture<TareasEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TareasEditComponent]
    });
    fixture = TestBed.createComponent(TareasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
