function CardList() {
    this.cards = [];
    this.addCard = function (newCard) {
        this.cards.push(newCard);
    };
    this.length = function () {
        return this.cards.length;
    };
    this.getCard = function (index) {
        return this.cards[index];
    };
    this.replaceCard = function (index, card) {
        this.cards[index] = card;
    };
}
//# sourceMappingURL=listCards.js.map