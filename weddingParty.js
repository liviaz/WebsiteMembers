// wedding party animations

var main = function () {

	// if button is clicked, display list
	$(".party-button").hover(function () {
		// remove all currently displayed lists
		$("*").removeClass("party-button-selected");
		$(this).addClass("party-button-selected");
	});

	$(".party-button").click(function () {

		var typeSelected;
		var typeNotSelected;
		var typeNum;

		if (this.id === "button-girls"){
			typeSelected = "bridesmaids";
			typeNotSelected = "groomsmen";
			typeNum = 5;
		} else {
			typeSelected = "groomsmen";
			typeNotSelected = "bridesmaids";
			typeNum = 4;
		}

		// check which button was clicked, and show appropriate names
		if (!($("#" + typeSelected + "-list").hasClass("party-list-show"))){

			// first, remove other type if showing
			if($("#" + typeNotSelected + "-list").hasClass("party-list-show")){

				// fold them all in and remove text
				$("." + typeNotSelected + "-item").animate({'height': '0px'}, 200);
				$("." + typeNotSelected + "-item").promise().done(function() {
					$(this).text("");
					$("." + typeNotSelected + "-item").removeClass(typeNotSelected + "-item-show");
					$("#" + typeNotSelected + "-list").removeClass("party-list-show");
				});
			}

			// then fold out type to show
			$(":animated").promise().done(function(){

				$("#" + typeSelected + "-list").addClass("party-list-show");
				$("." + typeSelected + "-item").addClass(typeSelected + "-item-show");

				// fold out first one, then put the rest behind it
				var firstItem = $("." + typeSelected + "-item").first();
				firstItem.css({'width': '50%', 'margin-top': '0px', 'z-index': '5'});
				firstItem.text(firstItem.attr("id"));
				firstItem.animate({'height': '100px'}, 400);

				// expand all the rest behind the first one
				firstItem.promise().done(function (){
					firstItem.siblings().each(function (i){
						$(this).text(this.id);
						$(this).css({'height': '100px',
							'width': '50%',
							'margin-top': '0px'});
						$(this).css("zIndex", typeNum - 1 - i);
					});
				});

				// fold out the rest one by one
				var itemToFoldOut = $("." + typeSelected + "-item").first();
				var currMargin = 0;
				setTimeout(function () {
					foldOutItems(itemToFoldOut.next(), currMargin + 110);
				}, 400);
			});
		}
	});

	// recursive function to fold out members in list one at a time
	function foldOutItems(itemName, currMargin){
		if(itemName.length > 0){

			// fold this one out, then call function again after timeout
			itemName.animate({'margin-top': currMargin + 'px' }, 400);

			// move siblings with it
			itemName.promise().done(function() {

				itemName.siblings().each(function() {
					if($(this).css("z-index") < itemName.css("z-index")){
						$(this).css({'margin-top': currMargin + 'px'});
					}
				});

				// call function again
				setTimeout(function () {
					foldOutItems(itemName.next(), currMargin + 110);
				}, 50);

			});

		}
	}


}

$(document).ready(main);