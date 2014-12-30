// wedding party animations

var main = function () {

	var blockSize = 200;
	$("#party-content").css({'height': blockSize*6 + 'px'});

	// if button is clicked, display list
	$(".party-button").hover(function () {
		// remove all currently displayed lists
		$("*").removeClass("party-button-selected");
		$(this).addClass("party-button-selected");
	});

	// on click, fold in currently displaying type and fold out other type
	$(".party-button").click(function () {

		var typeSelected;
		var typeNotSelected;
		var typeNum;
		var displayDelay = 0;

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
			if($("#" + typeNotSelected + "-list").hasClass("party-list-show")) {
				setTimeout(function () {
					removeNotSelected(typeNotSelected);
				}, 0);

				displayDelay = 400;
			}

			// then fold out type to show
			$(":animated").promise().done(function(){
				setTimeout(function() {
					addSelected(typeSelected, blockSize, typeNum);
				}, displayDelay);

			});
		}
	});

	// recursive function to fold out members in list one at a time
	function foldOutItems(itemName, currMargin){
		if(itemName.length > 0){

			// fold this one out, then call function again after timeout
			itemName.velocity({'margin-top': currMargin + 'px' }, 300);

			// move siblings with it
			itemName.promise().done(function() {

				itemName.siblings().each(function() {
					if($(this).css("z-index") < itemName.css("z-index")){
						$(this).css({'margin-top': currMargin + 'px'});
					}
				});

				// call function again
				setTimeout(function () {
					foldOutItems(itemName.next(), currMargin + blockSize + 10);
				}, 50);
			});
		}
	}

	// remove items before displaying other type of items
	function removeNotSelected(typeNotSelected){

		// fold them all in and remove text
		$("." + typeNotSelected + "-item").velocity("fadeOut", {duration : 200});

		$("." + typeNotSelected + "-item").promise().done(function() {
			$("." + typeNotSelected + "-item").css({'height': '0px', 'margin-top': '10px'});
			$(".sub-item-show").removeClass("sub-item-show");
			$("." + typeNotSelected + "-item").removeClass(typeNotSelected + "-item-show");
			$("#" + typeNotSelected + "-list").removeClass("party-list-show");
		});
	}

	// add items of desired type
	function addSelected(typeSelected, blockSize, typeNum){
		$("#" + typeSelected + "-list").addClass("party-list-show");

		// fade in first one, then put the rest behind it
		var firstItem = $("." + typeSelected + "-item").first();
		firstItem.css({'width': '600px', 'margin-top': '0px',
			'z-index': typeNum, 'height': blockSize + 'px'});
		firstItem.velocity("fadeIn", {duration: 400});
		firstItem.children(".sub-item").addClass("sub-item-show");
		firstItem.children(".sub-item").css({'height' : blockSize - 40 + 'px'});

		// expand all the rest behind the first one
		$("." + typeSelected + "-item").addClass(typeSelected + "-item-show");

		firstItem.promise().done(function (){
			firstItem.siblings().each(function (i){
				$(this).children(".sub-item").addClass("sub-item-show");
				$(this).children(".sub-item").css({'height' : blockSize - 40 + 'px'});
				$(this).css({'height': blockSize + 'px',
					'opacity': 1,
					'display':'block',
					'width': '600px',
					'margin-top': '0px'});
				$(this).css("zIndex", typeNum - 1 - i);
			});
		});

		// fold out the rest one by one
		var itemToFoldOut = $("." + typeSelected + "-item").first();
		var currMargin = 0;
		setTimeout(function () {
			foldOutItems(itemToFoldOut.next(), currMargin + blockSize + 10);
		}, 600);
	}

}

$(document).ready(main);