import Root from 'components/Root';
import configureStore from 'stores/configureStore';
import determineInitialStateFromLocalStorage from 'stores/determineInitialStateFromLocalStorage';
import { push, syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import setLocalStorage from 'utilities/setLocalStorage';

describe('user signs out', () => {
  let history, initialState, store, wrapper;

  beforeEach(() => {
    let userShowFullResponse = createResponseFromFixture('userShowFull');
    let questionCreateResponse = createResponseFromFixture('questionCreate');
    let deleteResponse = createResponseWithNoBody();
    spyOn(global, 'fetch').and.callFake((url, options) => {
      if (url.endsWith('/questions') && options.method === 'POST') {
        return questionCreateResponse;
      } else if (url.endsWith('/questions/1')) {
        return questionCreateResponse;
      } else if (url.endsWith('/users/9')) {
        return userShowFullResponse;
      }
    });
  });

  afterEach(() => {
    wrapper.unmount();
    store.dispatch(push('/'));
  });

  describe('authenticated user', () => {
    beforeEach(() => {
      setLocalStorage({
        id: 9,
        authenticationToken: 'FiWnekyRhwMCMJgCNUjZUGRo',
        authenticationTokenExpiresAt: '2016-08-08T18:07:37.763Z'
      });
      initialState = determineInitialStateFromLocalStorage(localStorage);
      store = configureStore(initialState);
      history = syncHistoryWithStore(browserHistory, store);

      store.dispatch(push('/questions/new'));
      wrapper = mount(
        <Root store={store} history={history} />
      );
    });


    it('user successfully creates question', done => {
      setTimeout(() => {
        expect(wrapper.text()).toMatch('Add A Question');
        let titleInput = wrapper.findWhere(n => {
          return n.type() === 'input' && n.props().placeholder === 'Title';
        });
        titleInput.simulate('change', { target: { value: 'my first question' } });

        let bodyTextArea = wrapper.findWhere(n => {
          return n.type() === 'textarea';
        });
        bodyTextArea.simulate('change', { target: { value: 'great question great skill' } });

        let submitButton = wrapper.findWhere(n => {
          return n.type() === 'button' && n.text() === 'Add Question';
        });
        submitButton.simulate('submit');
      }, 0);
      setTimeout(() => {
        let pageText = wrapper.text();
        expect(pageText).toMatch('my first question');
        expect(pageText).toMatch('great question great skill');
        done();
      }, 0);
    });
  });


});

