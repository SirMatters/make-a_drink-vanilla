import React from 'react';
import { connect } from 'react-redux';
import {
  handleAddCocktail,
  handleDeleteCocktail,
  handleEditCocktail,
} from '../../actions/cocktails';
import { removeNumberedObjectItem } from '../../utils/utils';
import { ImageUpload, ImageDisplay } from './ImageUpload';
import StepInput from './StepInput';

class NewCocktail extends React.Component {
  state = {
    newCocktail: {
      name: '',
      ingredients: [],
      steps: { 1: { text: '', imgUrls: { large: '' } } },
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

  handleMainImageSelect = (img) => {
    this.setState((prevState) => ({
      ...prevState,
      newCocktail: {
        ...prevState.newCocktail,
        image: img,
      },
    }));
  };

  onSumbmit = (e) => {
    e.preventDefault();
    const { dispatch, authedUser, id } = this.props;
    const { newCocktail } = this.state;
    if (!id) {
      dispatch(handleAddCocktail({ ...newCocktail, author: authedUser.id }));
      this.setState({
        newCocktail: {
          name: '',
          ingredients: [],
          steps: { 1: { text: '', imgUrls: { large: '' } } },
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

  handleStepTextChange = (e) => {
    const { name, value } = e.target;
    const id = name.split('-')[1];
    const { steps } = this.state.newCocktail;
    this.setState({
      newCocktail: {
        ...this.state.newCocktail,
        steps: {
          ...steps,
          [id]: {
            text: value,
            imgUrls: this.state.newCocktail.steps[id].imgUrls,
          },
        },
      },
    });
  };
  handleStepImgChange = (id, imgUrl) => {
    this.setState((prevState) => ({
      ...prevState,
      newCocktail: {
        ...prevState.newCocktail,
        steps: {
          ...prevState.newCocktail.steps,
          [id]: {
            text: prevState.newCocktail.steps[id].text,
            imgUrls: {
              large: imgUrl,
            },
          },
        },
      },
    }));
  };

  handleNewStep = () => {
    const { steps } = this.state.newCocktail;
    const stepIds = Object.keys(steps);
    const nextId = parseInt(stepIds[stepIds.length - 1]) + 1 || 1;
    this.setState({
      newCocktail: {
        ...this.state.newCocktail,
        steps: {
          ...steps,
          [nextId]: {
            text: '',
            imgUrls: {
              large: '',
            },
          },
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
    const { name, description, steps } = this.state.newCocktail;
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
          {this.state.newCocktail.image === '' ? (
            <ImageUpload onImageSelect={this.handleMainImageSelect} />
          ) : (
            <ImageDisplay
              onImageSelect={this.handleMainImageSelect}
              image={this.state.newCocktail.image}
            />
          )}

          <textarea
            className='new-cocktail__description'
            name='description'
            value={description}
            onChange={this.handleInputChange}
            placeholder='Awesomeness starts here...'
          />
          <div className='new-cocktail__steps-container'>
            {Object.keys(steps).map((s) => (
              <StepInput
                key={s}
                num={s}
                onStepTextChange={this.handleStepTextChange}
                onStepImgChange={this.handleStepImgChange}
                onStepDelete={this.handleDeleteStep}
                text={steps[s].text}
                img={steps[s].imgUrls.large}
              />
            ))}
            <button type='button' onClick={this.handleNewStep}>
              +
            </button>
          </div>
          <button
            className='new-cocktail__submit'
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
  const { authedUser } = state;
  if (id) {
    return {
      id,
      cocktail: state.cocktails[id],
      authedUser,
    };
  }
  return { authedUser, ...ownProps };
};
export default connect(mapStateToProps)(NewCocktail);
