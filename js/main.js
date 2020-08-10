;(function () {

    'use strict';

    var carousels = function() {
        $(".owl-carousel1").owlCarousel(
            {
                loop:true,
                center: true,
                margin:0,
                responsiveClass:true,
                nav:false,
                responsive:{
                    0:{
                        items:1,
                        nav:false
                    },
                    600:{
                        items:1,
                        nav:false
                    },
                    1000:{
                        items:3,
                        nav:true,
                        loop:false
                    }
                }
            }
        );

        $(".owl-carousel2").owlCarousel(
            {
                loop:true,
                center: false,
                margin:0,
                responsiveClass:true,
                nav:true,
                responsive:{
                    0:{
                        items:1,
                        nav:false
                    },
                    600:{
                        items:2,
                        nav:false
                    },
                    1000:{
                        items:3,
                        nav:true,
                        loop:true
                    }
                }
            }
        );
    }


    // svg responsive in mobile mode
    var checkPosition = function() {
        if ($(window).width() < 767) {
            $("#bg-services").attr("viewBox", "0 0 1050 800");

        }
    };

    (function($) {
        carousels();
        checkPosition();
    })(jQuery);


}());

// menu toggle button
function myFunction(x) {
    x.classList.toggle("change");
}
var words = document.getElementsByClassName('word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

function changeWord() {
  var cw = wordArray[currentWord];
  var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
  for (var i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }

  for (var i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }

  currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}

function animateLetterOut(cw, i) {
  setTimeout(function() {
		cw[i].className = 'letter out';
  }, i*80);
}

function animateLetterIn(nw, i) {
  setTimeout(function() {
		nw[i].className = 'letter in';
  }, 340+(i*80));
}

function splitLetters(word) {
  var content = word.innerHTML;
  word.innerHTML = '';
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerHTML = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }

  wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);
console.clear();
gsap.registerPlugin(MotionPathPlugin);

let targets = gsap.utils.toArray("#icons g");
let dotCenters = [50, 150, 250, 350, 450, 550];
let yCenter = 112;
let maxTravel = 500;
let minTravel = 100;
let mapper = gsap.utils.mapRange(minTravel, maxTravel, 0.5, 1);
let anim;
let activeDot = 0;
let targetDot;
let maxDur = 1;
let maxArc = 150;
let staggers = [0.2, 0.16, 0.135, 0.12, 0.11];

targets.forEach((obj, i) => {
  obj.index = i;
  obj.addEventListener("click", letsGoo);
});

function letsGoo() {
  targetDot = this.index;
  if (targetDot != activeDot) {
    if (anim && anim.isActive()) {
      anim.progress(1);
    }

    let oldX = dotCenters[activeDot];
    let newX = dotCenters[targetDot];
    let travel = Math.abs(oldX - newX);
    let factor = mapper(travel);
    let newArc = yCenter - maxArc * factor;
    let dur = maxDur * factor;
    let newStagger = staggers[travel / 100 - 1];
    let newPath = `M${oldX},${yCenter} Q${
      travel / 2 + Math.min(oldX, newX)
    },${newArc} ${newX},${yCenter}`;

    gsap.set("#main", { attr: { d: newPath } });
    anim = gsap
      .timeline()
      .to(".jumper", {
        motionPath: {
          path: "#main",
          align: "#main",
          alignOrigin: [0.5, 0.5]
        },
        stagger: newStagger,
        duration: dur,
        ease: "sine.inOut"
      })
      .to(
        ".jumper",
        { duration: dur / 2, attr: { rx: 40, ry: 40 }, yoyo: true, repeat: 1 },
        0
      );
  } else {
    return;
  }

  activeDot = targetDot;
}
