import React from 'react';
import { connect } from 'react-redux';
import {
  handleAddCocktail,
  handleDeleteCocktail,
  handleEditCocktail,
} from '../actions/cocktails';
import { removeNumberedObjectItem } from '../utils/utils';

class NewCocktail extends React.Component {
  state = {
    newCocktail: {
      name: '',
      ingredients: [],
      steps: { 1: '' },
      description: '',
      image: '',
    },
  };

  componentDidMount() {
    if (this.props.id) {
      const cocktail = this.props.cocktail;
      this.setState({
        newCocktail: cocktail,
      });
    }
  }

  onSumbmit = (e) => {
    e.preventDefault();
    const { dispatch, authedUser, id } = this.props;
    const { newCocktail } = this.state;
    if (!id) {
      dispatch(handleAddCocktail({ ...newCocktail, author: authedUser }));
      this.setState({
        newCocktail: {
          name: '',
          ingredients: [],
          steps: { 1: '' },
          description: '',
          image: '',
        },
      });
    } else {
      dispatch(handleEditCocktail(newCocktail));
    }
  };

  onDelete = (id) => {
    const { dispatch } = this.props;
    dispatch(handleDeleteCocktail(id));
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState(() => ({
      newCocktail: {
        ...this.state.newCocktail,
        [name]: value,
      },
    }));
  };

  handleStepChange = (e) => {
    const { name, value } = e.target;
    const { steps } = this.state.newCocktail;
    this.setState({
      newCocktail: {
        ...this.state.newCocktail,
        steps: {
          ...steps,
          [name.split('-')[1]]: value,
        },
      },
    });
  };

  handleNewStep = () => {
    const { steps } = this.state.newCocktail;
    const stepIds = Object.keys(steps);
    const nextId = parseInt(stepIds[stepIds.length - 1]) + 1;
    this.setState({
      newCocktail: {
        ...this.state.newCocktail,
        steps: {
          ...steps,
          [nextId]: '',
        },
      },
    });
  };

  handleDeleteStep = (s) => {
    const steps = removeNumberedObjectItem(this.state.newCocktail.steps, s);
    this.setState({
      newCocktail: {
        ...this.state.newCocktail,
        steps: {
          ...steps,
        },
      },
    });
  };

  render() {
    const { name, description, steps, image } = this.state.newCocktail;
    return (
      <div className='new-cocktail'>
        <h1 className='new-cocktail__title'>Add a new awesome cocktail!</h1>
        <form className='new-cocktail__form' onSubmit={this.onSumbmit}>
          <input
            className='new-cocktail__name'
            value={name}
            onChange={this.handleInputChange}
            name='name'
            placeholder='Be creative...'
          />
          <div className='new-cocktail__img'>
            <input
              placeholder='Provide image link'
              value={image}
              name='image'
              onChange={this.handleInputChange}
            />
          </div>
          <textarea
            className='new-cocktail__description'
            name='description'
            value={description}
            onChange={this.handleInputChange}
            placeholder='Awesomeness starts here...'
          />
          <div className='new-cocktail__steps-container'>
            {Object.keys(steps).map((s) => (
              <li className='new-cocktail__step' key={`step-${s}`}>
                <span className='step__number'>{s}</span>
                <textarea
                  value={steps[s]}
                  name={`step-${s}`}
                  onChange={this.handleStepChange}
                />
                <span
                  onClick={() => {
                    this.handleDeleteStep(s);
                  }}
                >
                  X
                </span>
              </li>
            ))}
            <button type='button' onClick={this.handleNewStep}>
              +
            </button>
          </div>
          <button
            className='new-coctail__submit'
            disabled={name === ''}
            type='submit'
          >
            Add Cocktail
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps;
  if (id) {
    return {
      id,
      cocktail: state.cocktails[id],
    };
  }
  return ownProps;
};
export default connect(mapStateToProps)(NewCocktail);
