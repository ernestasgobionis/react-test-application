import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { fetchCurrencies } from '../redux/actions/actions';
import { RootState } from '../redux/reducers';
import CurrenciesList from '../components/currencies/currencies-list';
import { CurrenciesItem } from '../redux/reducers/currencies';

const mapState = (state: RootState) => ({
  currencies: state.currencies,
});

const mapDispatch = {
  fetchCurrencies,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};
type State = {
  sortField: string;
  sortOrder: 'DESC' | 'ASC';
  sortedItems: CurrenciesItem[];
};

class Currencies extends Component<Props> {
  fetchInterval: ReturnType<typeof setInterval>;
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      sortField: 'code',
      sortOrder: 'DESC',
      sortedItems: this.sortItems(props.currencies.items, 'code', 'desc'),
    };
  }

  componentDidMount() {
    this.props.fetchCurrencies();
    this.fetchInterval = setInterval(() => {
      this.props.fetchCurrencies();
    }, 20000);
  }

  componentWillUnmount() {
    clearInterval(this.fetchInterval);
  }

  // For handling item updates
  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.currencies.status.loading &&
      !this.props.currencies.status.loading
    ) {
      this.setState({
        sortedItems: this.sortItems(
          this.props.currencies.items,
          this.state.sortField,
          this.state.sortOrder,
        ),
      });
    }
  }

  sortItems = (
    items: CurrenciesItem[],
    sortField: string,
    sortOrder: string,
  ): CurrenciesItem[] => {
    let sorted: CurrenciesItem[];
    if (sortOrder === 'ASC') {
      sorted = items.sort((a, b) => {
        if (b[sortField] > a[sortField]) {
          return -1;
        } else if (b[sortField] < a[sortField]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      sorted = items.sort((a, b) => {
        if (b[sortField] < a[sortField]) {
          return -1;
        } else if (b[sortField] > a[sortField]) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    return sorted;
  };

  onSortFieldChange = (sortField: string) => {
    const { currencies } = this.props;
    this.setState({
      sortField,
      sortOrder: 'DESC',
      sortedItems: this.sortItems(currencies.items, sortField, 'DESC'),
    });
  };

  onSortOrderChange = () => {
    const { currencies } = this.props;
    this.setState((prevState: State) => {
      const sortOrder = prevState.sortOrder === 'DESC' ? 'ASC' : 'DESC';
      return {
        sortOrder: sortOrder,
        sortedItems: this.sortItems(
          currencies.items,
          this.state.sortField,
          sortOrder,
        ),
      };
    });
  };

  render() {
    const { currencies } = this.props;
    const { sortField, sortOrder, sortedItems } = this.state;
    return (
      <div>
        <CurrenciesList
          items={sortedItems}
          status={currencies.status}
          onSortFieldChange={this.onSortFieldChange}
          onSortOrderChange={this.onSortOrderChange}
          fetchCurrencies={this.props.fetchCurrencies}
          sortField={sortField}
          sortOrder={sortOrder}
        />
      </div>
    );
  }
}

export default connect(mapState, mapDispatch)(Currencies);
