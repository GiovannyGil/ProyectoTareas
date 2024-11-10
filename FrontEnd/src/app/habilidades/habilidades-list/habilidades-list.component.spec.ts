import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilidadesListComponent } from './habilidades-list.component';

describe('HabilidadesListComponent', () => {
  let component: HabilidadesListComponent;
  let fixture: ComponentFixture<HabilidadesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HabilidadesListComponent]
    });
    fixture = TestBed.createComponent(HabilidadesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
