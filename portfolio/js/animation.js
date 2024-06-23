/*	
	usage: ASCIIAnimation(param1, param2, param3)
	
	param1 - array of animation 'frames' (strings)
	param2 - speed of animation in ms
	param3 - DOM target, inserts animation to .innerHTML (retains spaces)
	
	ex: 
	var anim1 = new ASCIIAnimation(["1","2","3"], 100, div1);
*/

const select = document.querySelectorAll.bind(document)
function ASCIIAnimation(animArray, speed,id) {
  let elemns = select("."+id)
  var currentFrame = 0;
   elemns.forEach(element => {
		for(var i = 0; i < animArray.length; i++) {
			animArray[i] = animArray[i].replace(/ /g,"&nbsp;");
			animArray[i] = "<pre>" + animArray[i] + "</pre>";
		}
		element.innerHTML = animArray[0];
		currentFrame++;
		this.animation = setInterval(function() {
			element.innerHTML = animArray[currentFrame];
			currentFrame++;
			if(currentFrame >= animArray.length) currentFrame = 0;
		}, speed);
		this.getCurrentFrame = function() {
			return currentFrame;
		}
   });
	
}

ASCIIAnimation.prototype.stopAnimation = function() {
	clearInterval(this.animation);
}



var animArray1 =  [".(^-^)'","-(^-^)-","'(^-^).","-(^o^)-",".(^-^)'","-(^-^)-","'(^-^).","-(^-^)-"];

var animArray2 = [
	"[>    ]",
	"[>>   ]",
	"[>>>  ]",
	"[ >>> ]",
	"[  >>>]",
	"[   >>]",
	"[    >]",
	"[     ]"
];

var animArray3 = [
	">   ", 
	" >  ", 
	"  > ", 
	"   >", 
	"   <", 
	"  < ", 
	" <  ",
	"<   "
];

var animArray4 = ["///","|||","\\\\\\","|||"];

var animArray5 = [
	"+--+\n" + 
	"|> |\n" +
	"|  |\n" +
	"+--+",
	"+--+\n" + 
	"| >|\n" +
	"|  |\n" +
	"+--+",
	"+--+\n" + 
	"| v|\n" +
	"|  |\n" +
	"+--+",
	"+--+\n" + 
	"|  |\n" +
	"| v|\n" +
	"+--+",
	"+--+\n" + 
	"|  |\n" +
	"| <|\n" +
	"+--+",
	"+--+\n" + 
	"|  |\n" +
	"|< |\n" +
	"+--+",
	"+--+\n" + 
	"|  |\n" +
	"|^ |\n" +
	"+--+",
	"+--+\n" + 
	"|^ |\n" +
	"|  |\n" +
	"+--+",
];


var animArrayErr6 = [
	"[>    ]",
	"[>>   ]",
	"[>>>  ]",
	"[ >>> ]",
	"[  >>>]",
	"[   >>]",
	"[    >]",
	"[     ]"
];


var animArrayErr7 = [
	"+--+\n" + 
	"|> |\n" +
	"|  |\n" +
	"+--+",
]
var animArrayErr = [
 "         (__)\n"+
 "	  (oo)\n"+
 "  /-------\\/\n"+
 " / |     ||\n"+
 "*  ||----||\n"+
 "   ~~    ~~",

 "         (__)\n"+
 "	  (--)\n"+
 "  /-------\\/\n"+
 " / |     ||\n"+
 "*  ||----||\n"+
 "   ~~    ~~"
]