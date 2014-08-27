/**
 * create new cron job for meteor
 *
 */
var cronJob  = CRON.CronJob,
timezone = "America/Los_Angeles";

CRON.createNewCronJob = function(pattern, task, options){
    var cron = null;
    var onStopCallback = null;
    var task = Meteor.bindEnvironment(task);
    var pattern = pattern;
    var t = timezone;
    if (options && options.timezone)
        t = options.timezone;

    return {
        run: function(){
            if(cron)
                throw new Error('cron is running');
            onStopCallback = onStopCallback || function(){};
            cron = new cronJob(pattern, task, onStopCallback, false, t);
            cron.start();
            return this;
        },
        stop: function(){
            if(!cron)
                throw new Error('cron is not running');
            cron.stop();
        },
        onStop: function(cb){
            if(cron)
                throw new Error('cron is running');
            if(!_.isFunction(cb))
                throw new Error('callback must be a function');

            onStopCallback = cb;
        }
    };
};