import React, { PureComponent } from 'react';
import galleryMachine from './sm/transitions';
import fetchJsonp from 'fetch-jsonp';
// import Api from './api/api';
import RenderForm from './styled/form';
import RenderGallery from './styled/gallery';
import RenderPhoto from './styled/photo';

// console.log(galleryMachine)

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      gallery: 'start',
      query: '',
      items: []
    }

    this.transition = this.transition.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeQuery = this.handleChangeQuery.bind(this)
    this.transition = this.transition.bind(this)
  }

  transition(action) {
    const currentGalleryState = this.state.gallery;
    console.log(`action: ${action.type}`)
    console.log(`current state: ${currentGalleryState}`)
    console.log(galleryMachine['loading']['SEARCH_SUCCESS'])
    console.log('machine :' + galleryMachine)
    const nextGalleryState = galleryMachine[currentGalleryState][action.type];

    console.log(`next state: ${nextGalleryState}`)

    if (nextGalleryState) {
      const nextState = this.command(nextGalleryState, action)

      this.setState({
        gallery: nextGalleryState,
        ...nextState
      });
    }
  }

  command(nextState, action) {
    console.log(`command-nexState: ${nextState}`)
    console.log(action)
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

  handleSubmit(e) {
    e.persist();
    e.preventDefault()
    console.log(this.state.query)
    this.transition({type: 'SEARCH', query: this.state.query});
  }

  search(query) {
    const encodeQuery = encodeURIComponent(query);
    setTimeout(() => {
      fetchJsonp(`https://api.flickr.com/services/feeds/photos_public.gne?lang=en-us&format=json&tags=${encodeQuery}`,
        {jsonpCallback: 'jsoncallback'})
        .then(res => res.json())
        .then((data) => {
          // console.log(data.items);
          this.transition({type: 'SEARCH_SUCCESS', items: data.items})})
        .catch((data) => { this.transition({type: 'SEARCH_FAULURE'})});
    }, 1000);
  }

  handleChangeQuery(value) {
    this.setState({query: value})
  }

  render() {
    const galleryState = this.state;
    // console.log(this.state)
    return (
      <div className="App">
        <RenderForm
          handleSubmit={this.handleSubmit}
          handleChangeQuery={this.handleChangeQuery}
          transition={this.transition}
          state={this.state} />
        <RenderGallery transition={this.transition} state={galleryState} />
      <RenderPhoto transition={this.transition} state={galleryState}  />
      </div>
    );
  }
}

export default App;
