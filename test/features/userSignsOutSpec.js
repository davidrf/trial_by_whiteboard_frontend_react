import Root from 'components/Root';
import configureStore from 'stores/configureStore';
import determineInitialStateFromLocalStorage from 'stores/determineInitialStateFromLocalStorage';
import { push, syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import setLocalStorage from 'utilities/setLocalStorage';

describe('user signs out', () => {
  let history, initialState, store, wrapper;

  beforeEach(() => {
    let showResponse = createResponseFromFixture('userShowFull');
    let deleteResponse = createResponseWithNoBody();
    spyOn(global, 'fetch').and.callFake(url => {
      if (url.endsWith('/users')) {
        return deleteResponse;
      } else if (url.endsWith('/users/9')) {
        return showResponse;
      }
    });
    setLocalStorage({
      id: 9,
      authenticationToken: 'FiWnekyRhwMCMJgCNUjZUGRo',
      authenticationTokenExpiresAt: '2016-08-08T18:07:37.763Z'
    });
    initialState = determineInitialStateFromLocalStorage(localStorage);
    store = configureStore(initialState);
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

  it('signed in user signs out when they click the sign out button', done => {
    let signOutLi = wrapper.findWhere(n => {
      return n.type() === 'li' && n.text() === 'Sign Out';
    });
    signOutLi.simulate('click');

    setTimeout(() => {
      expect(wrapper.text()).not.toMatch('dad');
      expect(wrapper.text()).toMatch('Sign Up');
      expect(localStorage.trialByWhiteBoardApiDomain).toBeUndefined();
      done();
    }, 0);
  });

});

