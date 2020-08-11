import React from 'react';
import { connect } from 'react-redux';
import { handleGetCocktails } from '../actions/cocktails';
import { authenticateUser } from '../actions/authedUser';
import Dashboard from './Dashboard';
import NewCocktail from './NewCocktail';
import Header from './Header';

class App extends React.Component {
  componentDidMount() {
    // FIXME: fix user
    this.props.dispatch(authenticateUser('placeholder'));
    this.props.dispatch(handleGetCocktails());
  }

  render() {
    return (
      <div className='app'>
        {this.props.authedUser ? (
          <div>
            <Header />
            <div className='container'>
              {Object.keys(this.props.cocktails).length !== 0 && (
                <NewCocktail />
              )}
            </div>
          </div>
        ) : (
          // TODO: provide login page
          <div>Please, auth</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(App);
