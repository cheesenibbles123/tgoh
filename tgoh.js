const config = require("./config.json");
const Discord = require("discord.js");
const math = require('math.js');
const colours = require('colors');
const snekfetch = require("snekfetch");

//api's
const Urbanapi = "http://api.urbandictionary.com/v0/define?term=";
const google = require('google');
const mountnbladesite = "http://www.mnbcentral.net/";
//const weathersite = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";

//file systems
const fs = require("fs");

//bot itself
const prefix = config.prefix;
const bot = new Discord.Client();

////functions
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

function getRandomBetweenInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

function updatelist(msg){
	var interval = setInterval(function(){
		let finalmsg = ("```css\n"
						+"[All Servers]\n"
						+"```\n");
		snekfetch.get(mountnbladesite).then(r => {
			let allservers = (r.text).split('<tr>');
			let mod = "Full Invasion Osiris";
			let total = 0;
			for (i=0; i<allservers.length-1;){
				if (allservers[i].includes(mod)){
					let details = allservers[i].split("<td>");
					let name = details[1].slice(22,-20);
					let mode = details[3].slice(0,-16);
					let map = details[4].slice(0,-16);
					let currentpop = details[6].slice(0,-16);
					let maxpop = details[7].slice(0,-20);
					if (parseInt(currentpop) > 0){
						finalmsg = finalmsg + (`${name}, Mode: ${mode}, Map: ${map}, Playercount: ${currentpop}/${maxpop}\n`);
					}
				}
				i++;
			}
			msg.edit(finalmsg);
		});
	},300000);
};

//starting activity
bot.on("ready", () => {
	console.log('Bot '+(bot.user.username)+' is ready');
	bot.user.setActivity(';ListCommands');
	bot.channels.get("583976857712459826").send("Preparing server list").then(msg =>{
		updatelist(msg);
	});
});

bot.on('guildMemberAdd', member => {
    member.send("Welcome to The Gates Of Hell!,\n"
    			+"You can use ;ListCommands at any time in the server to get a DM containing all the current commands,\n"
    			+"Have fun!");
});

//Main code
bot.on("message", async message => {
	if (message.author.bot) return;
	
	if (message.channel.id === "626083867983347722"){
		let content = message.content;
		message.guild.createChannel(message.author.username,"text",[
			{
				id : "519197586788319232",
				deny : ['VIEW_CHANNEL'],
			},
			{
				id : `${message.author.id}`,
				allow : ["VIEW_CHANNEL"],
			},
		]);
		message.delete();
		let channelname = (message.author.username).toLowerCase().replace(/ /g, "-");
		console.log(channelname);
		channel = bot.channels.find("name",`${channelname}`).id;
		bot.channels.get(`${channel}`).send("Query is: "+content+" - please wait for a member of staff to respond to your ticket.");
	}

	let messagearray = message.content.split(" ");
	let command = messagearray[0].substring(1);
	command = command.toLowerCase();
	let args = messagearray.slice(1);
	
	//for debugging purposes

	console.log("------------------------------------------------------");
	console.log("Message Array: "+messagearray);
	console.log("Command is: "+colours.green(command));
	console.log("Arguments: "+args);
	console.log("Author is "+colours.green(message.author.username)+". In channel: "+colours.green(message.channel.name));

	//This is for the racism filter

	var msgcont = (message.content).toLowerCase();
	if (msgcont.includes('nigger') || msgcont.includes(" "+"nigger"+" ")){
		if (message.channel.id === "560808660843102213" || message.channel.id === "560808660843102213"){
			message.channel.send("Please refrain from using that.");
			return;
		}else{
			message.delete();
			message.channel.send("Please dont use that language!");
			bot.channels.get("").send("Mesage: "+msgcont+" - Deleted from "+message.channel.name+", Reason: contained N word.");
		}
	}
	//Includes

	if (message.content.includes(" "+"bot"+" ")) {
		message.react("👋");
	}
	if (message.content.includes("<@!305802257172135947>")) {
		message.react("534686451330318336");  
	}
	if (message.content.includes("<@!326375683108503552>")) {
		message.react("534059412239810560");  
	}
	if (message.content.includes("<@!537213775028420619>")) {
		message.react("<:1950_PingBoi:534059722840604682>");
		message.channel.send("Hi!");
	}
	if (message.content.toLowerCase().startsWith("welcome")) {
		message.channel.send("<:hello:532946740890959872>");
	}

	//Actual commands
	
	if (!message.content.startsWith(prefix)) return;

	//RIFS
	if (command === "rif"){
		fs.readFile("./RIFs/RIFs.txt", function(err,data){
			let rifs = data.split("¬");
			let num = getRandomInt(parseInt(rifs.length()-1));
			message.channel.send(rifs[num]);
		});
	}

	//Custom user images
	if (command ==="tgw") {
		message.channel.send({files: ["./images/TGW.png"]});
		message.channel.send("He'll take your soul :grimacing: ");
	} 
	if (command ==="uber") {
		message.channel.send({files: ["./images/Uber.jpg"]});
		message.channel.send(":regional_indicator_k: :information_source: :regional_indicator_n: :regional_indicator_g:");
	} 
	if (command ==="archie") {
		message.channel.send({files: ["./images/Archie.png"]});
		message.channel.send("Archie is the best dad"+" :heart:");
	} 
	if (command ==="lolsman") {
		message.channel.send({files: ["./images/lolsman.jpg"]});
	}
	if (command ==="tgoh") {
		message.channel.send({files: ["./images/TGOH.png"]});
	}
	if (command ==="frustration") {
		message.channel.send('https://giphy.com/gifs/54YjncKJ5GBn0gr4om');
	}
	if (command ==="bot") {
		message.channel.send("Hello! :wave::slight_smile:");
	}
	if (command ==="seffaf") {
		message.channel.send({files: ["./images/Seffaf.png"]});
	}
	if (command ==="eztrash") {
		message.channel.send({files: ["./images/eztrash.jpg"]});
	}
	if (command ==="greg") {
		message.channel.send({files: ["./images/Greg.png"]});
	}
	if (command ==="commander") {
		message.channel.send({files: ["./images/Commander.png"]});
	}
	if (command ==="france") {
		message.channel.send("https://tenor.com/view/viva-la-revolution-gif-11760395");
	}

	//Urban dictionary search
	if (command ==="usearch"){
		let word = args.join(' ');
		if(!word) return message.channel.send("Please provide a word.");
		let term = Urbanapi+'{'+word+'}';
		console.log(term);

		snekfetch.get(term).then(r => {
			let body = r.body;
			//console.log(body);
			let entry = body.list.find(post => post.word === word);
			if (entry === undefined){
				message.channel.send("Word: "+word+', has errored out.');
				return;
			}
			message.channel.send("According to:\n"
						+"```css\n"
						+"["+entry.author+"]\n"
						+"```"
						+"\n"
						+"Definition: \n"
						+entry.definition+"\n"
						+"\n"
						+"Permalink: <"+entry.permalink+">\n"
						+"Written on: "+(entry.written_on.substring(0,10))+"\n"
						+"Thumbs up: "+entry.thumbs_up+"\n"
						+"Thumbs down: "+entry.thumbs_down);
		});
	}

	//Google search
	if (command === 'gsearch'){
		let suffix = args.join(' ');
		console.log(suffix);
		google.resultsPerPage = 1;
  		google(suffix, function (err, res) {
        for (var i = 0; i < res.links.length; ++i) {
            var link = res.links[i];
            if (!link.href) {
                res.next;
            } else {
                let embed = new Discord.RichEmbed()
                    .setColor(`#ffffff`)
                    .setAuthor(`Result for "${suffix}"`, `https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png`)
                    .setDescription(`**Link**: [${link.title}](${link.href})\n**Description**:\n${link.description}`)
                    .setTimestamp()
                    .setFooter('API Lantancy is ' + `${Date.now() - message.createdTimestamp}` + ' ms', message.author.displayAvatarURL);
                message.channel.send({embed});
            };
        }
    });
	}

	if (command === "rolldie"){
		message.channel.send(getRandomInt(7));
	}
	if (command === "coinflip"){
		let side = parseInt(getRandomInt(2));
		if (side === 1){
			message.channel.send("Heads.");
		}
		if (side === 0){
			message.channel.send("Tails.");
		}
	}
	if (command === "rollcustomdie"){
		let min = parseInt(args[0]);
		let max = parseInt(args[1]);
		if (0 >= max){
			message.channel.send("Please enter a value greater than 0.");
			return;
		}
		if (max > 1){
			message.channel.send(getRandomBetweenInt(min,max));
		}
		if (isNan(min)){
			message.channel.send("Please enter a number.");
			return;
		}
		message.channel.send(getRandomInt(min));
	}
	
	//List the commands
	if (command ==="listcommands") {
		if (message.channel.type === "dm") {
			message.channel.send("This command only works when called within the server (will not work as a DM).");
		}
		let ListCommands = ("List of Commands\n"
							+"Begin each command with a ';'\n"
							+"\n"
							+"    *Custom images*\n"
							+"TGW\n"
							+"Uber\n"
							+"Archie\n"
							+"Lolsman\n"
							+"Seffaf\n"
							+"eztrash\n"
							+"Greg\n"
							+"\n"
							+"    *Commands*\n"
							+"bot\n"
							+"usearch *word* - Provides the first matching urban dictionary response\n"
							+"gsearch *word* - Provides the first matching google response\n"
							+"rolldie - Roll a 6 sided die\n"
							+"coinflip - flip a coin\n"
							+"rollcustomdie *min* *max* - roll a custom die with values between *min* and *max*, also works for just a maximum\n"
							+"\n");
		if (message.member.roles.has("527881157451448331")) {
			ListCommands = ListCommands+("-----------------Admin Stuff-----------------\n"
								+"	*Jarl's only*\n"
								+"\n"
								+"getserver - gets the server info for TGOH\n"
								+"mute user - mute a member (only works if the individual doesn't have admin enabled in permissions or for any of their current roles)\n"
								+"unmute user - unmute a member\n"
								+"clear *number* - clears the number of messages from the channel");
		}
		if (message.member.roles.has("548878177875787778")){
		ListCommands = ListCommands+("\n"
							+"    ***Work in Progress-Might crash the bot***\n"
							+"search *Item* - Search for an item\n"
							+"stats *Item* - List the stats of the selected item\n");
		}
		message.member.send(ListCommands);
	}

	//Admin commands
	if(message.member.roles.has("527881157451448331")){
		//mute
		if(command === 'mute'){
			let member = message.mentions.members.first();
			let role = "553247511423483914";
			member.addRole(role).catch(console.error);
			message.channel.send("muted "+member);
			member.send("You have been muted on TGOH.");
			bot.channels.get("554284312980357130").send("Muted:"+member);
		}
		if(command === 'unmute'){
			let member = message.mentions.members.first();
			let role = "553247511423483914";
			member.removeRole(role).catch(console.error);
			message.channel.send("unmuted "+member);
			member.send("You have been unmuted on TGOH.");
			bot.channels.get("554284312980357130").send("Unmuted:"+member);
		}
		//Clearing the chat
		if(command === 'clear'){
		var deleteCount = parseInt(args[0]);
		console.log(deleteCount);
		if (deleteCount === 0 || isNaN(deleteCount) || deleteCount < 0) {
			message.channel.send("Please enter a valid number.");
			return;
		}
		if (deleteCount > 100){
			let noruns = parseInt(deleteCount/100);
			let onesleft = deleteCount % 100;
			let runno = 0;
			while (noruns != runno){
				message.channel.bulkDelete(100).catch(error => message.reply("Couldn't delete messages because of:"+error+"."));
				runno++;
			}
			message.channel.bulkDelete(onesleft).catch(error => message.reply("Couldn't delete messages because of:"+error+"."));
			message.channel.send("deleted "+deleteCount+" messages.").then(message => {message.delete(3000)});
			}else{
				if (deleteCount <= 2){
					message.channel.send("Do it yourself you lazy bugger.");
					return;
				}else{
					message.channel.bulkDelete(deleteCount).catch(error => message.channel.send(`Counldn't delete messages because of: ${error}.`));
					message.delete();
					message.channel.send("Deleted "+deleteCount+" messages.").then(message => {message.delete(3000)});
				}
			}
		}
	}

	if (command === "restart"){
		if (message.author.id ==="337541914687569920"){
			process.exit();
		}else{
			message.reply("You cannot use this command");
		}
	}
	//End of admin commands

	return;
});

bot.on('error', console.error);

bot.login(config.token);