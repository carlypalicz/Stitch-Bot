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

const profileModel = require('./models/profileSchema');

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

const cooldowns = new Map();


client.on('message', async (message) => {

    if(!message.content.startsWith(prefix) || message.author.bot) return; //ensures message is a command, and not sent by a bot

    const args = message.content.slice(prefix.length).split(/ +/); //splits the message into an array
    const command = args.shift().toLowerCase(); //the command to be executed, args is now the message minus the command

    let name='';
    let dm=false;
    if (message.guild == null){
        dm = true;
        name = message.author.username;
    }
    else {
        const member = await message.guild.member(message.author);
        name = member.nickname ? member.nickname : message.author.username;
    }

    let profileData;

    try{
        profileData = await profileModel.findOne({userID: message.author.id});
        if (!profileData){
            let profile = await profileModel.create({
                userID: message.author.id, 
                serverID: message.guild.id,
                ylapples: 11,
                bank: 0
            });
            profile.save();
        }
    } catch(err){
        console.log(err);
    }


    if (command === 'introduce'){
        client.commands.get('introduce').execute(message, args);
    }

    else if (command === 'balance'){
        client.commands.get('balance').execute(message, args, profileData, name);
    }

    else if (command === 'daily'){
        if (!cooldowns.has(command)){
            cooldowns.set(command, new Discord.Collection());
        }

        const current_time = Date.now();
        const timestamps = cooldowns.get(command);
        const cooldown_amount = 86400 * 1000;

        if (timestamps.has(message.author.id)){
            const expiration_time = timestamps.get(message.author.id) + cooldown_amount;
            if (current_time < expiration_time){
                const time_left = (expiration_time - current_time);
                return message.channel.send(`You must wait ${time_left} before using this command.`);
            }
        }

        timestamps.set(message.author.id, current_time);
        setTimeout(() => timestamps.delete(message.author.id), cooldown_amount);

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
});

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


