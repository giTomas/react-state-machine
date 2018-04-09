import React from 'react';
import styled from 'styled-components';

const UiPhotoDetail = styled.section`

`;

const UiPhoto = styled.img`

`;

const RenderPhoto = (state, transition) => {
  if (state !== 'photo') return '';

  return (
    <UiPhotoDetail>
      onClick={() => transition({type: 'EXIT_PHOTO'})}
      <UiPhoto src={state.photo.media.m} />
    </UiPhotoDetail>
  )
}

export default RenderPhoto;
