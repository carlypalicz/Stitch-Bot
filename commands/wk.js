module.exports = {
    name: 'wk',
    description: 'outputs wittle kitten',
    execute(message, args){
        let output = 'I don’t feel like you should be my wittle kitten though. I don’t know if that’s appropriate. I can’t have a cat anyway because I’m gonna be going on tour, so I won’t be able to take care of you. And then you’ll starve to death and then the rats will come out and then they’ll eat you. And then I’ll get home and find this like- kitten corpse eaten by rats. And at that point the rats will have probably bred and there’ll be like, tons of rats inside the house and then they’ll form their own little rat hierarchy and soon there’ll be a little rat civilization. And I’m gonna come home and have to like, deal with this whole hierarchy of rats and civilizations. And there will be race wars within the rats and I won’t be able to keep up with all the crazy shit that’s going on in my own apartment... So, no. Probably shouldn’t be my wittle kitten.';
        message.channel.send(output);    }
}