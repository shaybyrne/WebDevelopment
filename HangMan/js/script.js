//use to decide if the game can still be played
//it is set to true at the start of the game i.e. the game can be played now
//the game is over after correctly guessing the word or after 10 incorrect guesses, in which case it will be set to false
var still_can_play = true;

//list of possible words for the hangman game
var words = new Array("ELEPHANT", "GIRAFFE", "MONKEY", "CROCODILE", "LION", "TIGER");

//the game randomly chooses a word from the list of possible words, at the start this is initialised to empty
var random_word = "";

//this is the word that is gradually displayed on the screen, at the start this is initialised to empty, 
//then it is filled with the same number of hashes(#) as there are letters in the random word,
//when a letter is correctly guessed the appropriate hash is changed to the correct letter
var display_word = "";

//this is the list of all the letters guessed - both correct & incorrect, at the start this is initialised to empty
var used_letters = "";

//a running total of incorrect guesses is kept, at the start this is initialised to zero
var count_wrong_guesses = 0;

function selectLetter(selectedLetter) {
	if (still_can_play == false)
		{return;}
	if (used_letters.indexOf(selectedLetter) != -1)
		{return;}
	
	used_letters += selectedLetter;
	document.game.formUsedLetters.value = used_letters;

	if (random_word.indexOf(selectedLetter) != -1) {
		pos = 0;
		temp_mask = display_word;

		while (random_word.indexOf(selectedLetter, pos) != -1) {
			pos = random_word.indexOf(selectedLetter, pos);
			end = pos + 1;
			start_text = temp_mask.substring(0, pos);
			end_text = temp_mask.substring(end, temp_mask.length);
			temp_mask = start_text + selectedLetter + end_text;
			pos = end;
		}
		display_word = temp_mask;
		document.game.formDisplayWord.value = display_word;
		if (display_word.indexOf("#") == -1) {
			alert("Well done, you have won!");
			still_can_play = false;
		}
	}
	else {
		count_wrong_guesses += 1;
		eval("document.hm.src=\"images/hm" + count_wrong_guesses + ".gif\"");

		if (count_wrong_guesses == 10) {
			alert("Sorry, you have lost!");
			still_can_play = false;
		}
	}
}

//this function is called as the page is loaded, and whenever the user clicks the reset button
function reset() {
	//call the function to randomly select a word
	selectWord();
	document.game.formUsedLetters.value = "";
	used_letters = "";
	count_wrong_guesses = 0;
	document.hm.src="images/hmstart.gif";
}

function selectWord() {
	still_can_play = true;
	random_number = Math.round(Math.random() * (words.length - 1));
	random_word = words[random_number];
	masked_word = createMask(random_word);
	document.game.formDisplayWord.value = masked_word;
	display_word = masked_word;
}

function createMask(random_word) {
	mask = "";
	word_length = random_word.length;
	for (i = 0; i < word_length; i ++) {
		mask += "#";
	}
	return mask;
}