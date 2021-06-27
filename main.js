const Discord = require('discord.js');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Stitch Bot is online');
    client.user.setPresence({
        status: 'available',
        activity: {
            name: 'CCS on loop',
            type: 'PLAYING',
        }
    });
});

const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)
}

client.login(process.env.STITCH_BOT_SECRET);





const profileModel = require('./models/profileSchema');

const mongoose = require('mongoose');

const quotes = [
"JOIN THE DISCOOOORD",
"I'm in me mums car! Broom Broom!",
"Fuck the system, and do what you want",
"Fuck TIKTOK",
"Fox head. Fox head. Fuck head. Fox head. Fox head.",
"You guys are the art.",
"Where did my teeth go?",
"Oh, shut up, fridge.",
"Pleeeease HELP ME, I'm gonna die",
"Everything is possible, and there are no rules or answers to anything.",
"Someone said 'British question-mark-question-mark'???",
"No. I'm not. I'm not being held hostage.",
"FUCK OFF THOMPSON I'LL LONG NECK DECK YOU!",
"Fuck you, hurdle.",
"Middle finger to it all. Fuck you!",
"Sometimes Bird Daddy just fuckin freaks out, y'know?",
"Do you wanna be SASSY with me tonight?",
"What's my opinion on the color orange? NOT A THIIIING!",
"GOOD LUCK BESTIES",
"I think I finally broke the discord",
"I was born....and I lived...and now I'm still living.",
"The discord is just basically a place where I can receive cyber bullying.",
"I decided a long time ago that I deserve to be bullied.",
"I'll simp for bird daddy",
"Fingers crossed I don't DIE on the way",
"Goofy fucking Fox",
"You guys give me life",
"Everybody needs to stop their thoughts and prayers for Sammy Jammy because she's become too strong. She's become too powerful.",
"You guys got me oversharing about my psoriasis",
"Sammy rises up in T-pose and just burns down everything. Rains down a firey, icey... she starts rising and just spurts piping hot coffee all over everyone. Brandon drowns immediately.",
"Sorry about my catastrophic life....it is....a disaster",
"Wanna see me throw a football? I can throw a fuckin' football",
"BANAN?! no. Nope",
"YLAPPLE MIYLK",
"Oi!!! No ice cream for cats!! Eat your cold fish jelly!!",
"Brandon got sucked into a vacuum type whirl pool as the water rushed downward through the cave. The bear didnt stand a chance. Then he was spit out on dry land, then started crying and drowned.",
"we all simp for bird daddy",
"I've cut the heads off of most things at this point",
"Squirtle is doing a benjamin bork cosplay",
"SQUIRTLES HEAD FELL OFF, HIS BRAINS ARE EVERYWHERE",
"There's only one rule in the jungle.....when a lion is hungry, it eats",
"Our entire society's hanging on a thread of banana",
"Harris likes smooth boys",
"Jesus Christ is gonna become an eyeball!",
"I'm in a SILLY mood today",
"EYEBALL JESUS",
"SCIENCE......CONSUMES......RELIGION",
"Sea snail versus sea CUCUMBER! Showdown of the sea!",
"Sometimes bird daddy gets maddy",
"Pokémon are losing limbs and no one is doing anything about it. You can't tell me the government cares about us when Pokémon are losing limbs",
"That's way too early for butt worms..",
"I cut my arm off when I was younger, it grew back, don't worry about it",
"Spicy grape soup",
"I'M COWBOBY",
"Know that your feelings are valid no matter where it goes. There is no right or wrong. Only you:) and that a beautiful thing no matter where it lands",
"I don’t feel like you should be my wittle kitten though. I don’t know if that’s appropriate. I can’t have a cat anyway because I’m gonna be going on tour, so I won’t be able to take care of you. And then you’ll starve to death and then the rats will come out and then they’ll eat you. And then I’ll get home and find this like- kitten corpse eaten by rats. And at that point the rats will have probably bred and there’ll be like, tons of rats inside the house and then they’ll form their own little rat hierarchy and soon there’ll be a little rat civilization. And I’m gonna come home and have to like, deal with this whole hierarchy of rats and civilizations. And there will be race wars within the rats and I won’t be able to keep up with all the crazy shit that’s going on in my own apartment... So, no. Probably shouldn’t be my wittle kitten",
"There's 7.9 billion people dead in front of me and I'm just crying",
"It's a thankless job, trailblazing mullet fashion",
"Maybe it's like a snuggie and you climb inside its mouth",
"If they don't promote you day 1, then quit. Know your worth",
"Fake your own death, and pin it on them. Then when they’re in jail on death row, reveal yourself. Then when they’re free look them in the eyes and say 'don’t be a jerk.' And walk away",
"'a phobia of cheese’? I’m sorry to hear that…",
"Why is boby so short? I don’t know. He’s a short king!",
"I am not an animal",
"I'm not- I'm not hugging any crots. Um.. Sorry.",
"Here are my rusty spoons!",
"b o b y f e m e n",
"I have everything that I need",
"Poggers indeed",
"That's my ear, excuse me. That's my ear. Please leave my ear alone.",
"What do you wanna do? You wanna eat the characters?",
"I'm out of control, there's no rules tonight",
"Sleeping. Little baby. Doesn't even know ABCs. Small. Little, little, little boy",
"Humor resides in everything, always",
"Smile, laugh, and love. Even when it seems like there’s no fucking way its possible. Find a way.",
"You’re all the funniest people I know, and truly, that is what saves people",
"You’re all the absolute best, truly.",
"The P in Penny stands for Psycho",
"What the fedi",
":fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox:/srs:fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox::fox:",
];

client.on('message', async (message) => {

    if(!message.content.startsWith(prefix) || message.author.bot) return; //ensures message is a command, and not sent by a bot

    const args = message.content.slice(prefix.length).split(/ +/); //splits the message into an array
    const command = args.shift().toLowerCase(); //the command to be executed, args is now the message minus the command

    if (command === 'introduce'){
        let intro = "Hi! I'm Stitch Bot! I can help you translate in and out of Covey's Stitch Cipher. To use this bot, enter one of the following commands:\n\n\t !translate to translate in and out of stitch \n\t !abcs to see the key for Stitch \n\t !ylapples for 11 ylapples :D \n\t !introduce to read this message again \n\nTranslations can be copy/pasted for easy communication throughout the server. Stitch Bot was made by discord user carlycries#3691 - please report any issues with or suggestions for the bot to her, or ask a mod to reach out to her for you! Do not use Stitch Bot as a way to spread any hate or harmful words, I'm meant to be a fun addition to the server and I want to be able to stay!";
        message.channel.send(intro);
    }

    else if (command === 'ping'){
        client.commands.get('ping').execute(message, args);
    }
    else if (command === 'ylapples'){
        let output = '';
        for (let i = 0; i < 11; i++){
            output += '<:ylapples:826531088188440588>';
        }
        message.channel.send(output);
    }

    else if (command === 'abcs'){
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#A91B0D')
            .setTitle('Learn Stitch With Me!')
            .setDescription('Here\'s a handy chart to help you learn stitch! Make note of the pattern in the letters to help you learn.')
            //.addField('Inline field title', 'Some value here', true)
            .setImage('https://github.com/carlypalicz/Stitch-Bot/blob/master/stitch_table.png?raw=true')
            .setTimestamp()
            .setFooter('type !introduce for help using Stitch Bot');

        message.channel.send(exampleEmbed);
    }

    else if (command === 'test'){
        message.channel.send("yee yee");
    }

    else if (command === 'quote'){
        let covhappy = "<:covhappy:826907997682663474>";
        let len = quotes.length;
        let rand = Math.floor(Math.random()*(len));
        message.channel.send(covhappy + "*" + quotes[rand] + "*" + covhappy);
    }

    else if (command === 'translate'){
        client.commands.get('translate').execute(message, args);
    }
});

module.exports = async(client, discord, member) => {
    let profile = await profileModel.create({
        userID: member.id, 
        serverID: member.guild.id,
        ylapples: 11,
        bank: 0
    });
    profile.save();
    console.log('fgdflkjgdflkj');
}

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Stitch Bot is connected to the database:)");
}).catch((err) => {
    console.log(err);
});



