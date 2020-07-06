var cards = ["guardiola2.jpg", "klopp.jpg", "mourinho.jpg", "emery.jpg", "pochettino.jpg", 
"sarri.jpg", "sarri.jpg", "pochettino.jpg", "emery.jpg", "mourinho.jpg", "klopp.jpg", "guardiola2.jpg"];

var cards2 = ["arsenal.png", "manchesterU.png", "manchesterC.png", "tottenham.png", "liverpool.png", 
"chelsea.png", "chelsea.png", "manchesterC.png", "manchesterU.png", "arsenal.png", "liverpool.png", "tottenham.png"];

var cards3 = new Array(12);

//var c0 = document.getElementById('c0');

//c0.addEventListener("click", function() {revealCard(0)});

for (let j = 0; j < 12; j++)
{
	my_random = Math.floor(Math.random()*12);  // 0-11
	//my_random2 = my_random;

	var howMany = 0;

	for (let k = 0; k < 12; k++)
	{
		if(cards3[k] == cards[my_random])
			howMany++;
	}

	if (howMany >= 2)  // more exists one Card
	{
		j--;
	}
	else
	{
		cards3[j] = cards[my_random];
	}
} 

for (let j = 0; j < 12; j++)
{
	console.log(cards3[j]);
}

for (let i = 0; i < 12; i++)
{
	document.getElementById('c' + i).addEventListener("click", function(){revealCard(i)});
}

var secondCard = false;
var visible_nr;
var turnCounter = 0;
var lock = false;
var pairsLeft = 6;
var timer = 0;


function revealCard(number)
{
	var opacityValue = $('#c' + number).css('opacity');

	if (opacityValue != 0 && lock == false)
	{
		lock = true;
		var image = "url(img/" + cards3[number] + ")";

		$('#c' + number).css('background-image', image);
		$('#c' + number).addClass('cardA');
		$('#c' + number).removeClass('card');

		if(secondCard == false)  // first card
		{
			secondCard = true;
			visible_nr = number;
			lock = false;
		}
		else // second card
		{
			if(visible_nr == number)
			{
				lock = false;
			}
			else if(cards3[visible_nr] == cards3[number])
			{
				//console.log("pair");
				setTimeout(function() { 	hideTwoCards(number, visible_nr)}, 1000);
				secondCard = false;
				turnCounter++;
				$('.score').html('Turn counter: '+ turnCounter);
			}
			else
			{
				//console.log("not pair");
				setTimeout(function() { 	restoreTwoCards(number, visible_nr)}, 1000);
				secondCard = false;
				turnCounter++;
				$('.score').html('Turn counter: '+ turnCounter);
			}
		}
	}

	
}

function hideTwoCards(number1, number2)
{
	$('#c' + number1).css('opacity', '0');
	$('#c' + number2).css('opacity', '0');
	pairsLeft--;
	if (pairsLeft == 0)
	{
		$('.board').html('<h1>You win!<br>Done in ' + turnCounter+
			' turns<br><br><span class = "reset" onclick="location.reload()">Click and play again!</span></h1>');
	}

	lock = false;
}

function restoreTwoCards(number1, number2)
{
	$('#c' + number1).css('background-image', 'url("img/cards.png")');
	$('#c' + number1).addClass('card');
	$('#c' + number1).removeClass('cardA');

	$('#c' + number2).css('background-image', 'url("img/cards.png")');
	$('#c' + number2).addClass('card');
	$('#c' + number2).removeClass('cardA');

	lock = false;
}