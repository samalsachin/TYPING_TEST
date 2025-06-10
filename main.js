//add different levels to it. store the highest score in localstorage and make the input red when game over. maybe get words using api if i ever learn it


window.addEventListener('load', init);


//available levels
const levels={easy:6, medium:3, hard:2}


//to change levels
 currentLevel=levels.easy;

// global variables
let time; //=currentLevel;
let score=0;
let isPlaying;

//DOM elements

const wordInput=document.querySelector('#word-input');
const currentWord=document.querySelector('#current-word');
const scoreDisplay=document.querySelector('#score');
const timeDisplay=document.querySelector('#time');
const message=document.querySelector('#message');
const seconds=document.querySelector('#seconds');
const chooseLevel=document.querySelector('#chooseLevel');
const highScore=document.querySelector('#highScore');
const levelOnLoad=document.querySelector('.btn btn-success');

const words=['hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
'definition','instagram','solution','interactive','tutorial','learning','intimidating','photoshop','engineering','microprocessor','algorithm','conference','technique'
,'intelligence','architecture','design','explore'];


chooseLevel.addEventListener("change", changeLevel);

const changeLevel = () =>
{
	currentLevel=levels[chooseLevel.value];
	seconds.innerHTML=currentLevel;
	time=currentLevel;
	
}

//setting highest score
highScore.innerHTML=localStorage.getItem("highScore") || 0;

// initialize Game
function init(){

	
	//load a random word from the array
	

	showWord(words);
	time=currentLevel;

	//show number of seconds according to level in UI
	seconds.innerHTML=currentLevel;
	

	//call countdown every second
	setInterval(countdown,1000);

	//check game status
	setInterval(checkStatus,50);

	//start matching on word input
	wordInput.addEventListener('input', startMatch);

	

}

//Start match
function startMatch()
{
	if(matchWords())
	{
		isPlaying=true;
		time=currentLevel+1;  			//+1 because the page takes a sec to load
		showWord(words);
		wordInput.value='';
		score++;
	}
	else{
		console.log("no match words");
		console.log("next step!!");
	}

	//if score is -1, display 0
	if(score==-1)
	{
		scoreDisplay.innerHTML='0';
	}
	else{
		scoreDisplay.innerHTML=score;
}

}

function matchWords()
{

		if(wordInput.value===currentWord.innerHTML)
		{
			message.innerHTML="Correct!!!";
			return true;
		}
		else
		{
			message.innerHTML='';
			return false;
		}
}


//pick and show random word
function showWord(words)
{
	// generate random array index
	const randIndex=Math.floor(Math.random()*words.length);

	//output random word
	currentWord.innerHTML=words[randIndex];

}

//countdown timer
function countdown()
{
	// make sure time is not run out
	if (time>0) {
		//decrement
		time--;

	}
	else if(time===0)
	{
		//game is over
		isPlaying=false;
	}

	if(score>localStorage.getItem("highScore"))
	{
		newHighScore();
	}
	//Show time
	timeDisplay.innerHTML=time;
}

function checkStatus()
{
	if(!isPlaying && time===0)
	{
		message.innerHTML='Game Over!!!';
		score=-1;
	}
}
// new highscore ?
function newHighScore()
{
	localStorage.setItem("highScore",score);
	highScore.innerHTML=localStorage.getItem("highScore");

}
