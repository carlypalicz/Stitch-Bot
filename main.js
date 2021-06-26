const Discord = require('discord.js');

const client = new Discord.Client();

const profileModel = require('./models/profileSchema');

const mongoose = require('mongoose');
const prefix = '!';

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


client.on('message', async (message) => {

    if(!message.content.startsWith(prefix) || message.author.bot) return; //ensures message is a command, and not sent by a bot

    const args = message.content.slice(prefix.length).split(/ +/); //splits the message into an array
    const command = args.shift().toLowerCase(); //the command to be executed, args is now the message minus the command

    if (command === 'introduce'){
        let intro = "Hi! I'm Stitch Bot! I can help you translate in and out of Covey's Stitch Cipher. To use this bot, enter one of the following commands:\n\n\t !translate to translate in and out of stitch \n\t !abcs to see the key for Stitch \n\t !ylapples for 11 ylapples :D \n\t !introduce to read this message again \n\nTranslations can be copy/pasted for easy communication throughout the server. Stitch Bot was made by discord user carlycries#3691 - please report any issues with or suggestions for the bot to her, or ask a mod to reach out to her for you! Do not use Stitch Bot as a way to spread any hate or harmful words, I'm meant to be a fun addition to the server and I want to be able to stay!";
        message.channel.send(intro);
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
        let rand = Math.random();
        let z1 = rand < .5;
        let name = '';
        let dm = false;

        if (message.guild == null){
            dm = true;
            name = message.author.username;
        }

        else {
            const member = await message.guild.member(message.author);
            name = member.nickname ? member.nickname : message.author.username;
        }

    console.log("Command executed by: " + name);
    console.log("Message: " + args.join(' '));

        if (args.length === 0 && message.guild != null){
            let no_empty = "Sorry " + name + ", I didn't see anything for me to translate! Please follow the !translate command with some English or Stitch. For example, !translate the quick brown fox jumped over the lazy dog"
            message.delete();
            message.channel.send(no_empty);
            return;
        }

        let greeting = "Hey ";
        greeting += name;
        let output = '';
        let cur_char = '';
        let outputting_stitch = false;
        let add_space = true;

        for (let i = 0; i < args.length; i++){
            if (args[i].includes('<:') && args[i].includes('stitch_') && args[i].includes('>')){
                //except for extreme edge cases, this means they sent in a cipher emote and want it translated back into plaintext
                //then args[i] contains stitch character - BUT, it could also contain normal text, gotta check
                //check if first two chars are <:, and if chars 3-11 are _stitch
                //if thats the case, then grab the substring from 0 to the >, and match it with its letter
                //if it doesnt have a match, output it as is i guess ?? thats an unlikely edge case
                //remove that emote id from the string, and do the same checks on the rest of the string
                outputting_stitch = false;
                add_space = true;
                output += find_stitch_emote(args[i], '');
            }

            else if (args[i].includes('<:') && args[i].includes('>')){
                //its a server-specific emote, but not a stitch emote :0)
                output += find_non_stitch_emote(args[i], '');
                add_space = true;
            }

            else if (args[i].length === 1 && args[i] === '|'){
                add_space = false;
                outputting_stitch = false;
            }
            else {
                add_space = true;
                outputting_stitch = true;
                for (let j = 0; j < args[i].length; j++){
                    cur_char = args[i].charAt(j).toLowerCase();
                    if (!alphabet[cur_char] && cur_char != 'z' && cur_char != 'Z'){
                        output += cur_char;
                    }
                    else if (cur_char === 'z' || cur_char === 'Z'){
                        let emote_code = z1 ? alphabet['z1'] : alphabet['z2'];
                        output += emote_code;
                    }
                    else {
                        output += alphabet[cur_char];
                    }
                }
            }
            if ((i != args.length - 1) && outputting_stitch){
                output += ' | ';
            }
            else if (add_space){
                output += ' ';
            }
        }

        if (message.guild != null){
            message.delete();
        }
        if (output === ''){
            let no_empty = "Sorry " + name + ", I didn't see anything for me to translate! Please follow the !translate command with some English or Stitch. For example, !translate the quick brown fox jumped over the lazy dog"
            message.channel.send(no_empty);
        }
        else {
            greeting += ", your stitch translation is: \n";
            message.channel.send(greeting);
            message.channel.send(output);
        }
    }

    // else if (command === "abcs"){
    //     output = "Learn Stitch with me!\n";
    //     alph_array = Object.keys(alphabet);
    //     alph_array.map(function(key, index) {
    //         if (key.length > 2){
    //             output += key;
    //             output += ' : ';
    //             output += alphabet[key];
    //             if (index != alph_array.length -1) {
    //                 output += ', ';
    //             }
    //         }
    //     });
    //     message.channel.send(output);
    // }
});

function find_stitch_emote(arg, partial_output){
    if (arg.length === 0){
        return partial_output;
    }

    let output = partial_output;
    let index = 0;
    let cur_char = arg.charAt(index);

    while (cur_char != '<' && index <= arg.length) { //spit back out any non-emote chars
        if (cur_char === '|'){
            //skip
            index++;
            cur_char = arg.charAt(index);
        }
        else {
            output += cur_char;
            index++;
            cur_char = arg.charAt(index);
        }
    }

    //now we should be at a <
    if (arg.length > 12 && arg.substring(index, index+9) === '<:stitch_' && arg.includes('>')){
        let emote_code = arg.substring(index, arg.indexOf('>')+1);
        if (emote_code.includes('stitch_z1') || emote_code.includes('stitch_z2')){
            output += 'z';
        }
        else {
            output += alphabet[emote_code];
            //cut off the rest of the string and continue
        }
        index = arg.indexOf('>')+1;
    }
    return find_stitch_emote(arg.substring(index), output);
}

function find_non_stitch_emote(arg, partial_output){
    if (arg.length === 0){
        return partial_output;
    }

    let output = partial_output;
    let index = 0;
    let cur_char = arg.charAt(index);

    while (cur_char != '<' && index <= arg.length){
        if (cur_char === '|'){
            //skip
            index++;
            cur_char = arg.charAt(index);
        }
        else {
            output += cur_char;
            index++;
            cur_char = arg.charAt(index);
        }
    }

    //at a <
    if (arg.length > 4 && arg.substring(index, index+2) === '<:' && arg.includes('>')){
        let emote_code = arg.substring(index, arg.indexOf('>')+1);
        output += emote_code;
        index = arg.indexOf('>')+1;
    }
    return find_non_stitch_emote(arg.substring(index), output);
}

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

client.login(process.env.STITCH_BOT_SECRET);


