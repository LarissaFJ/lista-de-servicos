import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusServicosComponent } from './meus-servicos.component';

describe('MeusServicosComponent', () => {
  let component: MeusServicosComponent;
  let fixture: ComponentFixture<MeusServicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusServicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeusServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
