export const store = {
  debug: true,
  state: {
    message: "jello",
    decks: [
      {
        name: "Javascript",
        totalCards: 57,
        cardsToStudy: 20,
        updatedAt: "2022-15-01",
      },
      {
        name: "Vue",
        totalCards: 100,
        cardsToStudy: 0,
        updatedAt: "2022-20-01",
      },
      {
        name: "Postrgesql",
        totalCards: 35,
        cardsToStudy: 0,
        updatedAt: "2022-06-01",
      },
      {
        name: "C++",
        totalCards: 21,
        cardsToStudy: 21,
        updatedAt: "2022-27-01",
      },
      {
        name: "Javascript",
        totalCards: 57,
        cardsToStudy: 20,
        updatedAt: "2022-15-01",
      },
      // {
      //   name: "Vue",
      //   totalCards: 100,
      //   cardsToStudy: 0,
      //   updatedAt: "2022-20-01",
      // },
      // {
      //   name: "Postrgesql",
      //   totalCards: 35,
      //   cardsToStudy: 0,
      //   updatedAt: "2022-06-01",
      // },
      // {
      //   name: "C++",
      //   totalCards: 21,
      //   cardsToStudy: 21,
      //   updatedAt: "2022-27-01",
      // },
    ],
  },
  setMessageAction(newValue) {
    if (this.debug) console.log("setMessageAction triggered with", newValue);
    this.state.message = newValue;
  },
  clearMessageAction() {
    if (this.debug) console.log("clearMessageAction triggered");
    this.state.message = "";
  },
};
