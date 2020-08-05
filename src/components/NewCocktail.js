import React from 'react';
import { connect } from 'react-redux';
import { handleAddCocktail, handleDeleteCocktail } from '../actions/cocktails';

class NewCocktail extends React.Component {
  state = {
    newCocktail: {
      name: '',
    },
  };

  onSumbmit = (e) => {
    e.preventDefault();
    const { dispatch, authedUser } = this.props;
    const { newCocktail } = this.state;
    dispatch(handleAddCocktail({ ...newCocktail, author: authedUser }));
    this.setState({
      newCocktail: {
        name: '',
      },
    });
  };

  onDelete = (id) => {
    const { dispatch } = this.props;
    dispatch(handleDeleteCocktail(id));
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
              return (
                <li key={c}>
                  {cocktails[c].name}
                  <span onClick={() => this.onDelete(c)}>X</span>
                </li>
              );
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
