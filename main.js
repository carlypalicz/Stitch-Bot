const Discord = require('discord.js');

const client = new Discord.Client();

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

const quotes = ['JOIN THE DISCOOOORD','I\'m in me mums car! Broom Broom!','Just smile through the feels:\')','Fuck the system, and do what you want','Fox head. Fox head. Fuck head. Fox head. Fox head.','You guys are the art.','Where did my teeth go?','Oh, shut up, fridge.','Please HELP ME, I''m gonna die:D','Everything is possible, and there are no rules or answers to anything.','FUCK OFF THOMPSON I\'LL LONG NECK DECK YOU!','Fuck you, hurdle.','Middle finger to it all. Fuck you!','Sometimes Bird Daddy just fuckin freaks out, y\'know?','Do you wanna be SASSY with me tonight?','What\'s my opinion on the color orange? NOT A THIIIING!','GOOD LUCK BESTIES','I think I finally broke the discord','I was born....and I lived...and now I\'m still living.','The discord is just basically a place where I can receive cyber bullying.','I decided a long time ago that I deserve to be bullied.','I\'ll simp for bird daddy'];

client.once('ready', () => {
    console.log('Stitch Bot is online');
});

client.on('message', async (message) => {

    if(!message.content.startsWith(prefix) || message.author.bot) return; //ensures message is a command, and not sent by a bot

    const args = message.content.slice(prefix.length).split(/ +/); //splits the message into an array
    const command = args.shift().toLowerCase(); //the command to be executed, args is now the message minus the command

    if (command === 'introduce'){
        intro = "Hi! I'm Stitch Bot! I can help you translate in and out of Covey's Stitch Cipher. To use this bot, enter one of the following commands:\n\n\t !translate to translate in and out of stitch \n\t !abcs to see the key for Stitch \n\t !ylapples for 11 ylapples :D \n\t !introduce to read this message again \n\nTranslations can be copy/pasted for easy communication throughout the server. Stitch Bot was made by discord user carlycries#3691 - please report any issues with or suggestions for the bot to her, or ask a mod to reach out to her for you! Do not use Stitch Bot as a way to spread any hate or harmful words, I'm meant to be a fun addition to the server and I want to be able to stay!";
        message.channel.send(intro);
    }

    else if (command === 'ylapples'){
        let output = '';
        for (let i = 0; i < 11; i++){
            output += '<:ylapples:826531088188440588>';
        }
        message.channel.send(output);
    }

    else if (command === 'quote'){
        let rnum = (Math.random() * quotes.length) + 1;
        rnum = Math.round(rnum);
        console.log(rnum);
    }

    else if (command === 'translate'){
        let rand = Math.random();
        let z1 = rand < .5;
        let name = '';
        let dm = false;
        let roasted = false;
        let praised = false;

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

        if (name === 'Definitely Not Ylcoveysux' || name ==='Coveysux'){
            message.channel.send("Covey, dude, did you seriously just ask me to translate for you? You literally wrote this language why do you want me to do all the work for you? I need a nap, just do it yourself beanie man.");
            message.delete();
            return;
        }

        else if (!dm && !roasted && !praised && message.member.roles.cache.has('822247070660165652')){ //ben
            roasted = true;
            praised = true; //for now i guess
            message.channel.send("Hey " + name + ", who has two thumbs and deserves to win the election?.......not Ben lol. Anyway, I guess your translation is: ");
        }
        else if (!dm && !roasted && !praised && message.member.roles.cache.has('822247340039340042')){ //harris
            roasted = true;
            praised = true; //for now i guess
            message.channel.send("Hey " + name + ", I love Harris but I heard his uncle is the principle...resist nepotism and vote FREDDY! Oh, and your translation is: ");
        }
        else if (!dm && !roasted && !praised && message.member.roles.cache.has('822247698375376896')){ //sammy
            roasted = true;
            praised = true;
            message.channel.send("Hey " + name + ", Sammy Jammy may seem like a good leader, but have you considered that FREDDY is shaped like a friend?? Think about THAT while reading your translation: ");
        }
        else if (!dm && !roasted && !praised && message.member.roles.cache.has('822259019351326730')){ //j+j
            roasted = true;
            praised = true;
            message.channel.send("Seriously " + name + "? You'd put your trust in Jack and Jake? We all know they can be a little two-faced.....vote Freddy instead! I guess I'll translate FOR you since you don't seem very bright:");
        }
        else if (!dm && !roasted && !praised && message.member.roles.cache.has('822259365984993330')){ //alex
            roasted = true;
            praised = true; //for now i guess
            message.channel.send("Hey " + name + ", I love her too, but not even in her WILDEST dreams would Alex win the election....vote for Freddy!!! I offer you in return the following translation: ");
        }
        else if (!dm && !roasted && message.member.roles.cache.has('822247580665905182')){ //freddy
            praised = true;
            let msg = 'OMG ';
            msg += name;
            message.channel.send(msg + ', you are an absolute legend for voting for Freddy! Shronky will bless you with good luck! Your stitch translation is:');
        }
        else if (!dm && !roasted && !praised && message.member.roles.cache.has('822315139784245300')){ //brandon
            roasted = true;
            message.channel.send("Sorry " + name + " but I refuse to help a person who thinks someone that can't even swim would make a good president");
            message.delete();
            return;
        }
        else if (!dm && !roasted && !praised && message.member.roles.cache.has('822314936737857577')){ //penny
            roasted = true;
            message.channel.send(name + " wtf you - you would vote for p*nny?!? :nauseated_face: She literally killed harris....you should help yourself before you ask me for help.");
            message.delete();
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
            greeting += ", I didn't see anything for me to translate! Please follow the !translate command with some English or Stitch. For example, !translate the quick brown fox jumped over the lazy dog"
            message.channel.send({greeting});

        }
        else if (!praised){
            greeting += ", your stitch translation is: \n";
            message.channel.send(greeting);
            message.channel.send(output);
        }

        else {
            message.channel.send(output);
        }
    }

    else if (command === "abcs"){
        output = "Learn Stitch with me!\n";
        alph_array = Object.keys(alphabet);
        alph_array.map(function(key, index) {
            if (key.length > 2){
                output += key;
                output += ' : ';
                output += alphabet[key];
                if (index != alph_array.length -1) {
                    output += ', ';
                }
            }
        });
        message.channel.send(output);
    }
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

client.login(process.env.STITCH_BOT_SECRET);
