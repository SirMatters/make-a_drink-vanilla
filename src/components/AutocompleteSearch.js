import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
      <div className='autocomplete-search'>
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
      </div>
    );
  }
}

const mapStateToProps = ({ cocktails }) => ({ cocktails });
export default connect(mapStateToProps)(AutocompleteSearch);
