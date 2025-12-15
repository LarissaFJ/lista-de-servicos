import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosCadastradosComponent } from './servicos-cadastrados.component';

describe('ServicosCadastradosComponent', () => {
  let component: ServicosCadastradosComponent;
  let fixture: ComponentFixture<ServicosCadastradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicosCadastradosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicosCadastradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
