import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SearchStyles = styled.div`
  position: relative;
  z-index: 1000;
  width: 100%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18);
  color: rgba(0, 0, 0, 0.73);

  input {
    width: 100%;
    border: none;
    color: rgba(0, 0, 0, 0.73);
    padding: 10px 15px;
    box-sizing: border-box;
    outline: none;
  }

  ul {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18);
    position: absolute;
    list-style: none;
    text-align: left;
    margin: 0;
    padding: 0;
    width: 100%;
    background-color: white;
    border-top: 1px solid grey;
  }

  a {
    padding: 10px 15px;
    cursor: pointer;
    display: block;

    &:hover {
      text-decoration: underline;
    }
  }
`;

class AutocompleteSearch extends React.Component {
  state = {
    input: '',
    // TODO: this value should be used when focus is not focused???
    searchHidden: true,
    suggestions: [],
  };

  handleInput = (e) => {
    const { value } = e.target;
    if (value !== '') {
      this.setState({
        input: value,
      });
    } else {
      this.setState({ input: value });
    }
    this.updateSuggestions(value);
  };

  updateSuggestions = (inputVal) => {
    if (inputVal !== '' && inputVal !== ' ') {
      // TODO: change to API request for huge number of cocktails
      const APIreturn = Object.values(this.props.cocktails).filter((c) =>
        c.name.toLowerCase().includes(inputVal.toLowerCase())
      );
      const updatedSuggestions = Object.values(APIreturn)
        .sort((a, b) => a > b)
        .slice(0, 5);
      this.setState({ suggestions: updatedSuggestions });
    } else {
      this.setState({ suggestions: [] });
    }
  };

  handleSugestionClick = () => {
    this.setState({ input: '', suggestions: [] });
  };

  render() {
    const displaySuggestions = this.state.suggestions;

    return (
      <SearchStyles>
        <input
          value={this.state.input}
          onChange={this.handleInput}
          type='text'
          placeholder='Input cocktail name...'
        />
        {!this.state.suggestions.length !== 0 ? (
          <ul>
            {displaySuggestions.map((s) => (
              <Link
                key={`sug-${s.id}`}
                onClick={this.handleSugestionClick}
                to={`/cocktails/${s.id}`}
              >
                {s.name}
              </Link>
            ))}
          </ul>
        ) : null}
      </SearchStyles>
    );
  }
}

const mapStateToProps = ({ cocktails }) => ({ cocktails });
export default connect(mapStateToProps)(AutocompleteSearch);
