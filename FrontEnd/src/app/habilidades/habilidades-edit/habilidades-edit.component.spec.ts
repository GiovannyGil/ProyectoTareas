import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilidadesEditComponent } from './habilidades-edit.component';

describe('HabilidadesEditComponent', () => {
  let component: HabilidadesEditComponent;
  let fixture: ComponentFixture<HabilidadesEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HabilidadesEditComponent]
    });
    fixture = TestBed.createComponent(HabilidadesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
