if(Meteor.isClient){
    var max = 3;
    testAsyncMulti("simple", [
        function (test, expect) {
            Meteor.call('makeJob', expect(function(err, res){
                if(err)
                    throw err;
                test.equal(max, res);
            }));
        }]
    );
}
if(Meteor.isServer){
    var Fiber = Npm.require('fibers');
    var i = 0;
    var max = 3;
    var cronJob = CRON.CronJob;
    Meteor.methods({
        'makeJob': function(){
            var fiber = Fiber.current;
            var job = new cronJob('* * * * * *', function(){
                i++;
                console.log('You will see this message ' + i + ' second');
                if(i >= max){
                    this.stop();
                }
            }, function(){
                fiber.run();
            }, true, "America/Los_Angeles");
            Fiber.yield();
            return i;
        }
    });
}
/**
var Fiber = Npm.require('fibers');

var i = 0;
var max = 3;
var cronJob = CRON.CronJob;

testAsyncMulti("simple", [
    function (test, expect) {

        var job = new cronJob('* * * * * *', expect(function(){
            i++;
            console.log('You will see this message ' + i + ' second');
            if(i >= max){
                this.stop();
            }
        }), expect(function(){
            test.equal(i, max);
        }), true, "America/Los_Angeles");

    }]
);
*/