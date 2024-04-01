/**
 * 
 */

$('.news-slick').slick({
	infinite: true,
	slidesToShow : 1,
	dots: true,
	autoplay: true,
});

$('.slick-dots button').text("");

$('.slick-prev').text("");
$('.slick-next').text("");

for(let i = 1; i<3; i++){
	$('.slick-dots button')[i].setAttribute("style", "background-color:gray;");
}
$('.slick-dots button')[0].setAttribute("style", "background-color:black; padding: 5px 10px;");

$('.news-slick').on('afterChange', function(event, slick, direction){
	for(let i = 0; i<3; i++){
		$('.slick-dots button')[i].setAttribute("style", "background-color:gray; padding: 5px;");
	}
	$('.slick-dots button')[direction].setAttribute("style", "background-color:black; padding: 5px 10px;");
});