import React, { Component } from "react";
import api from "../../services/api";
import logo from "../../assets/logo2.svg";
import "./styles.css";

export default class Main extends Component {
  state = {
    newBox: "",
    boxes: []
  };

  async componentDidMount() {
    const { data } = await api.get("/boxes");
    this.setState({ boxes: data });
  }

  handleSubmit = async event => {
    event.preventDefault();
    const response = await api.post("/boxes", {
      title: this.state.newBox
    });
    this.props.history.push(`/box/${response.data._id}`);
  };
  handleInputChange = event => {
    this.setState({ newBox: event.target.value });
  };

  handleNavigate = id => {
    this.props.history.push(`/box/${id}`);
  };

  render() {
    //console.log(this.state.boxes);
    return (
      <div id="main-container">
        <form onSubmit={this.handleSubmit}>
          <img src={logo} alt="" />
          <input
            placeholder="Criar um Box"
            value={this.state.newBox}
            onChange={this.handleInputChange}
          />
          <button type="sumit">Criar</button>
        </form>

        <ul>
          {this.state.boxes.map(box => (
            <li key={box._id}>
              <div>
                {box.title}
                <button
                  type="submit"
                  onClick={() => this.handleNavigate(box._id)}
                >
                  Entrar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
