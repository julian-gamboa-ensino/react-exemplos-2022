

// services/produtoService.ts

import Produto from '../models/Produto'; // Certifique-se de que o caminho está correto

export const buscarProdutos = async (): Promise<Produto[]> => {
  try {
    const response = await fetch('http://localhost:3000/produtos');
    const data = await response.json();
    return data as Produto[]; // Fazemos a tipagem explícita aqui
  } catch (error) {
    throw error; 
  }
};