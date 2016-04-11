import React from 'react';

import Classifier from './classifier';
import KeyValueList from '../keyValueList';

const HttpRequestCrumbComponent = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
  },

  test() {
    return 42;
  },

  render() {
    let data = this.props.data;

    let list = [];
    list.push(['url', data.url]);

    if(data.response) {
      list.push(['response', data.response.statusCode]);
    }

    return (
      <div>
        <h5>HTTP Request ({data.method || "Unknown"})
          {data.classifier ? <Classifier value={data.classifier} title="%s request"/> : null}
        </h5>
        <KeyValueList data={list} isSorted={false} />
      </div>
    );
  }
});

export default HttpRequestCrumbComponent;
