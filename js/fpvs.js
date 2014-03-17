/* Full Page vertical Slideshow javascript */
$(window).scroll(function(){
  
});

$(document).ready(function(){

	switchPanel();

})

var currentFpvs = 1;

function switchPanel(){
  
  console.log(currentFpvs);
  
  if(currentFpvs < 100){
  
  	$(".fpvs-slide:nth-child(" + currentFpvs + ")").hide(1000, function(){

  		currentFpvs++;
  		console.log(currentFpvs);

  	});

  }

}