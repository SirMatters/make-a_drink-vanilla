import React from 'react';
import { connect } from 'react-redux';
import { LoadingBar } from 'react-redux-loading-bar';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  onSearch = () => {};
  onLogout = () => {
    alert('Log out click');
  };

  render() {
    const { searchString, onSearch } = this.props;

    return (
      <div className='header'>
        <Link to='/' className='header__logo'>
          M-A-D
        </Link>
        <div className='header__controls'>
          <Link to='/add'>New Cocktail</Link>
        </div>
        <div className='header__search'>
          <input
            onChange={this.onSearch}
            value={''}
            placeholder='Find your cocktail...'
          />
        </div>
        <div className='header__user-controls'>
          <div className='header__user-info'></div>
          <div className='header__user-avatar-container'>
            <img
              className='header__user-avatar'
              //FIXME: replace avatar template
              src='https://www.vexels.com/media/users/3/145908/raw/52eabf633ca6414e60a7677b0b917d92.jpg'
            />
          </div>
          <div className='header__user-logout' onClick={this.onLogout}>
            OUT
          </div>
        </div>
        <LoadingBar />
      </div>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Header);
