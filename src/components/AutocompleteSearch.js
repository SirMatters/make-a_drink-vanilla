import React from 'react';

class AutocompleteSearch extends React.Component {
  state = {
    input: '',
    searchHidden: true,
  };

  suggestions = ['Alex', 'Alan', 'Aaron', 'Sam', 'Samuel', 'Samantha'];

  handleInput = (e) => {
    const { value } = e.target;
    if (value !== '') {
      this.setState({
        input: value,
        searchHidden: false,
      });
    } else {
      this.setState({ input: value, searchHidden: true });
    }
  };

  handleSugestionClick = (e) => {
    const { innerText } = e.target;
    this.setState({ input: innerText, searchHidden: true });
  };

  render() {
    const displaySuggestions = this.suggestions
      .filter((s) => s.toLowerCase().includes(this.state.input.toLowerCase()))
      .sort((a, b) => a > b);

    return (
      <div className='autocomplete-search'>
        <input
          value={this.state.input}
          onChange={this.handleInput}
          type='text'
        />
        {!this.state.searchHidden ? (
          <ul>
            {displaySuggestions.map((s) => (
              <li key={`sug-${s}`} onClick={this.handleSugestionClick}>
                {s}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}

export default AutocompleteSearch;
