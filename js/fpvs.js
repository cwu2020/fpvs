/* Full Page vertical Slideshow javascript */

$(document).ready(function(){
    $(this).scrollTop(0); // makes sure user starts at beginning on reload
});

// desktop
var delta = 0;
var currentSlideIndex = 0;
var scrollThreshold = 5;
var slidesWrapper = $(".fpvs-wrapper");
var slides = $(".fpvs-slide");
var numSlides = slides.length - 1;
var isScrolling = 0;

function elementScroll (e) {

	if(isScrolling == 0){ // if the user is not already scrolling

		// elementScroll.stopPropagation();
		// elementScroll.preventDefault();

		// --- Scrolling up ---
		if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {	

			delta--;
			if ( Math.abs(delta) >= scrollThreshold) {
				prevSlide();
			}
		}

		// --- Scrolling down ---
		else {

			delta++;

			if (delta >= scrollThreshold) {
				nextSlide();
			}
		}

		// Prevent page from scrolling
		return false;

	}
	return false;
}


function showSlide() {

	// reset
	delta = 0;
	//
	isScrolling = 1; // we are scrolling already

	slides.each(function(i, slide) {
		$(slide).toggleClass('active', (i >= currentSlideIndex));
	});

	setTimeout(function(){ // prevent scrolling for the duration of 2 * animation transition (in css file) (because one animation for current and one for next)
		isScrolling = 0;
	}, 1800);

}

function hideWrapper() {

	isScrolling = 1; // we are scrolling already

	slidesWrapper.toggleClass('out-of-sight');

	setTimeout(function(){ // prevent scrolling for the duration of 2 * animation transition (in css file) (because one animation for current and one for next)
		isScrolling = 0;
	}, 900);

}

function showWrapper() {

	isScrolling = 1; // we are scrolling already

	slidesWrapper.toggleClass('out-of-sight');

	setTimeout(function(){ // prevent scrolling for the duration of 2 * animation transition (in css file) (because one animation for current and one for next)
		isScrolling = 0;
	}, 900);

}


function prevSlide() {

	currentSlideIndex--;

	console.log(currentSlideIndex + '/' + numSlides);

	if (currentSlideIndex < 0) {
		currentSlideIndex = 0;
	}

	showSlide();
}

function nextSlide() {

	currentSlideIndex++;

	console.log(currentSlideIndex + '/' + numSlides);
	
	// if (currentSlideIndex > numSlides) { 
	// 	currentSlideIndex = numSlides;
	// }
	
	if (currentSlideIndex > numSlides) { 
		currentSlideIndex = numSlides;
		hideWrapper();
	}
	else{
		showSlide();
	}
	
}

slidesWrapper.on({
	'DOMMouseScroll mousewheel': elementScroll
});

$(function(){
    //This variable is used to prevent event flooding
    var preventRefire = false;

    //Bind all possible events
    $(document).bind("DOMMouseScroll mousewheel scroll keyup", function(event){
        //If an event was fired recently, return
        if(preventRefire) return;

        if(event.type == "keyup"){
            //If key is not up arrow or page up, return
            if(event.which != 38 && event.which != 33) return;

            //If an input field is focused, don't fire, return
            if($('input:focus,textarea:focus').length != 0) return;
        }

        if(event.type == "mousewheel" || event.type == "DOMMouseScroll"){
            //Guess scroll direction
            var deltaY = 0;
            if(event.wheelDelta) deltaY = event.wheelDelta;
            if(event.detail) deltaY = -event.detail;

            //If user mousewheeled down, don't fire, return
            if(deltaY <= 0) return;
        }

        //Finally, are we at the top?
        if($(document).scrollTop() == 0){
            //Prevent event to refire within 2 seconds
            preventRefire = true;
            setTimeout(function(){ preventRefire = false; }, 2000);

            //This is where you do your stuff
            showWrapper();
        }
    });
});

// mobile

// var dragThreshold = 0.15;// "percentage" to drag before engaging
// var dragStart = null;	 // used to determine touch / drag distance
// var percentage = 0;
// var target;
// var previousTarget;

// function touchStart(event) {

// 	if (dragStart !== null) { return; }
// 	if (event.originalEvent.touches) { 
// 		event = event.originalEvent.touches[0];
// 	}

// 	// where in the viewport was touched
// 	dragStart = event.clientY;

// 	// make sure we're dealing with a slide
// 	target = slides.eq(currentSlideIndex)[0];	

// 	// disable transitions while dragging
// 	target.classList.add('no-animation');

// 	previousTarget = slides.eq(currentSlideIndex-1)[0];
// 	previousTarget.classList.add('no-animation');
// }

// function touchMove (event) {

// 	if (dragStart === null) { return; }

// 	if (event.originalEvent.touches) { 
// 		event = event.originalEvent.touches[0];
// 	}

// 	delta = dragStart - event.clientY;
// 	percentage = delta / $(window).height();
// 	// alert(percentage);

// 	// Going down/next. Animate the height of the target element.
// 	if (percentage > 0) {
// 		target.style.height = (100-(percentage*100))+'%';
// 		if (previousTarget) { 
// 			previousTarget.style.height = ''; 	// reset
// 		}
// 	}

// 	// Going up/prev. Animate the height of the _previous_ element.
// 	else if (previousTarget) {
// 		previousTarget.style.height = (-percentage*100)+'%';
// 		target.style.height = '';	// reset
// 	}

// 	// Don't drag element. This is important.
// 	return false;
// }

// function touchEnd () {

// 	dragStart = null;
// 	target.classList.remove('no-animation');
// 	if (previousTarget) { 
// 		previousTarget.classList.remove('no-animation'); 
// 	}

// 	if (percentage >= dragThreshold) {
// 		nextSlide();
// 	}
// 	else if ( Math.abs(percentage) >= dragThreshold ) {
// 		prevSlide();
// 	} else {
// 		// show current slide i.e. snap back
// 		showSlide();
// 	}

// 	percentage = 0;

// }

// $("#projects").on({
// 	'touchstart': touchStart,
// 	'touchmove': touchMove,
// 	'touchend': touchEnd
// });