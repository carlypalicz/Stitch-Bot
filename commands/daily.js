const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'daily',
    description: '',
    async execute(message, args, profileData, name){
        const current_time = Date.now();
        const cooldown_amount = 57600 * 1000; //16 hours
        const expiration_time = profileData.lastDaily+cooldown_amount;
        const streak_limit = 17280 * 1000; //48 hours
        let streak = profileData.dailyStreak;

        //calculate streak bonus
        console.log(current_time - profileData.lastDaily);
        console.log(streak_limit);
        if (current_time - profileData.lastDaily < streak_limit){ //streak !
            streak++;
        }
        else {
            streak = 1;
        }

        if (current_time < profileData.lastDaily+cooldown_amount){
            const time_left = (expiration_time - current_time);
            return message.channel.send(`Please wait ${convert_ms(time_left)} before using this command again.`);
        }

        const reward = 11 + streak-1;
        let messagePrefix = '';
        if (streak > 1){
            messagePrefix += `Nice, you've checked in ${streak} days in a row!`;
        }
        await profileModel.findOneAndUpdate({
            userID: profileData.userID,
        }, {
            lastDaily: current_time,
            dailyStreak: streak,
            $inc: {
                ylapples: reward,
            }
        });
        return message.channel.send(messagePrefix + ` You earned ${reward} ylapples!`);
    },
};

function convert_ms(duration){
    var minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;

    return hours + " hours and " + minutes + " minutes";
}
