import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={StreamList} />
          {/* <Route path="/" exact element={<StreamList />} /> */}
          {/* <Route path="/streams/new" exact element={<StreamCreate />} /> */}
          <Route path="/streams/new" exact component={StreamCreate} />
          {/* <Route path="/streams/edit/:id" exact element={<StreamEdit />} /> */}
          <Route path="/streams/edit/:id" exact component={StreamEdit} />
          <Route path="/streams/delete" exact element={<StreamDelete />} />
          <Route path="/streams/show" exact element={<StreamShow />} />
        </div>
      </Router>
    </div>
  );
};

export default App;
