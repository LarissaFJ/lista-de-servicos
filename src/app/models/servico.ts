export type ServicoCategoria =
  | 'SERVICOS_GERAIS' | 'CULINARIA' | 'ANIMAIS'
  | 'BELEZA_E_ESTETICA' | 'TECNOLOGIA_E_INFORMATICA'
  | 'EDUCACAO' | 'OUTROS_SERVICOS';

export interface Servico {
  id?: number;
  nome: string;
  telefone: string;
  categoria: ServicoCategoria;
  descricao: string;
  criadoEm?: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
