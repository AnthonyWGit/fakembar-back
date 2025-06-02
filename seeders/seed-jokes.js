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