const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '!';

const alphabet={
    'a': ['<:a_stitch:823092442042990604>'],
    'b': ['<:b_stitch:823092454894075935>'],
    'c': ['<:c_stitch:823092467448283196>'],
    'd': ['<:d_stitch:823092486049103882>'],
    'e': ['<:e_stitch:823092498305515520>'],
    'f': ['<:f_stitch:823092509902503966>'],
    'g': ['<:g_stitch:823092519298007112>'],
    'h': ['<:h_stitch:823092530098602053>'],
    'i': ['<:i_stitch:823092540139896834>'],
    'j': ['<:j_stitch:823092571127545896>'],
    'k': ['<:k_stitch:823092584091222016>'],
    'l': ['<:l_stitch:823092600676286484>'],
    'm': ['<:m_stitch:823092612213899294>'],
    'n': ['<:n_stitch:823092623736307712>'],
    'o': ['<:o_stitch:823092638420172812>'],
    'p': ['<:p_stitch:823092650844225568>'],
    'q': ['<:q_stitch:823092662747660288>'],
    'r': ['<:r_stitch:823092674553839636>'],
    's': ['<:s_stitch:823092697681231912>'],
    't': ['<:t_stitch:823092713661661208>'],
    'u': ['<:u_stitch:823092731324530698>'],
    'v': ['<:v_stitch:823092754669633586>'],
    'w': ['<:w_stitch:823092777570795550>'],
    'x': ['<:x_stitch:823092830984601620>'],
    'y': ['<:y_stitch:823092860240396308>'],
    'z1': ['<:z1_stitch:823092877806534656>'],
    'z2': ['<:z2_stitch:823092889847332874>'],
    '<:a_stitch:823092442042990604>': ['a'],
    '<:b_stitch:823092454894075935>': ['b'],
    '<:c_stitch:823092467448283196>': ['c'],
    '<:d_stitch:823092486049103882>': ['d'],
    '<:e_stitch:823092498305515520>': ['e'],
    '<:f_stitch:823092509902503966>': ['f'],
    '<:g_stitch:823092519298007112>': ['g'],
    '<:h_stitch:823092530098602053>': ['h'],
    '<:i_stitch:823092540139896834>': ['i'],
    '<:j_stitch:823092571127545896>': ['j'],
    '<:k_stitch:823092584091222016>': ['k'],
    '<:l_stitch:823092600676286484>': ['l'],
    '<:m_stitch:823092612213899294>': ['m'],
    '<:n_stitch:823092623736307712>': ['n'],
    '<:o_stitch:823092638420172812>': ['o'],
    '<:p_stitch:823092650844225568>': ['p'],
    '<:q_stitch:823092662747660288>': ['q'],
    '<:r_stitch:823092674553839636>': ['r'],
    '<:s_stitch:823092697681231912>': ['s'],
    '<:t_stitch:823092713661661208>': ['t'],
    '<:u_stitch:823092731324530698>': ['u'],
    '<:v_stitch:823092754669633586>': ['v'],
    '<:w_stitch:823092777570795550>': ['w'],
    '<:x_stitch:823092830984601620>': ['x'],
    '<:y_stitch:823092860240396308>': ['y'],
    '<:z1_stitch:823092877806534656>': ['z'],
    '<:z2_stitch:823092889847332874>': ['z']
};

client.once('ready', () => {
    console.log('Stitch Bot is online');
});

client.on('message', async (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return; //ensures message is a command, and not sent by a bot

    const args = message.content.slice(prefix.length).split(/ +/); //splits the message into an array
    const command = args.shift().toLowerCase(); //the command to be executed, args is now the message minus the command

    if (command === 'introduce'){
        intro = "Hi! I'm Stitch Bot! I can help you translate in and out of Covey's Stitch Cipher. To use this bot, enter one of the following commands:\n\n\t !translate to translate in and out of stitch \n\t !introduce to read this message again \n\nTranslations can be copy/pasted for easy communication throughout the server. Stitch Bot was made by discord user carlycries#3691 - please report any issues with or suggestions for the bot to her, or ask a mod to reach out to her for you! Do not use Stitch Bot as a way to spread any hate or harmful words, I'm meant to be a fun addition to the server and I want to be able to stay!";
        message.channel.send(intro);
    }

    else if (command === 'translate'){
        let rand = Math.random();
        let z1 = rand < .5;

        const member = await message.guild.member(message.author);
        const name = member ? member.nickname : message.author.username;

        let greeting = "Hey ";
        greeting += name;
        greeting += ", your stitch translation is: \n";
        let output = '';
        let cur_char = '';

        for (let i = 0; i < args.length; i++){
            if (args[i].includes('<:') && args[i].includes('_stitch') && args[i].includes('>')){
                //except for extreme edge cases, this means they sent in a cipher emote and want it translated back into plaintext
                //then args[i] contains stitch character - BUT, it could also contain normal text, gotta check
                //check if first two chars are <:, and if chars 3-11 are _stitch
                //if thats the case, then grab the substring from 0 to the >, and match it with its letter
                //if it doesnt have a match, output it as is i guess ?? thats an unlikely edge case
                //remove that emote id from the string, and do the same checks on the rest of the string
                output += find_stitch_emote(args[i], '');
            }

            else if (args[i].includes('<:') && args[i].includes('>')){
                //its a server-specific emote, but not a stitch emote
                output += find_non_stitch_emote(args[i], '');
            }

            else {
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
            output += ' ';
        }
        message.delete();
        message.channel.send(greeting);
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
        output += cur_char;
        index++;
        cur_char = arg.charAt(index);
    }

    //now we should be at a <
    if (arg.length > 12 && arg.substring(index, index+2) === '<:' && arg.substring(index+3, index+12).includes('_stitch:') && arg.includes('>')){
        let emote_code = arg.substring(index, arg.indexOf('>')+1);
        if (emote_code.includes('z1_stitch') || emote_code.includes('z2_stitch')){
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
        output += cur_char;
        index++;
        cur_char = arg.charAt(index);
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
