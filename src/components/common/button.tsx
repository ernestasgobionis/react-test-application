import React from 'react';
import LoadingDots from './loading-dots';
import '../../styles/components/button.scss';

type Props = {
  onClick?: () => void;
  children: any;
  disabled?: boolean;
  loading?: boolean;
  buttonStyle?: object;
  type?: 'submit' | 'reset' | 'button';
};

const GenericButton = (props: Props) => {
  const disabled = props.disabled || props.loading;
  return (
    <button
      type={props.type}
      disabled={disabled}
      className={`container${disabled ? ' disabled' : ''}`}
      onClick={props.onClick}
      style={props.buttonStyle}
    >
      {props.loading ? <LoadingDots dotColor="#fff" /> : props.children}
    </button>
  );
};

export default GenericButton;
