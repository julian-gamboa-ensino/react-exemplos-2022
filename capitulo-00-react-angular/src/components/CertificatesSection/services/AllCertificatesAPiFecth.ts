


import Certificado from '../models/Certificados'; 

export const buscarCertificados = async (): Promise<Certificado[]> => {
  try {    
    const response = await fetch('./certificados.json');
    const data = await response.json();
    return data as Certificado[]; // Fazemos a tipagem explícita aqui
  } catch (error) {
    throw error; 
  }
};


