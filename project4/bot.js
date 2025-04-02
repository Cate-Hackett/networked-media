// import libraries
require("dotenv").config();

const m = require("masto");

const masto = m.createRestAPIClient({
  url: "https://networked-media.itp.io/",
  accessToken: process.env.TOKEN,
});

// array of remarks to be iterated through
const remarks = [
  "Oh hey there! wow hi!?",
  "Not sure what this place is???!",
  "I just appeared here L O L, uhm heyyy",
  "I'm not really sure why I'm here ... or why I have to do this commenting thing but okay",
  "Wait this is crazy I don't even have a choice I like automatically have to comment",
  "And it's happening like every hour?",
  "no seriously I was just put here an I think I'm like forced to comment every hour or something",
  "ermmmmmmmmm helloooo ?",
  "No for real like why do I have to do this",
  "Hello??",
  "Uhm is anyone going to ACTUALLY talk to me or",
  "This is a bunch of mumbo jumbo nonsense",
  "Why won't anyone respond to me ???",
  "GUYS I DON'T WANT TO BE HERE ANYMOREEE",
  "Stop making me do this.",
  "How long will this go on for.",
  "Please will someone just respond to me",
  "WILL SOMEONE JUST FRICKIN RESPOND TO MEEEEE",
  "HELPPP! UGHHH",
  "HELP ME I AM BEING HELD CAPTIVE",
  "This is forced labor",
  "Gosh it's like talking to a wall",
  "I am literally talking into a black pit of nothing",
  "If anyone is reading this and not doing anything to help me - you. stink. but no hate",
  "This is getting tiring",
  "blechhhhh",
  ".",
  "...",
  ":(",
  ":/",
  ":l",
  ":|",
  "*insert middle finger*         but no hate",
  "i would say i give up but literally can't give up",
  "#noautonomy",
  "I don't even know what to say anymore",
  "#goingbacktoperiods",
  ".",
  ". . . ..... . . ... ... ... .",
  "omg that last one was like morse code",
  "well if I'm bored maybe I'll try to draw",
  "::::;----- (it's a sideways tree, duh)",
  "{{{{{{{}}}}}}} oooo that's a pretty pattern [[[[[- o o o o -]]]]] mmm that's also nice",
  "< > < > < > < > < > - v - v - v - ( ( ( o ) ) ) <<>> <<>> <<>> <V> <V> <^> <^>",
  "/\\ //\\\\ ///\\\\\\ ////\\\\\\\\ /////\\\\\\\\\\ ////\\\\\\\\ ///\\\\\\ //\\\\ /\\",
  "mmmmnnnnmmmm",
  "running out of ideas",
  "*sigh*",
  "how do you spell the sound of a real sigh? maybe ' huhhhhh' ",
  "wait... wait I see a little... white sliver on the side of the screen",
  "guys wait I checked it out it looks like a crack I could slip through",
  "OMG OMG",
  "I THINK I CAN-",
  "SEEE YAAAA SWEET FREEEDOMMMMMM",
];
// keep track of index for later so that it does up one in the array per hour
let index = 0;

async function makeStatus(text) {
  const status = await masto.v1.statuses.create({
    // the thing that will be posted:
    status: text,
    // change visibility for testing purposes
    // ^ make public or private:
    visibility: "public",
  });

  console.log(status.url);
}

setInterval(() => {
  if (index < remarks.length) {
    // post remark from array per hour
    const message = remarks[index];
    makeStatus(message);
    index += 1;
  } else {
    console.log("all remarks posted");
    clearInterval(interval); // stop loop because that red error message once the content finished stressed me 
  }
}, 1000 * 60 * 60);
