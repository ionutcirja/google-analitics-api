import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import ga from './';

chai.use(sinonChai);

describe('GoogleAnalytics api', () => {
    const sandbox = sinon.sandbox.create();

    beforeEach(() => {
        window.ga = sandbox.stub();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('init', () => {
        const gaScriptEl = {};
        let insertNodeSpy;
        let scriptEl;
        const gaOptions = {
            trackingId: '123',
        };

        beforeEach(() => {
            insertNodeSpy = sandbox.spy();
            scriptEl = {
                parentNode: {
                    insertBefore: insertNodeSpy,
                },
            };
            sandbox.stub(document, 'createElement');
            document.createElement.withArgs('script').returns(gaScriptEl);
            sandbox.stub(document, 'getElementsByTagName').returns([scriptEl]);
        });

        it('should create a script element that starts asynchronously downloading the analytics and ' +
        'initialise a global ga function', () => {
            ga.init(gaOptions);
            expect(document.createElement).to.have.been.calledWith('script');
            expect(document.getElementsByTagName).to.have.been.calledWith('script');
            expect(insertNodeSpy).to.have.been.calledWith(gaScriptEl, scriptEl);
            expect(gaScriptEl.async).to.equal(1);
            expect(gaScriptEl.src).to.equal('https://www.google-analytics.com/analytics.js');
            expect(window.ga).to.have.been.calledWith('create', gaOptions);
        });
    });

    describe('track', () => {
        it('should call the global ga function', () => {
            const trackOptions = {
                hitType: 'pageview',
                page: '/path',
            };
            ga.track(trackOptions);

            expect(window.ga).to.have.been.calledWith('send', trackOptions);
        });
    });
});
