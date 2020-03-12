import React, { Component, FormEvent } from 'react';
import { RootState } from '../redux/reducers';
import { fetchPageSource } from '../redux/actions/actions';
import { connect, ConnectedProps } from 'react-redux';
import { AnalysisState } from '../redux/reducers/analysis';
import GenericInput from '../components/common/input';
import GenericButton from '../components/common/button';
import '../styles/routes/analysis.scss';
import { validateUrl } from '../utils/string';

const mapState = (state: RootState) => ({
  analysisState: state.analysis,
});

const mapDispatch = {
  fetchPageSource,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

type State = {
  url: string;
};

class Analysis extends Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      url: props.analysisState.url || 'https://basarat.gitbook.io/typescript/',
    };
  }
  onUrlChange = (value: string) => {
    this.setState({ url: value });
  };
  onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.fetchPageSource(this.state.url);
  };
  renderContent = ({
    status,
    longestPath,
    mostCommonTag,
    uniqueTags,
  }: AnalysisState) => {
    if (status.loading) {
      return null;
    } else if (status.state === 'success') {
      return (
        <div className="analysis-insights-content">
          <div className="analysis-insights-row">
            <div className="analysis-insights-row-title">Most common tag:</div>
            <div className="analysis-insights-row-value">{mostCommonTag}</div>
          </div>
          <div className="analysis-insights-row">
            <div className="analysis-insights-row-title">Longest path:</div>
            <div className="analysis-insights-row-value">
              Depth: {longestPath.level}, Element count: {longestPath.count}
            </div>
          </div>
          <div className="analysis-insights-row">
            <div className="analysis-insights-row-title">Unique entries:</div>
            <div className="analysis-insights-row-value">
              <table>
                <thead>
                  <tr>
                    <th align="left" />
                    <th align="left">Name</th>
                    <th align="left">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(uniqueTags)
                    .sort((a, b) => b[1] - a[1])
                    .map(([tag, value], idx) => (
                      <tr key={tag}>
                        <td align="right">{idx + 1}.</td>
                        <td>{`<${tag.toLowerCase()}>`}</td>
                        <td align="right">{value}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    } else if (status.state === 'error') {
      return (
        <div className="analysis-insights-content">
          <div className="analysis-error-message">{status.message}</div>
        </div>
      );
    }
    return null;
  };
  render() {
    const { analysisState } = this.props;
    const { url } = this.state;
    return (
      <div className="analysis-page-container">
        <form className="analysis-submit-form" onSubmit={this.onSubmitForm}>
          <GenericInput
            label={'URL'}
            onChange={this.onUrlChange}
            value={url}
            containerStyle={{ flex: 1 }}
          />
          <GenericButton
            type="submit"
            disabled={url.length === 0 || !validateUrl(url)}
            loading={analysisState.status.loading}
            buttonStyle={{ marginLeft: 20 }}
          >
            Analyze
          </GenericButton>
        </form>
        <div className="analysis-insights-container">
          {this.renderContent(analysisState)}
        </div>
      </div>
    );
  }
}

export default connect(mapState, mapDispatch)(Analysis);
