const {Client, Intents, Collection, MessageEmbed, Message} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS]});

const cron = require('node-cron');
const she = ["She", "her", "Her"];
const he = ["He", "him", "His"];
const guildID = '812841672345255986';
const bdayChannelID = '813212394414931988';
const musicChannelID = '812902219077910579';
const testGuildID = '822718971311685633';
const testChannelID = '831039144398028841';

const birthdays = new Map();
birthdays.set('Danny Davis', {
    month: 'November',
    day: '16',
    dayth: '16th',
    zodiac: 'Scorpio',
    bdayBuddy: 'country singer Mason Ramsey',
    pronouns: he,
    stone: 'topaz',
    holiday: 'National Fast Food Day',
    lyric: 'Danny you were always 10 feet from me, laying in your bed',
    bio: 'Danny is smart and excels in his classes such as math and chemistry. He helped Ray in the creation of fox tears by getting the final ingredient from Tony\'s father (the surgeon). He is also notably inspired by Covey\'s real-life best friend Danny, whom the song Sound of A Gun is about.',
    color: '#947d4c'
});
birthdays.set('Bobby and Freddy Freeman', {
    month: 'November',
    day: '17',
    lyric: 'The fox is looming with intent',
    color: 'black'
});
birthdays.set('Leila Lee', {
    month: 'November',
    day: '26',
    dayth: '26th',
    zodiac: 'Sagittarius',
    bdayBuddy: 'musicians DJ Khaled and Tina Turner',
    pronouns: she,
    stone: 'topaz',
    holiday: 'National Cake Day and Black Friday',
    lyric: 'You can eat me, if you need to',
    bio: 'Leila is a loyal friend, and is usually seen with her best friends Martha and Gretta, whom she\'s known since she was 5 and works with at the local ice cream parlor. Her story, along with the songs "You Can Eat Me" and "Plane Crash", are notably inspired by the lateral thinking puzzle known as Albatross Soup.',
    color: '#00adc4',
});
birthdays.set('Penny Perkins', {
    month: 'December',
    day: '11',
    dayth: '11th',
    zodiac: 'Sagittarius',
    bdayBuddy: 'Hailee Steinfeld and Rita Moreno',
    pronouns: she,
    stone: 'Turquoise',
    holiday: 'National App and National Noodle Ring Day',
    lyric: 'flashes of pulling the trigger will flicker',
    bio: 'Penny is one of the best people to talk if you have a problem, and is very close with her parents. She\'s dating Alex Anderson, and the two of them often get ice cream and walk around town together. She\'s shown wearing a Covey shirt, and has been confirmed as a fan of their music, which Alex introduced her to. Covey has said that writing Penny\'s story and plot twist was one of his favorite moments whilst creating CCS.',
    color: '#262a61',
});
birthdays.set('Caleb Cameron', {
    month: 'December',
    day: '24',
    dayth: '24th',
    zodiac: 'Capricorn',
    bdayBuddy: 'Louis Tomlinson and Ricky Martin',
    pronouns: he,
    stone: '',
    holiday: 'Turquoise',
    lyric: 'Let\'s sit down and have ourselves a fucked up family dinner',
    bio: 'hbd caleb!',
    color: 'blue',
});

{/**

birthdays.set('Brandon Brown', {
    month: 'December',
    day: '25',
    zodiac: 'Capricorn',
    message: 'hbd brandon!'
});
birthdays.set('Jamie Jones', {
    month: 'January',
    day: '4',
    zodiac: 'Capricorn',
    message: 'hbd jamie!'
});
birthdays.set('Benjamin Bork', {
    month: 'January',
    day: '16',
    zodiac: 'Capricorn',
    message: 'hbd banjo man!'
});
birthdays.set('Martha May', {
    month: 'February',
    day: '3',
    zodiac: 'Aquarius',
    message: 'hbd martha!'
});
birthdays.set('Alex Anderson', {
    month: 'March',
    day: '1',
    zodiac: 'Pisces',
    message: 'hbd alex!'
});
birthdays.set('Fence Ferguson', {
    month: 'March',
    day: '3',
    zodiac: 'Pisces',
    message: 'hbd fence!'
});
birthdays.set('Jack and Jake Johnson', {
    month: 'May',
    day: '20',
    zodiac: 'Taurus (cusp of Gemini)',
    message: 'hbd twins!'
});
birthdays.set('Tony Tazzari', {
    month: 'May',
    day: '28',
    zodiac: 'Gemini',
    message: 'hbd tony!'
});
birthdays.set('Henry Haggarty', {
    month: 'June',
    day: '5',
    zodiac: 'Gemini',
    message: 'hbd henry!'
});
birthdays.set('Harris Haggarty', {
    month: 'June',
    day: '11',
    zodiac: 'Gemini',
    message: 'hbd harris!'
});
birthdays.set('Sammy Jammy', {
    month: 'June',
    day: '27',
    zodiac: 'Cancer',
    message: 'hbd sammy!'
});
birthdays.set('Gretta Greene', {
    month: 'July',
    day: '19',
    zodiac: 'Cancer',
    message: 'hbd gretta!'
});
birthdays.set('Lewis Lin', {
    month: 'August',
    day: '6',
    zodiac: 'Leo',
    message: 'hbd lewis!'
});
birthdays.set('Gabe Godman', {
    month: 'August',
    day: '10',
    zodiac: 'Leo',
    message: 'hbd gabe!'
});
birthdays.set('Tevin Thompson', {
    month: 'August',
    day: '17',
    zodiac: 'Leo',
    message: 'hbd tevin!'
});
birthdays.set('Ray Razzi', {
    month: 'September',
    day: '15',
    zodiac: 'Virgo',
    message: 'hbd ray!'
});
birthdays.set('Wade Wallace', {
    month: 'October',
    day: '4',
    zodiac: 'Libra',
    message: 'hbd wade!'
});
birthdays.set('Suzie Simons', {
    month: 'October',
    day: '29',
    zodiac: 'Scorpio',
    message: 'hbd suzie!'
});
*/}

client.once('ready', () => {
    console.log('Stitch Bot is online');

    client.user.setPresence({
        status: 'online',
        activities: [{
            name: 'to Homebound',
            type: 'LISTENING',
        }]
    });

    birthdays.forEach((character, id) => {
        let linkParam = id.toLowerCase().replace(/\s+/g, '');
        let card;

        if (id == 'Bobby and Freddy Freeman'){
            card = new MessageEmbed()
            .setColor(character.color)
            .setTitle(`Happy Birthday Bobby and Freddy!!!`)
            .setDescription('Everyone say happy birthday to Bobby and Freddy, who we celebrate today, November 17th. Bobby and Freddy are brothers who were abandoned as children and taken in by the family that found them. They complement each other as near perfect opposites, both in color and personality. They notably first appeared as paper mache heads on the cover of Some Cats Live, Some Cats Die. Covey has said that they consider Bobby\'s personality to be similar to their own, whereas Freddy\'s personality more mirrors that of drummer Dillon.')
            .addField('Boby Fedy Fun Facts', 'Their birthday makes Bobby and Freddy Scorpios, and their birthstone is topaz. They share their birthday today with Danny Devito, and it\'s also National Homemade Bread, Baklava, AND Butter Day.')
            .setImage(`https://raw.githubusercontent.com/carlypalicz/Stitch-Bot/master/students/${linkParam}.png`)
            .setFooter(`"${character.lyric}"`);     
        } else {
            card = new MessageEmbed()
            .setColor(character.color)
            .setTitle(`Happy Birthday ${id}!!!`)
            .setDescription(`Three cheers for ${id}, whose birthday is today, ${character.month} ${character.dayth}. ${character.bio}`)
            .addField(`${id} Fun Facts!`, `${character.pronouns[2]} birthday makes ${character.pronouns[1]} a ${character.zodiac} with ${character.stone} for a birth stone. ${character.pronouns[0]} shares ${character.pronouns[2].toLowerCase()} birthday today with ${character.bdayBuddy}, and it's also ${character.holiday}.`)
            .setImage(`https://raw.githubusercontent.com/carlypalicz/Stitch-Bot/master/students/${linkParam}.png`)
            .setFooter(`"${character.lyric}"`);   
        }
        
        cron.schedule(`0 0 ${character.day} ${character.month} *`, () => {
            client.guilds.cache.get(guildID).channels.cache.get(bdayChannelID).send({embeds: [card]});
        },
        {
            scheduled: true,
            timezone: 'America/New_York'
        }
        );
    });

    let annivCard = new MessageEmbed()
        .setColor('#d61c1c')
        .setTitle('Happy 1 Year of Cut on the Crease!')
        .setDescription('A year ago today, Cut on the Crease was released as the debut single for Covey\'s junior record Class of Cardinal Sin. The music video features the stories of Benjamin Bork, Gabe Godman, The Haggartys, and Suzie Simons, and the song already has nearly a million streams on Spotify.')
        .setImage('https://raw.githubusercontent.com/carlypalicz/Stitch-Bot/master/cotc.jpg')
        .addField('Celebrate by Streaming:', '[Listen on Spotify!](https://open.spotify.com/track/7oUM16pcpcD75ifrqwMCay?si=17c978c27461496f)')
        .setFooter('\"it\'s overwhelming in a subtle kind of way\"');

    cron.schedule('0 0 11 December *', () => {
        client.guilds.cache.get(guildID).channels.cache.get(musicChannelID).send({embeds: [annivCard]});
    },
    {
        scheduled: true,
        timezone: 'America/New_York'
    });
});

const prefix = '!';

const fs = require('fs');

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)
}

const profileModel = require('./models/profileSchema');
const serverModel = require('./models/serverSchema');

const mongoose = require('mongoose');

const alphabet={
    'a': ['<:stitch_a:823344398409662484>'],
    'b': ['<:stitch_b:823348619926569010>'],
    'c': ['<:stitch_c:823348666374029332>'],
    'd': ['<:stitch_d:823348742735921182>'],
    'e': ['<:stitch_e:823348742970277909>'],
    'f': ['<:stitch_f:823348743146307653>'],
    'g': ['<:stitch_g:823348743260340224>'],
    'h': ['<:stitch_h:823348743474118656>'],
    'i': ['<:stitch_i:823350913108410408>'],
    'j': ['<:stitch_j:823351325919281202>'],
    'k': ['<:stitch_k:823351386288553994>'],
    'l': ['<:stitch_l:823351541238071336>'],
    'm': ['<:stitch_m:823351598574862358>'],
    'n': ['<:stitch_n:823351741093118034>'],
    'o': ['<:stitch_o:823351822788853829>'],
    'p': ['<:stitch_p:823351898198769704>'],
    'q': ['<:stitch_q:823352133104959538>'],
    'r': ['<:stitch_r:823352331818500096>'],
    's': ['<:stitch_s:823352508985901059>'],
    't': ['<:stitch_t:823352588468224010>'],
    'u': ['<:stitch_u:823352744840265808>'],
    'v': ['<:stitch_v:823352910711750716>'],
    'w': ['<:stitch_w:823352996829593650>'],
    'x': ['<:stitch_x:823354927241625651>'],
    'y': ['<:stitch_y:823355006518165514>'],
    'z1': ['<:stitch_z1:823360282741964830>'],
    'z2': ['<:stitch_z2:823361048798953493>'],
    '<:stitch_a:823344398409662484>': ['a'],
    '<:stitch_b:823348619926569010>': ['b'],
    '<:stitch_c:823348666374029332>': ['c'],
    '<:stitch_d:823348742735921182>': ['d'],
    '<:stitch_e:823348742970277909>': ['e'],
    '<:stitch_f:823348743146307653>': ['f'],
    '<:stitch_g:823348743260340224>': ['g'],
    '<:stitch_h:823348743474118656>': ['h'],
    '<:stitch_i:823350913108410408>': ['i'],
    '<:stitch_j:823351325919281202>': ['j'],
    '<:stitch_k:823351386288553994>': ['k'],
    '<:stitch_l:823351541238071336>': ['l'],
    '<:stitch_m:823351598574862358>': ['m'],
    '<:stitch_n:823351741093118034>': ['n'],
    '<:stitch_o:823351822788853829>': ['o'],
    '<:stitch_p:823351898198769704>': ['p'],
    '<:stitch_q:823352133104959538>': ['q'],
    '<:stitch_r:823352331818500096>': ['r'],
    '<:stitch_s:823352508985901059>': ['s'],
    '<:stitch_t:823352588468224010>': ['t'],
    '<:stitch_u:823352744840265808>': ['u'],
    '<:stitch_v:823352910711750716>': ['v'],
    '<:stitch_w:823352996829593650>': ['w'],
    '<:stitch_x:823354927241625651>': ['x'],
    '<:stitch_y:823355006518165514>': ['y'],
    '<:stitch_z1:823360282741964830>': ['z'],
    '<:stitch_z2:823361048798953493>': ['z']
};


client.on('message', async (message) => {

    if(!message.content.startsWith(prefix) || message.author.bot){
        return; //ensures message is a command, and not sent by a bot
    } 

    const args = message.content.slice(prefix.length).split(/ +/); //splits the message into an array
    const command = args.shift().toLowerCase(); //the command to be executed, args is now the message minus the command

    let name='';
    let dm=false;
    if (message.guild == null){
        dm = true;
        name = message.author.username;
    }
    else {
        const member = await message.guild.members.cache.get(message.author.id);
        name = member.nickname ? member.nickname : message.author.username;
        test = member.displayName
    }

    let profileData;

    try{
        profileData = await profileModel.findOne({userID: message.author.id});
        if (!profileData){
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                ylapples: 11,
                lastDaily: 0,
                dailyStreak: 1,
                lastHangman: 0,
                name: name,
            });
            profile.save();
            profileData = profile;
        }
    } catch(err){
        console.log(err);
    }

    let serverData;
    try {
        serverData = await serverModel.findOne({serverID: message.guild.id});
        if (!serverData){
            let server = await serverModel.create({
                serverID: message.guild.id,
                coveyCrimeCounter: 0,
            });
            server.save();
            serverData = server;
        }
    } catch(err){
        console.log(err);
    }

    if (command === 'introduce'){
        client.commands.get('introduce').execute(message, args);
    }

    else if (command === 'balance'){
        await profileData;
        client.commands.get('balance').execute(message, args, profileData, name);
    }

    else if (command === 'teeth'){
        await profileData;
        client.commands.get('teeth').execute(message, args, profileData, name);
    }

    else if (command === 'daily'){
        client.commands.get('daily').execute(message, args, profileData, name);
    }

    else if (command === 'ping'){
        client.commands.get('ping').execute(message, args);
    }
    else if (command === 'ylapples'){
        client.commands.get('ylapples').execute(message, args);
    }

    else if (command === 'abcs'){
        client.commands.get('abcs').execute(message, args);
    }

    else if (command === 'quote'){
        client.commands.get('quote').execute(message, args);
    }

    else if (command === 'translate'){
        client.commands.get('translate').execute(message, args, name, dm, alphabet);
    }
    else if (command === 'richest'){
        client.commands.get('richest').execute(message, args, name);
    }
    else if (command === 'hangman'){
        client.commands.get('hangman').execute(message, profileData);
    }
    else if (command === 'set-ylapples'){
        client.commands.get('set-ylapples').execute(message, args, profileData);
    }
    else if (command === 'tweet'){
        client.commands.get('tweet').execute(message, args, profileData);
    }
});

mongoose.connect(process.env.MONGODB_SRV, {
    useUnifiedTopology: true,
}).then(() => {
    console.log("Stitch Bot is connected to the database:)");
}).catch((err) => {
    console.log(err);
});

client.login(process.env.STITCH_BOT_SECRET);
