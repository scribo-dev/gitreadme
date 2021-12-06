import React from 'react';
// import styled from 'styled-components';

// const ProgressContainer = styled.div`
//   position: fixed;
//   width: 100%;
//   height: 3px;
//   top: 0px;
//   left: 0;
//   //   background: ${props => props.theme.loadingContainer};
//   z-index: 100;
// `;

// const ProgressIndicator = styled.div`
//   position: absolute;
//   width: ${props => `${props.porcentage}%`};
//   height: 3px;
//   left: 0;
//   background: rgba(255, 255, 255, 0.5);
//   animation-duration: 2.5s;
//   animation-name: slidein;
//   animation-iteration-count: infinite;
//   animation-timing-function: ease-in-out;
//   @keyframes slidein {
//     from {
//       //   opacity: 0.5;
//       left: -${props => `${props.porcentage}%`};
//     }

//     to {
//       //   opacity: 1;
//       left: calc(100% + ${props => `${props.porcentage}%`});
//     }
//   }
// `;

const ProgressBar = ({ loading, porcentage = 20 }) => <div></div>;
// (
//   <ProgressContainer>
//     {loading && <ProgressIndicator porcentage={porcentage} />}
//   </ProgressContainer>
// );

export default ProgressBar;
