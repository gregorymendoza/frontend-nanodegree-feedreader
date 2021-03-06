/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        var feedsLen = allFeeds.length;

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(feedsLen).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have a URL defined', function() {
            for (var i = 0; i < feedsLen; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should have a name defined', function() {
            for (var i = 0; i < feedsLen; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });


    /* "The menu" test suite */
    describe('The menu', function() {
        var body = $('body');

        /* This test ensures the menu element is hidden by default.
         * The HTML and the CSS were analized to determine how the
         * hiding/showing of the menu element was performed.
         */
        it('should be hidden by default', function() {
            expect(body.is('.menu-hidden')).toBe(true);
        });

        /* This test ensures the menu changes visibility
         * when the menu icon is clicked. This test
         * have two expectations: the menu displays when
         * clicked and it hides when clicked again.
         */
        it('should change visibility when the menu icon is clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect(body.is('.menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect(body.is('.menu-hidden')).toBe(true);
        });
    });

    /* "Initial Entries" test suite */
    describe('Initial Entries', function() {

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * LoadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('should have at least an entry', function() {
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
        });
    });

    /* "New Feed Selection" test suite*/
    describe('New Feed Selection', function() {
        var initialFeed, newerFeed;

        /* This test ensures when a new feed is loaded by the
         * loadFeed asynchronous function that the content actually changes.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                initialFeed = $('.feed').get(0).innerHTML;
                loadFeed(1, function() {
                    newerFeed = $('.feed').get(0).innerHTML;
                    done();
                });
            });
        });

        it('content should change', function() {
            expect(initialFeed).not.toEqual(newerFeed);
        });
    });
}());
