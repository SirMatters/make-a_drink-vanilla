import React from 'react';
import { connect } from 'react-redux';
import { handleAddCocktail } from '../actions/cocktails';

class NewCocktail extends React.Component {
  state = {
    newCocktail: {
      name: '',
      // FIXME: exclude hardcoded author
      author: 'u1',
    },
  };

  onSumbmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { newCocktail } = this.state;
    console.log(newCocktail);
    dispatch(handleAddCocktail(newCocktail));
  };

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState(() => ({
      newCocktail: {
        ...this.state.newCocktail,
        [name]: value,
      },
    }));
  };

  render() {
    const { name } = this.state.newCocktail;
    const { cocktails } = this.props;

    return (
      <div>
        <div>
          <ul>
            {Object.keys(cocktails).map((c) => {
              return <li key={c}>{cocktails[c].name}</li>;
            })}
          </ul>
        </div>
        <form onSubmit={this.onSumbmit}>
          <input value={name} onChange={this.onInputChange} name='name' />
          <button>Add Cocktail</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(NewCocktail);
