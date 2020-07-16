import React, { Component } from "react";

class Element extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
      removed: false
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
    this.setState({ removed: !this.state.removed })
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

        {this.state.isHover === true && <button className='removeBtn' onClick={e => this.removeItem(e)}> Supprimer </button>}

      </li>
    )
  }
}

export default Element;
