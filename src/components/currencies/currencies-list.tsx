import React, { Component } from 'react';
import * as he from 'he';
import '../../styles/routes/currencies.scss';
import {
  CurrenciesItem,
  CurrenciesStatus,
} from '../../redux/reducers/currencies';
import CubeLoader from '../common/cube-loader';
import { formatDate } from '../../utils/date';
import LoadingDots from '../common/loading-dots';

type TableHeader = {
  title: string;
  sortField: string;
};

const TABLE_HEADER_ITEMS = [
  {
    title: 'Currency',
    sortField: 'code',
  },
  {
    title: 'Price',
    sortField: 'rate_float',
  },
];

type Props = {
  items: CurrenciesItem[];
  status: CurrenciesStatus;
  sortField: string;
  sortOrder: string;
  onSortFieldChange: (sortField: string) => void;
  onSortOrderChange: () => void;
  fetchCurrencies: () => void;
};

class CurrenciesList extends Component<Props> {
  onSortClick = (field: string) => {
    if (field === this.props.sortField) {
      this.props.onSortOrderChange();
    } else {
      this.props.onSortFieldChange(field);
    }
  };

  renderTableHead = (item: TableHeader) => {
    const selected = item.sortField === this.props.sortField;
    let className = 'table-head';
    if (selected) {
      className += ` selected ${this.props.sortOrder}`;
    }
    return (
      <th scope="col" className={className} key={item.title}>
        <span>{item.title}</span>
        <i
          className="fa fa-chevron-down"
          onClick={() => this.onSortClick(item.sortField)}
        />
      </th>
    );
  };

  renderListItem = (item: CurrenciesItem) => {
    let code = item.code;
    let price = item.rate_float.toFixed(2);
    if (item.symbol) {
      code += ` (${he.decode(item.symbol)})`;
      price += ` ${he.decode(item.symbol)}`;
    }
    return (
      <tr key={item.code}>
        <td>{code}</td>
        <td>{price}</td>
      </tr>
    );
  };

  renderError = () => {
    const { status } = this.props;
    if (status.state === 'error') {
      return (
        <div className="currencies-list-error-container">
          <span>{status.message}</span>
          <div>
            <span
              className="error-retry"
              onClick={() => this.props.fetchCurrencies()}
            >
              Retry
            </span>
          </div>
        </div>
      );
    }
    return null;
  };
  render() {
    return (
      <div className="currencies-list-container">
        {this.props.status.loading && this.props.items.length === 0 ? (
          <div className="currencies-list-loader-container">
            <CubeLoader />
          </div>
        ) : (
          <>
            <div className="currencies-list-header">
              <span>
                {`Last updated: ${formatDate(
                  this.props.status.lastUpdate,
                  'yyyy-MM-dd HH:mm:ss',
                )}`}
              </span>
              {this.renderError()}
              {this.props.status.loading && this.props.items.length > 0 && (
                <LoadingDots />
              )}
            </div>
            <table>
              <thead>
                <tr>{TABLE_HEADER_ITEMS.map(this.renderTableHead)}</tr>
              </thead>
              <tbody>{this.props.items.map(this.renderListItem)}</tbody>
            </table>
          </>
        )}
      </div>
    );
  }
}

export default CurrenciesList;
