import Root from 'components/Root';
import configureStore from 'stores/configureStore';
import { push, syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

describe('user visits question index', () => {
  let history, store, wrapper;

  beforeEach(() => {
    let response = createResponseFromFixture('questionIndex');
    spyOn(global, 'fetch').and.returnValue(response);

    store = configureStore();
    history = syncHistoryWithStore(browserHistory, store);

    store.dispatch(push('/'));
    wrapper = mount(
      <Root store={store} history={history} />
    );
  });

  afterEach(() => {
    wrapper.unmount();
    store.dispatch(push('/'));
  });

  it('should show question titles', done => {
    store.dispatch(push('/questions'));
    setTimeout(() => {
      expect(wrapper.text()).toMatch('my first question');
      expect(wrapper.text()).toMatch('my second question');
      done();
    }, 0);
  });
});
