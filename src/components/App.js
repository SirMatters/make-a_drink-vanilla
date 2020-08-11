import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import NewCocktail from './NewCocktail';
import Header from './Header';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading-bar';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {this.props.authedUser ? (
            <div>
              <Header />
              <div className='container'>
                <Switch>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/add' component={NewCocktail} />
                </Switch>
              </div>
            </div>
          ) : // TODO: provide login page
          null}
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(App);
