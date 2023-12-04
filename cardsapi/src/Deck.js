import react, { Component } from "react";
import axios from "axios";
import Card from "./Card";
import "./deck.css";

const API_Base_URL = "https://www.deckofcardsapi.com/api/deck/new/shuffle";
const CardURL = "https://www.deckofcardsapi.com/api/deck/";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    let deck = await axios.get(API_Base_URL);
    this.setState({ deck: deck.data });
  }

  async getCard() {
    try {
      let card = `${CardURL}/${this.state.deck.deck_id}/draw/`;
      let cardRes = await axios.get(card);
      //if (cardRes.data.remaining === 0) {
      //throw new Error("No Card Remaining");
      //}
      if (!cardRes.data.success) {
        throw new Error("No Cards Remaining. Refresh the Page");
      }
      let cardSave = cardRes.data.cards[0];
      this.setState((st) => ({
        drawn: [
          ...st.drawn,
          {
            id: cardSave.code,
            image: cardSave.image,
            name: `${cardSave.value} of ${cardSave.suit} `,
          },
        ],
      }));
    } catch (err) {
      alert(err);
    }
  }
  render() {
    return (
      <div>
        <h1 className="deck-title">Card Dealer</h1>
        <button className="deck-btn" onClick={this.getCard}>
          Get Card
        </button>
        <div className="deck-cardarea">
          {this.state.drawn.map((n) => (
            <Card name={n.name} image={n.image} key={n.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default Deck;
