jQuery.fn.visible = function() {
	return this.css('visibility', 'visible');
};

jQuery.fn.invisible = function() {
	return this.css('visibility', 'hidden');
};

// returns the machineList that correspond to the first drop down machine type

function getMachineList(machineType){
	var machineList;

	if(machineType=='IC') {
		machineList = icMachines;
	} else if (machineType == 'OPTO') {
		machineList = optoMachines;
	}
	return machineList; // this will be undefined if the value doesn't match the above options
}

function setMachineOptions(value) {
	var length = 0;
	var machineList;

	//gets the length of the selected machine type 
	machineList = getMachineList(value); 
	if (machineList) { // make sure it's not undefined
		length = machineList.length;
	}

	// loop through the length of the machine name,
	//and add machine name to the select 
	//i=0 -> 'machine' , 
	//i=1 -> 'first maachine in 2nd dropdown box choice (eagleAero)', 
	//i=2 -> 'second maachine in 2nd dropdown box choice (ihawk)', 
	var options = '<option value="machine">Machine </option>';
		for(var i = 0; i<length; i++) {
			options +='<option value="' + i + '">' + machineList[i].machineName + '</option>';
		}
		return options;
}

function setMachineImage(machineObject) {
	return (
		'<div class="machineFilled">'
		+'<img src="' + machineObject.machineImage + '" width="300" height=300">'
		+'</div>'
	);
}

$(function(){
	$(".generateButton").invisible();

	// reset the state when back button is pressed at compare.html page
	$(".machine-type-select").eq(0).val('type');
	$(".machine-type-select").eq(1).val('type');
	$(".machine-select").eq(0).val('machine');
	$(".machine-select").eq(1).val('machine');

	//get the id for the first dropdown clicked
	//then based on the id, display it in respective dropdown box
	$(".machine-type-select").on('change', function() {
		var value = this.value; //selection (IC or OPTO)
		var id = $(this).data('id'); //id for the dropdown thumbnail that is selected for

		$("#machine-select" + id).html(setMachineOptions(value)); //set the value for 2nd dropdown box choice based on type selected
		$(".generateButton").invisible();

		$(".errorBox").hide();
	});

	$(".machine-select").on('change', function(){
		var value = this.value;
		var id = $(this).data('id');

		//need to get to know the machine type first before select 2nd option
		// traverse up dom, then go down to get first drop down value, which is the machine type.
		var machineType = $(this).parent(".dropdown").find(".machine-type-select").val();
		console.log(machineType);
		var machineList = getMachineList(machineType);

		if (value !== 'machine') { // make sure that it is not the default first value, 'machine'
		$('#machineBox' + id).html(setMachineImage(machineList[value])); //machineList[value] will get the right img src:"img/wb/ic/eagleAero.png"
		console.log("if:" + value);
		}

		var firstMachineType = $('.machine-type-select[data-id="0"]').val();
		var firstMachineValue = $('.machine-select[data-id="0"]').val();
		var secondMachineType = $('.machine-type-select[data-id="1"]').val();
		var secondMachineValue = $('.machine-select[data-id="1"]').val();

		// show generate button only when 2 of the 2nd dropdown value is not the default value. (machine)
		if (firstMachineValue != 'machine' && secondMachineValue != 'machine') {
			if (firstMachineValue == secondMachineValue && firstMachineType == secondMachineType) {
				$(".errorBox").show();
				$(".generateButton").invisible();
			}else {
				$(".errorBox").hide();
				$(".generateButton").visible();
			}
		}else {
			$(".generateButton").invisible();
		}
	});

	$(".generateButton").click(function(){
		var firstMachineType = $('.machine-type-select[data-id="0"]').val();
		var	firstMachineId = $('.machine-select[data-id="0"]').val();
		var	secondMachineType = $('.machine-type-select[data-id="1"]').val();
		var	secondMachineId = $('.machine-select[data-id="1"]').val();
		window.location.href = 'compare.html?id=' + firstMachineType + ';' + firstMachineId + ',' + secondMachineType + ';' + secondMachineId;

	});

}); //end of function