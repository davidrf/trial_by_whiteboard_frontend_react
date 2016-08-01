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
      if (url.endsWith('/users')) {
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
    let signUpLi = wrapper.findWhere(n => {
      return n.type() === 'li' && n.text() === 'Sign Up';
    });
    signUpLi.simulate('click');

    let inputs = wrapper.find('input');

    let emailInput = inputs.findWhere(n => n.props().placeholder === 'Email');
    emailInput.simulate('change', { target: { value: 'dad@dad.com' } });

    let usernameInput = inputs.findWhere(n => n.props().placeholder === 'Username');
    usernameInput.simulate('change', { target: { value: 'dad' } });

    let passwordInput = inputs.findWhere(n => n.props().placeholder === 'Password');
    passwordInput.simulate('change', { target: { value: 'dad1' } });

    let passwordConfirmationInput = inputs.findWhere(n => {
      return n.props().placeholder === 'Password Confirmation'
    });
    passwordConfirmationInput.simulate('change', { target: { value: 'dad1' } });

    let submitButton = wrapper.findWhere(n => {
      return n.type() === 'button' && n.text() === 'Sign Up'
    });
    submitButton.simulate('submit');
    setTimeout(() => {
      expect(wrapper.text()).not.toMatch('Sign Up');
      expect(wrapper.text()).toMatch('dad');
      done();
    }, 0);
  });

});

