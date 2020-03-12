import React from 'react';
import '../../styles/components/loading-dots.scss';

type Props = {
  dotColor?: string;
};

const LoadingDots = (props: Props) => (
  <div className="lds-ellipsis">
    {Array.from(Array(4)).map((i, idx) => (
      <div key={idx} style={{ background: props.dotColor }} />
    ))}
  </div>
);

export default LoadingDots;
