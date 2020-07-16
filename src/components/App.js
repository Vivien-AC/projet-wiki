import React, { Component } from 'react';
import List from './list'
// import DataList from '../data/list.json'
import "../App.css";
import '../index.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputValue: '',
      textInputValue2: '',
      textInputValue3: '',
      textInputValue4: '',
      error: null,
      isLoaded: false,
      data: [],
      select: 'choisir',
      recherche_cat: 'choisir'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate() {
    this.fetchArticles();
  }

  fetchArticles() {
    if (this.state.recherche_cat != 'choisir') {
      fetch('http://localhost:8000/articlebycat/' + this.state.recherche_cat)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              data: result
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    } else {
      fetch('http://localhost:8000/article')
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              data: result
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

  }

  handleRechercheCat = (e) => {
    this.setState({ recherche_cat: e.target.value });
    this.fetchArticles()
  }

  handleChangeInput = (e) => {
    this.setState({
      textInputValue: e.target.value
    })
  }

  handleChangeInput2 = (e) => {
    this.setState({
      textInputValue2: e.target.value
    })
  }
  handleChangeInput3 = (e) => {
    this.setState({
      textInputValue3: e.target.value
    })
  }
  handleChangeInput4 = (e) => {
    this.setState({
      textInputValue4: e.target.value
    })
  }

  handleChange(event) {
    this.setState({ select: event.target.value });
  }

  addToList(e) {

    if (this.state.textInputValue !== '') {
      const object = {
        titre: this.state.textInputValue,
        contenu: this.state.textInputValue2,
        categorie: this.state.select,
        tags: this.state.textInputValue3,
        version: this.state.textInputValue4,
        state: 'todo',
      };
      // create a new XMLHttpRequest
      var xhr = new XMLHttpRequest()
      // open the request with the verb and the url
      xhr.open('POST', 'http://localhost:8000/article/')
      // send the request
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(object))
      this.setState({
        data: [...this.state.data, object],
        textInputValue: '',
        textInputValue2: '',
        textInputValue3: '',
        textInputValue4: '',
        valueSelect: ''
      })
    }
    e.preventDefault();
  }

  render() {
    const { error, isLoaded, data } = this.state;

    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div className='App'>
          <h1 className="title">Liste des articles</h1>
          <div className="recherche_cat">
            Affichage par catégorie : <select value={this.state.recherche_cat} onChange={e => this.handleRechercheCat(e)}>
            <option value="choisir">Choisir votre catégorie</option>
            <option value="politique">Politique</option>
            <option value="commerce">Commerce</option>
            <option value="cuisine">Cuisine</option>
            <option value="economie">Economie</option>
            <option value="religion">Religion</option>
          </select>
          </div>

        <List items={data} />

        <h1 className="title">Ajouter un article</h1>
        <div id="add">
          <form onSubmit={e => this.addToList(e)}>
            Titre
                          <input value={this.state.textInputValue} type='text'
              onChange={e => this.handleChangeInput(e)}
            />

                        Contenu
                          <textarea value={this.state.textInputValue2} type='text'
              onChange={e => this.handleChangeInput2(e)}
            ></textarea>

                        Catégorie
                        <select value={this.state.select} onChange={this.handleChange}>
              <option value="">Choisir votre catégorie</option>
              <option value="politique">Politique</option>
              <option value="commerce">Commerce</option>
              <option value="cuisine">Cuisine</option>
              <option value="economie">Economie</option>
              <option value="religion">Religion</option>
            </select>

                        Tags
                        <input value={this.state.textInputValue3} type='text'
              onChange={e => this.handleChangeInput3(e)}
            />

                        Version
                        <input value={this.state.textInputValue4} type='text'
              onChange={e => this.handleChangeInput4(e)}
            />
            <button type="submit">Ajouter</button>
          </form>
        </div>
        </div >
      );
    }
  }
}


export default App;

/* <List items={DataList.map((dataListDetail, index) => { return dataListDetail.name})}/> */