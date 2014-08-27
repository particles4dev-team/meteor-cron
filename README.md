###Add packages to your project by using command

Meteor v0.9.0
###
    meteor add particle4dev:meteor-cron2
###
NOTE: Run only on server side.

###Example 
###
    var i = 0;
    var c = CRON.createNewCronJob('* * * * * *', function () {
        i++;
        console.log('You will see this message ' + i + ' second');
    }, 'America/Los_Angeles');
    // on stop
    c.onStop(function () {
        console.log('stop');
    });
    c.run();
###

Cron patterns
    
    second         0-59
    minute         0-59
    hour           0-23
    day of month   0-31
    month          0-12 (or names, see below)
    day of week    0-7 (0 or 7 is Sun, or use names)
Example
    
    00 30 11 * * 1-5 => Runs every weekday (Monday through Friday)
    // at 11:30:00 AM. It does not run on Saturday
    // or Sunday.
    2  *  *  * * *   => Runs every 2nd seconds every minute.
    
###Reference
http://stackoverflow.com/questions/18120909/set-interval-in-node-js-vs-cron-job
