const Chatbot = {
  defaultResponses: {
    'hello hi bonjour': `Bonjour ! Comment puis-je vous aider ?`,
    'comment ca va': `Je vais très bien ! Comment puis-je vous aider ?`,
    'lancer une piece': function () {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        return 'Bien sûr ! Vous avez face';
      } else {
        return 'Bien sûr ! Vous avez pile';
      }
    },
    'lancer un dé': function() {
      const diceResult = Math.floor(Math.random() * 6) + 1;
      return `Bien sûr ! Vous avez obtenu ${diceResult}`;
    },
    'quel jour on est la date d aujourd hui': function () {
      const now = new Date();
      const months = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
      ];
      const month = months[now.getMonth()];
      const day = now.getDate();

      return `Nous sommes le ${day} ${month}`;
    },
    'merci': 'Avec plaisir ! Dites-moi si vous avez besoin d’aide pour autre chose !',
  },

  additionalResponses: {},

  unsuccessfulResponse: `Désolé, je n'ai pas bien compris. Pour l'instant, je sais seulement lancer une pièce, lancer un dé ou donner la date d'aujourd'hui. Dites-moi comment je peux vous aider !`,

  emptyMessageResponse: `Désolé, votre message semble vide. Veuillez envoyer un message et je vous répondrai.`,

  addResponses: function (additionalResponses) {
    this.additionalResponses = {
      ...this.additionalResponses,
      ...additionalResponses
    };
  },

  getResponse: function (message) {
    if (!message) {
      return this.emptyMessageResponse;
    }

    // Cet opérateur de spread (...) combine les 2 objets.
    const responses = {
      ...this.defaultResponses,
      ...this.additionalResponses,
    };

    const { ratings, bestMatchIndex } = this.stringSimilarity(message, Object.keys(responses));

    const bestResponseRating = ratings[bestMatchIndex].rating;
    if (bestResponseRating <= 0.3) {
      return this.unsuccessfulResponse;
    }

    const bestResponseKey = ratings[bestMatchIndex].target;
    const response = responses[bestResponseKey];

    if (typeof response === 'function') {
      return response();
    } else {
      return response;
    }
  },

  getResponseAsync: function (message) {
    return new Promise((resolve) => {
      // Simule un délai de réponse du chatbot.
      setTimeout(() => {
        resolve(this.getResponse(message));
      }, 1000);
    });
  },

  compareTwoStrings: function (first, second) {
    first = first.replace(/\s+/g, '');
    second = second.replace(/\s+/g, '');

    if (first === second) return 1;
    if (first.length < 2 || second.length < 2) return 0;

    let firstBigrams = new Map();
    for (let i = 0; i < first.length - 1; i++) {
      const bigram = first.substring(i, i + 2);
      const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;
      firstBigrams.set(bigram, count);
    }

    let intersectionSize = 0;
    for (let i = 0; i < second.length - 1; i++) {
      const bigram = second.substring(i, i + 2);
      const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;
      if (count > 0) {
        firstBigrams.set(bigram, count - 1);
        intersectionSize++;
      }
    }

    return (2.0 * intersectionSize) / (first.length + second.length - 2);
  },

  stringSimilarity: function (mainString, targetStrings) {
    const ratings = [];
    let bestMatchIndex = 0;

    for (let i = 0; i < targetStrings.length; i++) {
      const currentTargetString = targetStrings[i];
      const currentRating = this.compareTwoStrings(mainString, currentTargetString);
      ratings.push({ target: currentTargetString, rating: currentRating });
      if (currentRating > ratings[bestMatchIndex].rating) {
        bestMatchIndex = i;
      }
    }

    const bestMatch = ratings[bestMatchIndex];

    return { ratings: ratings, bestMatch: bestMatch, bestMatchIndex: bestMatchIndex };
  },
};

export default Chatbot;
