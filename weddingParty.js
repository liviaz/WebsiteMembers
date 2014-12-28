// wedding party animations

var main = function () {

	// if button is clicked, display list
	$(".party-button").hover(function () {
		
		// remove all currently displayed lists
		$("*").removeClass("party-button-selected");
		$(this).addClass("party-button-selected");
		
		// check which button was clicked, and show appropriate names
		if (this.id === "button-girls"){

			// first, remove groomsmen if showing
			if($("#groomsmen-list").hasClass("party-list-show")){

				// fold in each one individually
				$(".groomsmen-item").each(function (i){
					$(this).animate({'height': '0px'}, 400);

				});

				$(".groomsmen-item").promise().done(function() {
					$(this).text("");
					$(".groomsmen-item").removeClass("groomsmen-item-show");
					$("#groomsmen-list").removeClass("party-list-show");
				});
			}

			// then fold out bridesmaids
			$(":animated").promise().done(function(){

				$("#bridesmaids-list").addClass("party-list-show");
				$(".bridesmaids-item").addClass("bridesmaids-item-show");

				// animate each one opening
				$(".bridesmaids-item").each(function (i) {
					$(this).text(this.id);
					$(this).animate({'height': '100px'}, 400);

				});
			});



		} else {

			// first, remove bridesmaids
			if($("#bridesmaids-list").hasClass("party-list-show")){

				// fold in each one individually
				$(".bridesmaids-item").each(function (i){
					$(this).animate({'height': '0px'}, 400);

				});

				$(".bridesmaids-item").promise().done(function(){
					$(this).text("");
					$(".bridesmaids-item").removeClass("bridesmaids-item-show");
					$("#bridesmaids-list").removeClass("party-list-show");
				});
			}

			// then fold out groomsmen
			$(":animated").promise().done(function(){
				$("#groomsmen-list").addClass("party-list-show");
				$(".groomsmen-item").addClass("groomsmen-item-show");

				// animate each one opening
				$(".groomsmen-item").each(function (i) {
					$(this).text(this.id);
					$(this).animate({'height': '100px'}, 400);
				});
			});

		}
	});


}

$(document).ready(main);