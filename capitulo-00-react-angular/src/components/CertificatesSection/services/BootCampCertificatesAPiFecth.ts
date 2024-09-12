


import Certificado from '../models/Certificados'; // Certifique-se de que o caminho está correto

export const buscarCertificados = async (): Promise<Certificado[]> => {
  try {
    const response = await fetch('http://localhost:3000/bootcamps');
    const data = await response.json();
    return data as Certificado[]; // Fazemos a tipagem explícita aqui
  } catch (error) {
    throw error; 
  }
};