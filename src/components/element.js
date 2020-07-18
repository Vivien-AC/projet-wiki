import React, { Component } from "react";

class Element extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
      removed: false,
      modifiying: false,
      textInputValue: this.props.titre,
      textInputValue2: this.props.contenu,
      textInputValue3: this.props.tags,
      textInputValue4: this.props.version,
      select: this.props.category
    };
  }

  setHover() {
    this.setState({ isHover: !this.state.isHover });
  }

  removeItem() {
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest()
    // open the request with the verb and the url
    xhr.open('DELETE', 'http://localhost:8000/article/' + this.props.id)
    // send the request
    xhr.send()
    //this.setState({ removed: !this.state.removed })
  }

  apparaitreModif() {
    this.setState({ modifiying: true });
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

  modifie(e) {
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
      xhr.open('PUT', 'http://localhost:8000/article/' + this.props.id)
      // send the request
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(object))
      this.setState({ modifiying: false });
    }
    e.preventDefault();
  }


  render() {
    let span;

    const lineThrought = {
      textDecoration: 'line-through',
    };


    span = <div><a id="title">{this.props.titre}</a><br></br><br></br><a id="contenu">"{this.props.contenu}"</a><br></br><br></br>categorie : {this.props.category}<br></br>tags : {this.props.tags}<br></br>version : {this.props.version}</div>



    let border

    switch (this.props.category) {
      case 'commerce':
        border = {
          borderLeft: '11px solid red',
        }
        break;
      case 'cuisine':
        border = {
          borderLeft: '11px solid green',
        }
        break;
      case 'politique':
        border = {
          borderLeft: '11px solid blue',
        }
        break;
      case 'economie':
        border = {
          borderLeft: '11px solid grey',
        }
        break;
      case 'religion':
        border = {
          borderLeft: '11px solid yellow',
        }
        break;
    }
    return (

      !this.state.removed &&
      <li
        style={border}
        onMouseEnter={e => this.setHover(e)}
        onMouseLeave={e => this.setHover(e)}
      >

        {span}


        {this.state.modifiying === true &&

          <div id="modifie">
            <form onSubmit={e => this.modifie(e)}>
              Titre
                          <input value={this.state.textInputValue} type='text'
                onChange={e => this.handleChangeInput(e)}
              />

                        Contenu
                          <textarea value={this.state.textInputValue2} type='text'
                onChange={e => this.handleChangeInput2(e)}
              ></textarea>

                        Catégorie
                        <select value={this.state.select} onChange={e => this.handleChange(e)}>
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
              <button type="submit">Enregistrer</button>
            </form>
          </div>

        }

        {this.state.isHover === true && <button className='modifieBtn' onClick={e => this.apparaitreModif(e)}> Modifier </button>}
        {this.state.isHover === true && <button className='removeBtn' onClick={e => this.removeItem(e)}> Supprimer </button>}

      </li>
    )
  }
}

export default Element;
