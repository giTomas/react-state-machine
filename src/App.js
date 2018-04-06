import React, { PureComponent } from 'react';
import galleryMachine from './sm/transitions';
import Api from './api/api'

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
        break;
      case 'gallery':
        break;
      case 'photo':
        break;
      default:
        break;
    }
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
