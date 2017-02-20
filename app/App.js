import React from 'react';
import styles from './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }
  render() {
    console.log(styles)
    return (
      <div className={styles.app}>
        bar
      </div>
    );
  }
}

export default App;