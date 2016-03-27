jQuery.fn.visible = function() {
    return this.css('visibility', 'visible');
};

jQuery.fn.invisible = function() {
    return this.css('visibility', 'hidden');
};

$(function () {
		$.get("machinelist.csv", function(csvString) {
				// Append DOM from csv to #machine-items-container
				var csvObject = Papa.parse(csvString);
				var title = csvObject.data[0];

				// csvObject.data.length-1, -1 because papa library has extra
				// __proto__(papa's functions inside) array appended after last array
				for(var i=0; i<csvObject.data.length-2; i++) {
					$('#machine-items-container').append(machineItemRowHtml(csvObject.data[i+1][1], csvObject.data[i+1][0], csvObject.data[i+1][2]));
				}

				// On click setup
				$(".compare-product").invisible();

				// When user selects 2 buttons,
				// tore machine-id and show compare product button

				// 1. show that you have clicked, remove click when you unclick
				// 2. click machine-id -> get id
				// 3. store 2 id
				// 4. after click 2, show compare-product

				var firstMachineItemId, secondMachineItemId;
					$(".select-machine-item-image, .select-machine-item .machine-greybox").click(function() {
					var $selectMachineItemSelect = $(this).parents('.select-machine-item').find('.select-machine-item-select');

					var machineId = $selectMachineItemSelect.data("machine-id");

					if (machineId == firstMachineItemId || machineId == secondMachineItemId) { // remove
							if (machineId == firstMachineItemId) {
								firstMachineItemId = undefined;
							} else {
								secondMachineItemId = undefined;
							}
							$selectMachineItemSelect.attr("src", "img/white.png");

					} else { // add
						if (firstMachineItemId == undefined && machineId != secondMachineItemId) { // first container is empty
							firstMachineItemId = machineId;
							$selectMachineItemSelect.attr("src", "img/green.png");
						} else if (secondMachineItemId == undefined && machineId != firstMachineItemId) {
							secondMachineItemId = machineId;
							$selectMachineItemSelect.attr("src", "img/green.png");
						}

					}

					if (firstMachineItemId != undefined && secondMachineItemId != undefined) { // full
						$(".select-machine-item-select")
						.not(".select-machine-item-select[data-machine-id="+firstMachineItemId+"]") //plus three strings tgt => .machineitem[data-id=5]
						.not(".select-machine-item-select[data-machine-id="+secondMachineItemId+"]")
						.attr("src", "img/faded.png");

						$selectMachineItemSelect.parents(".select-machine-item").find(".compare-product").visible();
					} else { // not full
						$(".select-machine-item-select")
						.not(".select-machine-item-select[data-machine-id="+firstMachineItemId+"]") //will select either one with id
						.not(".select-machine-item-select[data-machine-id="+secondMachineItemId+"]")
						.attr("src", "img/white.png");

						$(".compare-product").invisible();
					}

				});


				// When user clicks compare product,
				// bring user to url with querystring id equals to 2 product id

				$(".compare-product").click(function() {
					var url = "compare.html" + "?id=" + firstMachineItemId + "," + secondMachineItemId;
					window.location = url;
				});

		});
});


function machineItemRowHtml(machineName, machineId, machineImage) {
	return (
		'<div class="col-sm-4 select-machine-item">'
			+ '<div class="center-block">'
				+ '<img src="img/wb-img/wb-thumbnails/'+ machineImage + '" class="img-responsive select-machine-item-image" >'
				+ '<div class="machine-greybox text-center" style="color:white">'
					+ machineName	+ ' <img src="img/white.png" width="20" height="20" align="right" data-machine-id="' + machineId + '" class="select-machine-item-select">'
				+ '</div>'
			+ '</div>'
			+ '<div class="center-block">'
				+ '<div class="compare-product text-center">'
					+ '<span> Compare Product </span>'
				+ '</div>'
			+ '</div>'
		+ '</div>'
	);
}
