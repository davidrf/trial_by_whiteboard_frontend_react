import Root from 'components/Root';
import configureStore from 'stores/configureStore';
import { push, syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

describe('user visits root page', () => {
  let history, store, wrapper;

  beforeEach(() => {
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

  it('should show the home page information', () => {
    expect(wrapper.text()).toMatch('Hello World!');
  });
});
