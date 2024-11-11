import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilidadesCreateComponent } from './habilidades-create.component';

describe('HabilidadesCreateComponent', () => {
  let component: HabilidadesCreateComponent;
  let fixture: ComponentFixture<HabilidadesCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HabilidadesCreateComponent]
    });
    fixture = TestBed.createComponent(HabilidadesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
