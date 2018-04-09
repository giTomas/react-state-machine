import React from 'react';
import styled from 'styled-components';


const Form = styled.form`
  margin-bottom: 1rem;
`;

const Input = styled.input`

`;

const Buttons = styled.div`
  text-align: center;
`;

const Button = styled.button`

`;

const RenderForm = ({
  handleSubmit,
  handleChangeQuery,
  transition,
  state}) => {
  const SearchText = {
    loading: 'Searching...',
    error: 'Try search again',
    start: 'Search'
  }[state] || 'Search';

  return (
    <Form onSubmit={e => handleSubmit(e)} state={state}>
      <Input
        type="search"
        // value={state.query}
        onChange={e => handleChangeQuery(e.target.value)}
        placeholder="Search Flickr for photos..."
        disabled={state === 'loading'}
      />
      <Buttons>
        <Button
          type="submit"
          disabled={state === 'loading'}>
          {SearchText}
        </Button>
      {state === 'loading' &&
        <Button
          type="button"
          onClick={() => transition({ type: 'CANCEL_SEARCH'})}>
            Cancel
          </Button>}
      </Buttons>
    </Form>
  )
}

export default RenderForm;
