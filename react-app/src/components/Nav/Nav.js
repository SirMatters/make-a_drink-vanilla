import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AutocompleteSearch from './AutocompleteSearch';

const NavStyles = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  max-height: 2rem;
  justify-content: space-between;
  align-items: center;

  .header-controls {
    align-self: left;
  }

  .user-controls {
    max-height: 100%;
    height: 100%;
    display: flex;
    flex: 0 0 15rem;
    align-items: center;
    justify-content: space-between;

    .avatar-container {
      max-height: 100%;
    }

    .user-avatar {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      border-radius: 50%;
      max-height: 2rem;
    }
  }
  .search {
    width: 80rem;
    max-height: 100%;
  }
`;
const Logo = styled.h1`
  font-size: 2rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);

  a {
    padding: 0.5rem 1rem;
    background: lightblue;
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
`;

const Nav = () => {
  const authedUser = useSelector((state) => state.authedUser);

  const onLogout = () => {
    alert('Log out click');
  };

  return (
    <NavStyles>
      <Logo>
        <Link to='/' className='header__logo'>
          M-A-D
        </Link>
      </Logo>
      <div className='header-controls'>
        <Link to='/add'>New Cocktail</Link>
      </div>
      <div className='search'>
        <AutocompleteSearch />
      </div>
      <div className='user-controls'>
        <div className='header__user-info'>
          {`${authedUser.firstName} ${authedUser.lastName}`}
        </div>
        <div className='avatar-container'>
          <img
            className='user-avatar'
            //FIXME: replace avatar template
            src='https://www.vexels.com/media/users/3/145908/raw/52eabf633ca6414e60a7677b0b917d92.jpg'
          />
        </div>
        <div className='header__user-logout' onClick={onLogout}>
          Logout
        </div>
      </div>
    </NavStyles>
  );
};

export default Nav;
