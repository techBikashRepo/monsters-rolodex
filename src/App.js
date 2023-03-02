import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor({ props }) {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users").then((response) =>
      response.json().then((user) =>
        this.setState(
          () => {
            return {
              monsters: user,
            };
          },
          () => {
            console.log(this.state.monsters);
          }
        )
      )
    );
  }

  onSearchChange = (event) => {
    console.log(event.target.value);
    const searchField = event.target.value.toLowerCase();

    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });
    return (
      <div className="App">
        <h1>Monster Rolodex</h1>
        <input
          className="search-box"
          type="search"
          placeholder="Search Monsters"
          onChange={onSearchChange}
        />
        {filteredMonsters.map((monster) => {
          return (
            <div key={monster.id}>
              <h3>{monster.name}</h3>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
