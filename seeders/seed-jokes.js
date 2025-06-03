module.exports = {
  up: async (queryInterface) => {
    try {
      await queryInterface.bulkInsert('Jokes', [
        {
          text: "Quelle est la femelle du hamster ?",
          answer: "L’Amsterdam",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          text: "Que dit un oignon quand il se cogne ?",
          answer: "Aïe",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          text: "Quel est l'animal le plus heureux ?",
          answer: "Le hibou, parce que sa femme est chouette.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
                {
          text: "test",
          answer: "test",
          createdAt: new Date(),
          updatedAt: new Date()
        },
                {
          text: "Pourquoi le football c'est rigolo ?",
          answer: "Parce que Thierry en rit",
          createdAt: new Date(),
          updatedAt: new Date()
        },
                {
          text: "Quel est le sport le plus fruité ?",
          answer: "La boxe, parce que tu te prends des pêches dans la poire et tu tombes dans les pommes.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          text: "Que se fait un Schtroumpf quand il tombe ?",
          answer: "Un Bleu",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          text: "Quel est le comble pour un marin ?",
          answer: "Avoir le nez qui coule",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          text: "Qu'est ce que les enfants usent le plus à l'école ?",
          answer: "Le professeur",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          text: "Quel est le sport le plus silencieux ?",
          answer: "Le para-chuuuut",
          createdAt: new Date(),
          updatedAt: new Date()
        },        {
          text: "Quel est le comble pour un joueur de bowling ?",
          answer: "C’est de perdre la boule",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // Add others jokes here
      ], {});
    } catch (error) {
      console.error('Erreur détaillée :', error);
      throw error;
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Jokes', null, {});
  }
};