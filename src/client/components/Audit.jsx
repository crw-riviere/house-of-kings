import React from 'react';

export default class Audit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = this.props.items;
    const auditList = items.slice(items.length - 2, items.length).map((items, i) => <span className="is-size-7" key={i}>{items}<br /></span>);
    return (
      <div className="content panel-audit">
        <blockquote>{auditList}</blockquote>
      </div>
    );
  }
}
