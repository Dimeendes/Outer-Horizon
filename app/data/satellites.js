export const satellites = [
  {
    id: "SAT-001",

    nome: "ISS",

    planeta: "earth",

    status: "orbiting",

    dataMissao: "1998-11-20",

    periastro: 408,

    apoastro: 418,

    direcao: "Prógrado",

    energia: {
      tipo: "Painéis Solares",
      producao: 92
    },

    sensores: {
      temperatura: 24.1,
      radiacao: 0.87,
      velocidade: 27600
    }
  },

  {
    id: "SAT-002",

    nome: "Explorer X",

    planeta: "mars",

    status: "traveling",

    origem: "earth",

    destino: "mars",

    progresso: 62,

    dataMissao: "2026-04-14",

    energia: {
      tipo: "RTG",
      producao: 7.4
    },

    sensores: {
      temperatura: -58,
      radiacao: 2.4
    }
  }
];