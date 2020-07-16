import React, { Component } from "react";
import Element from "./element";

class List extends Component {
  render() {
    return (
      <div>        
        <ul>
          {
            this.props.items.map((item, index) => 
            <Element titre={item.titre} contenu={item.contenu} category={item.categorie} tags={item.tags} version={item.version}  id={item._id} />
            )
          }
        </ul>
      </div>
    );
  }
}

export default List;
