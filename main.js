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
const ccsTestChannelID = '827039962212859936';
const msgsForCovID = '813916802483617862';

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
birthdays.set('Jack and Jake Johnson', {
    month: 'May',
    day: '20',
    lyric: 'a clash of personalities if you wanna call it that',
    color: '#1f1163'
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
    bdayBuddy: 'Louis Tomlinson, Dr. Fauci, and Ricky Martin',
    pronouns: he,
    stone: 'Turquoise',
    holiday: 'Christmas Eve and National Eggnog Day',
    lyric: 'I learned to live without dependency',
    bio: 'Caleb is a high-energy party kid who loves to socialize with his classmates, and is particularly close with his friend Tevin Thompson. Some fun facts about Caleb include that both the CCS book and the pink orb can be seen in his house, and his parents are alumni of the school who attend Baxterban\'s feasts. Covey has also said that Caleb has terrible handwriting, and a pet dog. ',
    color: '#21a9ad',
});
birthdays.set('Brandon Brown', {
    month: 'December',
    day: '25',
    dayth: '25th',
    zodiac: 'Capricorn',
    bdayBuddy: 'Jimmy Buffet',
    pronouns: he,
    stone: 'Turquoise',
    holiday: 'Christmas Day and National Pumpkin Pie Day',
    lyric: 'The water rising for the kill',
    bio: 'Brandon Brown is the class clown, and loves making people laugh. He also loves the outdoors, and often goes out exploring. He has a tendency to give items that he finds to friends as gifts - it\'s even implied that he gave Ben the knife. He\'s also one of the only characters who has read the CCS book.',
    color: '#3d2d01',
});
birthdays.set('Jamie Jones', {
    month: 'January',
    day: '4',
    dayth: '4th',
    zodiac: 'Capricorn',
    bdayBuddy: 'Isaac Newton and D\'Arcy Carden',
    pronouns: he,
    stone: 'garnet',
    holiday: 'National Spaghetti Day and National Trivia Day',
    lyric: 'you have left me alone deep underground - you will find that i was proud',
    bio: 'Jamie is a caring friend, son, and partner, with a deep love for all living things from growing up around animals. He has amazingly supportive parents, and passes that support on to his partner, Harris, helping him gain the courage to come out. Jamie was also notably on the way to a Covey concert when he died.',
    color: '#446943',
});
birthdays.set('Benjamin Bork', {
    month: 'January',
    day: '16',
    dayth: '16th',
    zodiac: 'Capricorn',
    bdayBuddy: 'Lin Manuel Miranda and our very own COVEY',
    pronouns: he,
    stone: 'garnet',
    holiday: 'National Nothing Day, National Fig Newton Day, and Appreciate a Dragon Day,',
    lyric: 'I\'d tell my parents not to stick it out for us',
    bio: 'Benjamin is a quiet kid at school, who loves drawing and music as a form of escapism. He\'s best friends with Gabe Godman, and the two of them grew up as close as brothers. He was the first student posted in the TikTok series, and the most successful video at 1.9M likes.',
    color: '#faf8c5',
});
birthdays.set('Martha May', {
    month: 'February',
    day: '3',
    dayth: '3rd',
    zodiac: 'Aquarius',
    bdayBuddy: 'Norman Rockwell and Elmo',
    pronouns: she,
    stone: 'amethyst',
    holiday: 'National Carrot Cake Day and International Golden Retriever\'s Day',
    lyric: 'I see what looks like you digging into me',
    bio: 'Martha is a loyal friend, and is usually seen with her best friends Leila and Gretta, whom she\'s known since she was 5 and works with at the local ice cream parlor. Among the 3 of them, Martha is sort of the \'leader\' of the group. Her story, along with the songs "You Can Eat Me" and "Plane Crash", are notably inspired by the lateral thinking puzzle known as Albatross Soup.',
    color: '#92869c'
});
birthdays.set('Fence Ferguson', {
    month: 'March',
    day: '3',
    dayth: '3rd',
    zodiac: 'Pisces',
    bdayBuddy: 'Camila Cabello and Alexander Graham Bell',
    pronouns: he,
    stone: 'aquamarine',
    holiday: 'National If Pets Had Thumbs Day and National I Want You To Be Happy Day',
    lyric: 'I remember local anesthesia surgery',
    bio: 'Fence is a star student and athlete, and played alongside Jack and Jake Johnson on the school\'s football team. He was also acquainted with former student Ray Razzi, and notably given his name by a TikTok commenter who asked Covey to name a character Fence. Fence\'s jersey number in the 1991 Music Video references his death order in relation to the class, and Covey has said that the Fence hit in that video was one of his favorite parts.',
    color: '#695105'
});
birthdays.set('Tony Tazzari', {
    month: 'May',
    day: '28',
    dayth: '28th',
    zodiac: 'Gemini',
    bdayBuddy: 'John Fogerty and Jerry Douglas',
    pronouns: he,
    stone: 'emerald',
    holiday: 'International Jazz Day and International Hamburger Day',
    lyric: 'As I\'m forced through the incinerator',
    bio: 'Tony is a kind and caring friend and cousin - he\'s popular in school, but always keeps an eye out for his cousin, Lewis Lin, and is good friends with Freddy Freeman. After Lewis is removed from his home, Tony and him have a nice time living together. He is notably the son of the surgeon, Dr. Tazzari, and spent his final moments trying to help his cousin Lewis out of a fire.',
    color: '#6f7378'
});

{/**
    #f6ff94 - alex yellow
    
    birthdays.set('Jack and Jake Johnson', {
    month: 'May',
    day: '20',
    zodiac: 'Taurus (cusp of Gemini)',
    lyric: 'a clash of personalities, if you wanna call it that'
});
birthdays.set('Tony Tazzari', {
    month: 'May',
    day: '28',
    zodiac: 'Gemini',
    lyric: 'as I\'m forced through the incinerator'
});
birthdays.set('Henry Haggarty', {
    month: 'June',
    day: '5',
    zodiac: 'Gemini',
    lyric: 'old and alone - filled with regret'
});
birthdays.set('Harris Haggarty', {
    month: 'June',
    day: '11',
    zodiac: 'Gemini',
    lyric: 'you\'ve got stories to tell the world, don't be so scared to tell them'
});
birthdays.set('Sammy Jammy', {
    month: 'June',
    day: '27',
    zodiac: 'Cancer',
    lyric: 'fuck that guy I hope he\'s dead'
});
birthdays.set('Gretta Greene', {
    month: 'July',
    day: '19',
    zodiac: 'Cancer',
    lyric: 'now you're crying with a stiff mouth that still tastes like the last bite'
});
birthdays.set('Lewis Lin', {
    month: 'August',
    day: '6',
    zodiac: 'Leo',
    lyric: 'this hollow home that creaked and splintered with every step I took'
});
birthdays.set('Gabe Godman', {
    month: 'August',
    day: '10',
    zodiac: 'Leo',
    lyric: 'this coiled up double S is creeping in more every day'
});
birthdays.set('Tevin Thompson', {
    month: 'August',
    day: '17',
    zodiac: 'Leo',
    lyric: 'I keep my distance from strangers'
});
birthdays.set('Ray Razzi', {
    month: 'September',
    day: '15',
    zodiac: 'Virgo',
    lyric: 'what an aberration this all turned out to be'
});
birthdays.set('Wade Wallace', {
    month: 'October',
    day: '4',
    zodiac: 'Libra',
    lyric: 'let\'s sit down and have ourselves a fucked up family dinner'
});
birthdays.set('Suzie Simons', {
    month: 'October',
    day: '29',
    zodiac: 'Scorpio',
    message: 'the open wound that begs for salt'
});
*/}

client.once('ready', () => {
    console.log('Stitch Bot is online');

    client.user.setPresence({
        status: 'online',
        activities: [{
            name: '🎈',
            type: 'PLAYING',
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
        } 
        
        else if (id == 'Jack and Jake Johnson') {
            card = new MessageEmbed()
            .setColor(character.color)
            .setTitle(`Happy Birthday Jack and Jake!!!`)
            .setDescription('Everyone say happy birthday to Jack and Jake Johnson, who we celebrate today, May 20th. Jack and Jake are twin brothers and are both on the school football team. They each play other sports as well and are known for being gentle and caring friends, often checking in on those who need it most. They notably are played by Covey himself in the 1991 music video!')
            .addField('Jack and Jake Fun Facts', 'Their birthday makes Jack and Jake Tauruses, and their birthstone is emerald. They share their birthday today with Cher and Busta Rhymes, and it\'s also National Rescue Dog Day.')
            .setImage(`https://raw.githubusercontent.com/carlypalicz/Stitch-Bot/master/students/${linkParam}.png`)
            .setFooter(`"${character.lyric}"`);   
        } else {
            card = new MessageEmbed()
            .setColor(character.color)
            .setTitle(`Happy Birthday ${id}!!!`)
            .setDescription(`Three cheers for ${id}, whose birthday is today, ${character.month} ${character.dayth}. ${character.bio}`)
            .addField(`${id} Fun Facts!`, `${character.pronouns[2]} birthday makes ${character.pronouns[1]} a ${character.zodiac} with ${character.stone} for a birth stone. ${character.pronouns[0]} shares ${character.pronouns[2].toLowerCase()} birthday with ${character.bdayBuddy}, and it's also ${character.holiday}.`)
            .setImage(`https://raw.githubusercontent.com/carlypalicz/Stitch-Bot/master/students/${linkParam}.png`)
            .setFooter(`"${character.lyric}"`);   
        }
        
        cron.schedule(`37 2 ${character.day} ${character.month} *`, () => {
            client.guilds.cache.get(testGuildID).channels.cache.get(testChannelID).send({embeds: [card]});
        },
        {
            scheduled: true,
            timezone: 'America/New_York'
        }
        );
    });

    let alexBday = new MessageEmbed()
        .setColor('#beb4d9')
        .setTitle(`Happy Birthday Alex Anderson!!!`)
        .setDescription('Everyone say happy birthday to Alex Anderson - well, sorta. Alex was born on February 29th, or Leap Day, so this year we celebrate her today, the day after the 28th - or March 1st. Alex is an indie kid who loves being the first person to find a new band that she truly connects with. She frequents the local ice cream parlor with Penny, who she is dating and often takes walks around town with. Alex is a Covey fan and even introduced Penny to their music, and according to Covey, Alex gives the best hugs.')
        .addField('Alex Anderson Fun Facts!', 'Her birthday makes her a pisces with amethyst for a birth stone. She shares her unique February 29th birthday with Superman as well as Hiccup from How To Train Your Dragon, and while it\'s usually Leap Day, today (March 1st) is also Mardi Gras (Fat Tuesday) and, appropriately, World Music Therapy Day.')
        .setImage('https://raw.githubusercontent.com/carlypalicz/Stitch-Bot/master/students/alexanderson.png')
        .setFooter('that\'s another sleepless night from all my sleep hallucinations')

    cron.schedule('0 0 1 March *', () => {
        client.guilds.cache.get(guildID).channels.cache.get(bdayChannelID).send({embeds: [alexBday]});
    },
    {
        scheduled: true,
        timezone: 'America/New_York'
    });

    let scavInstruc = new MessageEmbed()
        .setColor('#429196')
        .setTitle('🎈 Happy Birthday!!! 🎈')
        .addField('Please read for a surprise! :)', 'Happy birthday Covey!!! Some people in the discord have arranged a small interactive gift in celebration of you!\n\nPlease note that it\'ll take an amount of time + attention to complete, so save it for when you\'re feeling up to it - it\'s not going anywhere! :)\n\nOnce ready, simply type "!unwrap" **in this channel** to open up your surprise :)')
        
    cron.schedule('40 15 16 January *', () => {
        client.guilds.cache.get(guildID).channels.cache.get(msgsForCovID).send({embeds: [scavInstruc]});
    },
    {
        scheduled: true,
        timezone: 'America/New_York'
    }
    );
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
    else if (command === 'wk'){
        client.commands.get('wk').execute(message);
    }
    else if (command === 'unwrap'){
        client.commands.get('unwrap').execute(message, profileData);
    }
    else if (command === 'addrole'){
        client.commands.get('addrole').execute(message);
    }
    else if (command === 'remrole'){
        client.commands.get('remrole').execute(message);
    }
});

mongoose.connect(process.env.MONGODB_SRV, {
    useUnifiedTopology: true,
}).then(() => {
    console.log("Stitch Bot is connected to the database :)");
}).catch((err) => {
    console.log(err);
});

client.login(process.env.STITCH_BOT_SECRET);
