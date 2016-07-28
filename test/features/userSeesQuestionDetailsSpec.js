import Root from 'components/Root';
import configureStore from 'stores/configureStore';
import { push, syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

describe('user visits question show', () => {
  let history, store, wrapper;

  beforeEach(() => {
    let indexResponse = createResponseFromFixture('questionIndex');
    let showResponse = createResponseFromFixture('questionShow');
    spyOn(global, 'fetch').and.callFake(url => {
      if (url.endsWith('/questions')) {
        return indexResponse;
      } else {
        return showResponse;
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

  it('should be reached from the question index', done => {
    store.dispatch(push('/questions'));
    setTimeout(() => {
      let questionLink = wrapper.findWhere(n => {
        return n.type() === 'a' && n.text() === 'my first question';
      });
      questionLink.simulate('click', { button: 0 });
    }, 0);
    setTimeout(() => {
      let pageText = wrapper.text();
      expect(pageText).toMatch('my first question');
      expect(pageText).toMatch('great question great skill');
      expect(pageText).toMatch('dad');
      expect(pageText).toMatch('do more');
      expect(pageText).toMatch('do less');
      done();
    }, 0);
  });

  it('should show the question details when visiting the page directly', done => {
    store.dispatch(push('/questions/1'));
    setTimeout(() => {
      let pageText = wrapper.text();
      expect(pageText).toMatch('my first question');
      done();
    }, 0);
  });
});

