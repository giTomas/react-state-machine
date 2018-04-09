const galleryMachine = {
  start: {
    SEARCH: 'loading'
  },
  loading: {
    SEARCH_SUCCESS: 'gallery',
    SEARCH_FAILURE: 'error',
    CANCEL_SEARCH: 'gallery',
  },
  error: {
    SEARCH: 'loading'
  },
  gallery: {
    SEARCH: 'loading',
    SELECT_PHOTO: 'photo'
  },
  photo: {
    EXIT_PHOTO: 'gallery'
  }
};

export default galleryMachine;
