import React, { PureComponent } from 'react';
import galleryMachine from './sm/transitions';
import fetchJson from 'fetch-jsonp';
import Api from './api/api';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      gallery: 'start',
      query: '',
      items: []
    }
  }

  transition(action) {
    const currentGalleryState = this.state.gallery;
    const nextGalleryState = galleryMachine[currentGalleryState][action.type];

    if (nextGalleryState) {
      const nextState = this.command(nextGalleryState, action)

      this.setState({
        gallery: nextGalleryState,
        ...nextState
      });
    }
  }

  command(nextState, action) {
    switch(nextState) {
      case 'loading':
        this.search(action.query)
        break;
      case 'gallery':
        if (action.items) {
          return {items: action.items}
        }
        break;
      case 'photo':
        if (action.item) {
          return {photo: action.item}
        }
        break;
      default:
        break;
    }
  }

  search(query) {

  }

  handleSubmit(e) {
    e.persist();
    e.preventDefault()
    this.transition({type: 'SEARCH', query: this.state.query});
  }



  render() {
    return (
      <div className="App">
        <h1>State machine</h1>
      </div>
    );
  }
}

export default App;
