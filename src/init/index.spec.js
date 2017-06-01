import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import init from './';

chai.use(sinonChai);

describe('GoogleAnalytics api interface: init', () => {
    const sandbox = sinon.sandbox.create();
    const gaScriptEl = {};
    let insertNodeSpy;
    let scriptEl;
    const gaOptions = {
    };

    afterEach(() => {
        sandbox.restore();
    });

    beforeEach(() => {
        insertNodeSpy = sandbox.spy();
        scriptEl = {
            parentNode: {
                insertBefore: insertNodeSpy,
            },
        };
        window.ga = sandbox.stub();
        sandbox.stub(document, 'createElement');
        document.createElement.withArgs('script').returns(gaScriptEl);
        sandbox.stub(document, 'getElementsByTagName').returns([scriptEl]);
    });

    it('should create a script element that starts asynchronously downloading the analytics and ' +
    'initialise a global ga function', () => {
        init('123', gaOptions);
        expect(document.createElement).to.have.been.calledWith('script');
        expect(document.getElementsByTagName).to.have.been.calledWith('script');
        expect(insertNodeSpy).to.have.been.calledWith(gaScriptEl, scriptEl);
        expect(gaScriptEl.async).to.equal(1);
        expect(gaScriptEl.src).to.equal('https://www.google-analytics.com/analytics.js');
        expect(window.ga).to.have.been.calledWith('create', '123', gaOptions);
    });
});
