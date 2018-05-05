var program_ver = '2018.0504';
var userPrompt = '';
var botPrompt = '[[b;#333;transparent]HelloBot][[;#333;transparent] ·] ';

var bot = new RiveScript();
bot.loadFile(["assets/brain/hellobot.rive"], on_load_success, on_load_error);

set_size();

$('.terminal').mousewheel(function(event) {
  console.log(event.deltaX, event.deltaY, event.deltaFactor);
});

$('.terminal').terminal(function(command, term) {
  var reply = null;
  if (command.length == 0) {
    return;
  }
  if (bot == null) {
    return;
  }
  if (command.toLowerCase() == '/help') {
    showHelp(term);
  } else {
		term.pause();
    reply = bot.reply("local-user", command);
    botRespond(term, reply);
    term.resume();
  }
	//setTimeout(function() {
	//	term.resume();
	//}, 1000);
}, {
  //prompt: '[[gb;#0c0;#000000]>_] ',
  name: 'HelloBot',
  onResize: set_size,
  history: false,
  greetings: null,
  onInit: function(term) {
    term.set_prompt('[[;#0074D9;transparent]][[b;#333;transparent]' + userPrompt + '][[;#0074D9;transparent]>] '); // default promptName: YOU
    header(term); // display header/logo
    botInit(term); // initialize bot 1st conversation
  },
  onClear: function(term) {
    header(term);
  },
  onBlur: function(term) {
    // call function to start counting the timer
  },
  onFocus: function(term) {
    // call function to mention the away timer
  },
  onRPCError: function(term) {},
  processRPCResponse: function(object) {},
  exceptionHandler: function(e) {
    console.log("Exception handled: " + e);
  },
});

function set_size() {
    var height = $(window).height();
    var width = $(window).width();
    $('.inner-wrapper').height(height);
    $('.inner-wrapper').width(width);
    $('.terminal').height(height - 50);
}

function botRespond(term, text) {
  term.echo(botPrompt + '[[;#666;transparent]' + text + ']');
}

function header(term) {
  term.echo(
    '[[b;#333;transparent]' +
    ' _____       _  _       _____       _   \n' +
    '|  |  | ___ | || | ___ | __  | ___ | |_ \n' +
    '|     || -_|| || || . || __ -|| . ||  _|\n' +
    '|__|__||___||_||_||___||_____||___||_| v' + program_ver + '\n' +
    ']' +
    '[[;#666;transparent]Just another AI Chatbot from Heiswayi Nrird]\n\n'
  );
}

function botInit(term) {
  botRespond(term, 'Hi..');
}

function showHelp(term) {
  botRespond(term, 'Looking for help? Why not you just directly ask me.');
}

function on_load_success() {
  bot.sortReplies();
}

function on_load_error(err) {
  console.log("Loading error: " + err);
}
