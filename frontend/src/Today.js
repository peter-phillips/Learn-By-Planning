import styles from './Today.module.css'
import List from './List.js';
import Calendar from './Calendar.js';
import { Route , Switch} from 'react-router-dom';

function Today() {
  return (
    <div className={styles.mainScreen}>
      <Switch>
        <Route path='/Calendar'>
            <Calendar />
        </Route>
        <Route path='/List'>
          <List />
        </Route>
      </Switch>
    </div>
  );
}

export default Today;