import React, { ChangeEvent, Component } from 'react';
import '../../styles/components/input.scss';

type Props = {
  onChange?: (value: any) => void;
  value?: any;
  label: string;
  error?: string;
  type?: string;
  disabled?: boolean;
  loading?: boolean;
  containerStyle?: object;
};

class GenericInput extends Component<Props> {
  state: { focused: boolean; value: string | null };

  constructor(props: Props) {
    super(props);
    this.state = {
      focused: false,
      value: !props.value ? '' : null,
    };
  }

  onFocus = () => {
    this.setState({ focused: true });
  };

  onBlur = () => {
    this.setState({ focused: false });
  };

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    } else {
      this.setState({ value: e.target.value });
    }
  };

  render() {
    const { label, value, type, error, containerStyle } = this.props;
    const { focused } = this.state;
    const hasError = !!error;
    return (
      <div className="input-container" style={containerStyle}>
        <label
          htmlFor="generic-input"
          className={`input-label${focused || value ? ' active' : ''}${
            hasError ? ' error' : ''
          }`}
        >
          {label}
        </label>
        <input
          id="generic-input"
          type={type}
          className={`input${hasError ? ' error' : ''}`}
          value={value || this.state.value}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        {error && <div className="input-error">{error}</div>}
      </div>
    );
  }
}

export default GenericInput;
