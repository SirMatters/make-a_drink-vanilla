import React from "react";
import styled from "styled-components"

const SimpleImageStyles = styled.div`
  max-width: 100%;
  max-height: 100%;
  img {
      max-width: 100%;
      height: auto;
      object-fit: cover;
    }
`

const SimpleImage = ({url}) => {
  return (
    <SimpleImageStyles>
      <img src={url} alt={`cocktail main`}/>
    </SimpleImageStyles>
  )

}

export default SimpleImage;