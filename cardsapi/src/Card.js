import react, { Component } from "react";
import "./card.css";
class Card extends Component {
  constructor(props) {
    super(props);
    let angle = Math.random() * 90 - 45;
    let xPos = Math.random() * 40 - 20;
    let yPos = Math.random() * 40 - 20;
    this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
  }
  render() {
    return (
      <img
        className="card"
        src={this.props.image}
        alt={this.props.name}
        key={this.props.key}
        style={{ transform: this._transform }}
      />
    );
  }
}

export default Card;
