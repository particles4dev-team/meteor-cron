var Fiber = Npm.require('fibers');
var max = 3, i = 0;
testAsyncMulti("create a new cron job", [
    function (test, expect) {
        var fiber = Fiber.current;
        var c = CRON.createNewCronJob('* * * * * *', function () {
            i++;
            if(i == 3) {
                c.stop();
                fiber.run();
            }
        }).run();
        Fiber.yield();
        test.equal(max, i);
    }
]);