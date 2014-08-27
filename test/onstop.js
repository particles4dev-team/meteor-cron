var Fiber = Npm.require('fibers');
var max = 8, i = 0;
testAsyncMulti('on stop event', [
    function (test, expect) {
        var fiber = Fiber.current;
        var c = CRON.createNewCronJob('* * * * * *', function () {
            i++;
            if(i == 3) {
                c.stop();
                fiber.run();
            }
        });
        // on stop
        c.onStop(function () {
            i += 5;
        });
        c.run();
        Fiber.yield();
        test.equal(max, i);
    }
]);