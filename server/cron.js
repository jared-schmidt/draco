if (Meteor.isServer) {
    // 0 or 7 Sunday
    // 1 Monday
    // 2 Tuesday
    // 3 Wednesday
    // 4 Thursday
    // 5 Friday
    // 6 Saturday

/*
    field           allowed values
    ------          --------------
    second              0-59
    minute               0-59
    hour                 0-23
    day of month          0-31
    month                0-12 (or names, see below)
    day of week          0-7 (0 or 7 is Sun, or use names)
 */

    var c = CRON.createNewCronJob('00 30 3 * * *', function () {
        console.log("Cron Job");
        People.update({},{$set:{'gifs':0}});
    }, 'America/New_York');
    // on stop
    c.onStop(function () {
        console.log('stop');
    });
    c.run();

}