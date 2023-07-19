export const formatarValor = (valor) => {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

export const gerarId = () => {
  const data = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2);

  return data + random;
};

export const fomatarData = (data) => {
  const novaData = new Date(data);
  const opcoes = {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  };

  return novaData.toLocaleDateString('pt-BR', opcoes);
};
