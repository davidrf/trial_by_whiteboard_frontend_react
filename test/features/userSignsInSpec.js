import Root from 'components/Root';
import configureStore from 'stores/configureStore';
import { push, syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import Modal from 'react-modal';

describe('user signs up', () => {
  let history, store, wrapper;

  beforeEach(() => {
    let createResponse = createResponseFromFixture('userCreate');
    spyOn(Modal.prototype, 'render').and.callFake(function() {
      let { children, isOpen } = this.props;
      if (isOpen) {
        return <div>{children}</div>;
      } else {
        return <div />;
      }
    });
    spyOn(global, 'fetch').and.callFake(url => {
      if (url.endsWith('/authentication_tokens')) {
        return createResponse;
      }
    });

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

  it('should sign the user in', done => {
    let signInLi = wrapper.findWhere(n => {
      return n.type() === 'li' && n.text() === 'Sign In';
    });
    signInLi.simulate('click');

    let inputs = wrapper.find('input');

    let usernameInput = inputs.findWhere(n => n.props().placeholder === 'Username');
    usernameInput.simulate('change', { target: { value: 'dad' } });

    let passwordInput = inputs.findWhere(n => n.props().placeholder === 'Password');
    passwordInput.simulate('change', { target: { value: 'dad1' } });

    let submitButton = wrapper.findWhere(n => {
      return n.type() === 'button' && n.text() === 'Sign In'
    });
    submitButton.simulate('submit');
    setTimeout(() => {
      expect(wrapper.text()).not.toMatch('Sign In');
      expect(wrapper.text()).toMatch('dad');
      let userInfoFromLocalStorage = JSON.parse(localStorage.trialByWhiteboardReact);
      let {
        id,
        authenticationToken,
        authenticationTokenExpiresAt
      } = userInfoFromLocalStorage;
      expect(id).toBe(9);
      expect(authenticationToken).toBe('VhS5ebYtmMV95BaUsQsBm84s');
      expect(authenticationTokenExpiresAt).toBe('2016-08-08T04:11:06.242Z');
      done();
    }, 0);
  });

});

