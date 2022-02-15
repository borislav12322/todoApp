import React, { ReactElement } from 'react';
import './loadingComponent.css';

const LoadingComponent = (): ReactElement => (
  <div className="loadingContainer">
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default LoadingComponent;
