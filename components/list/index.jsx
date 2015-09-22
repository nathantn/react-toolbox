/* global React */

import { addons } from 'react/addons';
import style from './style';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  displayName: 'List',

  propTypes: {
    className: React.PropTypes.string,
    dataSource: React.PropTypes.array,
    ItemFactory: React.PropTypes.func,
    onClick: React.PropTypes.func,
    type: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      attributes: '',
      className: '',
      dataSource: [],
      type: 'default'
    };
  },

  onClick (event, data, index) {
    if (this.props.onClick) {
      this.props.onClick(event, data, (this.refs[index] ? this.refs[index] : null));
    }
  },

  render () {
    let className = `${style.root} ${this.props.className}`;
    if (this.props.type) className += ` ${this.props.type}`;

    const items = this.props.dataSource.map((data, index) => {
      return (
        <li key={index} onClick={this.onClick.bind(null, data, index)}>
          {this.props.itemFactory(data, index)}
        </li>
      );
    });

    return (
      <ul data-react-toolbox='list' className={className}>
        { items }
      </ul>
    );
  }
});