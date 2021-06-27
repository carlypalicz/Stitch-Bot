module.exports = {
    name: 'translate',
    description: 'translate in and out of Stitch',
    execute(message, args, name, dm, alphabet){
        let rand = Math.random();
        let z1 = rand < .5;

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
}
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