import React from 'react';
import styled from 'styled-components';

const UiItems = styled.section`

`;

const UiError = styled.span`

`;

const Image = styled.img`

`;

const RenderGallery = ({state, transition}) => {
  return (
  <UiItems state={state}>
    {state.gallery === 'error'
      ? <UiError>Search Failed</UiError>
      : state.items.map((item, i) => (
        <Image
          src={item.media.m}
          key={item.link}
          // style={'--i': i}
          onClick={() => transition({type: 'SELECT_PHOTO', item})}
        />
      ))
    }
  </UiItems>
)}

export default RenderGallery;
