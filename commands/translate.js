module.exports = {
    name: 'translate',
    description: 'translate in and out of Stitch',
    execute(message, args, name, dm){
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