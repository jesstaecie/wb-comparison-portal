var MACHINE_ID_INDEX = 0;
var MACHINE_NAME_INDEX = 1;
var MACHINE_IMAGE_INDEX = 2;
var MACHINE_LINK_INDEX = 3;
var MACHINE_BOND_PLACEMENT_REPEATABILITY_INDEX = 4;
var MACHINE_BONDING_AREA_INDEX = 5;
var MACHINE_LOOP_TYPES_INDEX = 6;
var MACHINE_UPH_INDEX = 7;
var MACHINE_XY_RESOLUTION_INDEX = 8;
var MACHINE_Z_RESOLUTION_INDEX = 9;
var MACHINE_FINE_PITCH_CAPABILITY_INDEX = 10;
var MACHINE_LOOP_HEIGHT_VARIATION_INDEX = 11;
var MACHINE_WIRE_LENGTH_INDEX = 12;
var MACHINE_WIRE_CAPACITY_INDEX = 13;
var MACHINE_OPTICS_LENS_MAGNIFICATON_INDEX = 14;
var MACHINE_S_SCAN_VISION_ENGINE_INDEX = 15;
var MACHINE_RECOGNITION_RANGE_INDEX = 16;
var MACHINE_REFERENCE_SYSTEMS_INDEX = 17;
var MACHINE_CAMERA_TYPE_INDEX = 18;
var MACHINE_DEPTH_OF_FIELD_INDEX = 19;
var MACHINE_DIE_ROTATION_INDEX = 20;
var MACHINE_XY_MOTORS_TYPE_INDEX = 21;
var MACHINE_L_F_WIDTH_INDEX = 22;
var MACHINE_L_F_LENGTH_INDEX = 23;
var MACHINE_L_F_THICKNESS_INDEX = 24;
var MACHINE_DIE_SITE_INDEXING_PITCH_INDEX = 25;
var MACHINE_NO_OF_MAGAZINE_INDEX = 26;
var MACHINE_NO_OF_LEVELS_INDEX = 27;
var MACHINE_MAGAZINE_WIDTH_INDEX = 28;
var MACHINE_MAGAZINE_LENGTH_INDEX = 29;
var MACHINE_MAGAZINE_HEIGHT_INDEX = 30;
var MACHINE_SLOT_PITCH_INDEX = 31;
var MACHINE_SPOOL_DIAMETER_INDEX = 32;
var MACHINE_SPOOL_WIDTH_INDEX = 33;
var MACHINE_WIRE_COUNT_INDEX = 34;
var MACHINE_WIRE_END_INDEX = 35;
var MACHINE_DRIVE_MOTOR_TYPE_INDEX = 36;
var MACHINE_WIRE_CLAMP_INDEX = 37;
var MACHINE_BOND_TIME_RANGE_INDEX = 38;
var MACHINE_ULTRASONIC_MODE_INDEX = 39;
var MACHINE_TRANSDUCER_FREQUENCY_INDEX = 40;
var MACHINE_MAN_MACHINE_INTERFACE_INDEX = 41;
var MACHINE_STORE_MEDIA_INDEX = 42;
var MACHINE_POWER_INPUT_INDEX = 43;
var MACHINE_POWER_CONSUMPTION_INDEX = 44;
var MACHINE_MINIMUM_AIR_PRESSURE_INDEX = 45;
var MACHINE_AIR_CONSUMPTION_INDEX = 46;
var MACHINE_AIR_QUALITY_INDEX = 47;
var MACHINE_ENVIRONMENTAL_REQUIREMENT_INDEX = 48;
var MACHINE_MACHINE_OUTLINE_INDEX = 49;
var MACHINE_MACHINE_WEIGHT_INDEX = 50;
var MACHINE_MACHINE_SHIPPING_WEIGHT_INDEX = 51;
var MACHINE_INDEXERS_INDEX = 52;
var MACHINE_MATERIAL_HANDLING_KITS_INDEX = 53;
var MACHINE_HEAVY_WIRE_KIT_INDEX = 54;
var MACHINE_ILLUMINATION_KIT_INDEX = 55;
var MACHINE_QFN_KIT_INDEX = 56;
var MACHINE_CU_APPLICATION_INDEX = 57;
var MACHINE_EASY_CU_CONVERSION_INDEX = 58;
var MACHINE_SMART_PR_INDEX = 59;
var MACHINE_EASY_CU_LOOPING_INDEX = 60;
var MACHINE_SMART_WIRE_HANDLER_INDEX = 61;
var MACHINE_AUTO_WIRE_RETHREAD_INDEX = 62;


function getMachineList(machineType) {
  var machineList;

  if (machineType === 'IC') {
    machineList = icMachines;
  } else if(machineType === 'OPTO') {
    machineList = optoMachines;
  }

  return machineList; // this will be undefined if the value doesn't match the above options
}

//------ This function is to retrieve ID from url after selection of machines to compare--------\\
//1. get url
//2. split delimeter is '?''
//3. if after split, the length is more than 1, need to split again using ',' to get id
//4. using [] to get the respective 1st and 2nd id
$(function () {
    var href = location.href;
    var hrefList = href.split('?');
    if (hrefList.length > 1) { //split by ? and only get 1 length, prevent from failing. Don't have a ? inside href. *(sth?sth = length = 1)
      var queryString = hrefList[1]; //id=IC;3,OPTO;2
      var queryStringList = queryString.replace('id=','').split(','); //["IC;3", "OPTO;2"]

      var firstMachine = queryStringList[0]; //IC;0
      var secondMachine = queryStringList[1]; //OPTO;2

      var firstMachineType = firstMachine.split(';')[0];
      var firstMachineId = firstMachine.split(';')[1];
      var secondMachineType = secondMachine.split(';')[0];
      var secondMachineId = secondMachine.split(';')[1];

      // $.get("machinelist.txt", function(csvString) {
      //   var csvObject = Papa.parse(csvString);

      //   // Add machine image and name header to compare into machine-image-container
      //   $('#machine-image-container').append(machineImageToRender(queryStringList, csvObject.data));

      //   // Add machine image and name header to compare into machine-image-container
      //   // !!!!
      //   $('#machine-info-container').append(machineInfoToRender(queryStringList, csvObject.data));
      // });

      var firstMachine = getMachineList(firstMachineType)[parseInt(firstMachineId)];
      var secondMachine = getMachineList(secondMachineType)[parseInt(secondMachineId)];


      $("#machine-image-container").append(machineImageToRender(firstMachine, secondMachine));
      $("#machine-info-container").append(machineInfoToRender(firstMachine, secondMachine));



      $('.sidebar-container li').click(function() {
        // removing and adding class active on clicked nav bar so that different style can be applied on active nav bar
        $('.sidebar-container li').removeClass('active');
        $(this).addClass('active');
        var category = $(this).data('category');
        $('.category-field-name-container').hide(); // this will remove all machine-info categories
        $('#'+category+'-field-name-container').show(); // and show only the category which was clicked
      });
    }
 });


// Takes in queryStringList (contains id to compare), and csv data,
// and returns the DOM in string to be rendered
// The string contains machine image and machine name header
function machineImageToRender(firstMachine, secondMachine) {
  // Initialise with empty col-xs-3 which will offset category field name
  // E.g. Bond placement repeatability, Bonding area, Wireloop,
    var stringToRender = '<div class="col-xs-3"></div>';

    var machineName;
    var machineImage;
    var machineLink;

    machineName = firstMachine.machineName;
    machineImage = firstMachine.machineImage;
    machineLink = firstMachine.machineLink;

    stringToRender = stringToRender // append the dom to be rendered to existing stringToRender
    + '<div class="col-xs-3 compare-machine-item"><div class="compare-machine-item-bgnd">'
      + '<div class="compare-machine-name first-machine text-center">' + '<a href="' + machineLink + '" style="color:#ffffff">' + machineName + '</a></div>'
      + '<img src="' + machineImage + '" class="img-responsive">'
    + '</div></div>'

    machineName = secondMachine.machineName;
    machineImage = secondMachine.machineImage;
    machineLink = secondMachine.machineLink;

    stringToRender = stringToRender // append the dom to be rendered to existing stringToRender
    + '<div class="col-xs-3 compare-machine-item"><div class="compare-machine-item-bgnd">'
      + '<div class="compare-machine-name first-machine text-center">' + '<a href="' + machineLink + '" style="color:#ffffff">' + machineName + '</a></div>'
      + '<img src="' + machineImage + '" class="img-responsive">'
    + '</div></div>'

  return stringToRender;
}

function machineInfoToRender(firstMachine, secondMachine) {
  var stringToRender = "";
  var machineInfoData = [firstMachine, secondMachine]; // this will contain an array of machine info array
  
  //var machineFields = csvObjectData[0]; // this contains an array of fields names

  // Goes through a for loop for the queryStringList
  // After getting each id, use it to retrieve the machine info
  // For each row of machine info, add it to machineInfoData
  // This list contains an array of machine info to compare
  // for (var i=0; i<queryStringList.length; i++) {
  //   var machineId = parseInt(queryStringList[i]);
  //   // See: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push
  //   machineInfoData.push(csvObjectData[machineId]) //push new machine info data to existing data of array at the end
  // }

  stringToRender += bondingCapabilityToRender(machineFields, machineInfoData);
  stringToRender += wireLoopingToRender(machineFields, machineInfoData);
  stringToRender += visionOpticsToRender(machineFields, machineInfoData);
  stringToRender += workholderToRender(machineFields, machineInfoData);
  stringToRender += loaderUnloaderToRender(machineFields, machineInfoData);
  stringToRender += wireFeedToRender(machineFields, machineInfoData);
  stringToRender += bondHeadToRender(machineFields, machineInfoData);
  stringToRender += miscToRender(machineFields, machineInfoData);
  stringToRender += optionsToRender(machineFields, machineInfoData);
  stringToRender += otherFeaturesToRender(machineFields, machineInfoData);
  return stringToRender;
}


// Return the dom in string for bonding capability machine info to render
// Example:
// <div class="category-field-name-container" id="bonding-capability-field-name-container">
//   <div class="row">
//     <div class="col-xs-3">Bond placement repeatability</div>
//     <div class="col-xs-4">some bpr1</div>
//     <div class="col-xs-4">some bpr2</div>
//   </div>
//   <div class="row">
//     <div class="col-xs-3">Bond area</div>
//     <div class="col-xs-4">some ba1</div>
//     <div class="col-xs-4">some ba2</div>
//   </div>
// </div>
function bondingCapabilityToRender(machineFields, machineInfoData) {
  var stringToRender = "";
  var bondReplacementRepeatability = [];
  var bondingArea = [];
  var loopTypes = [];
  var uph = [];
  var xyResolution = [];
  var zResolution = [];
  var finePitchCapability = [];

  for (var i=0; i<machineInfoData.length; i++) {
    bondReplacementRepeatability.push(machineInfoData[i].bondPlacement);
    bondingArea.push(machineInfoData[i].bondingArea);
    loopTypes.push(machineInfoData[i].loopTypes);
    uph.push(machineInfoData[i].uPH);
    xyResolution.push(machineInfoData[i].xyResolution);
    zResolution.push(machineInfoData[i].zResolution);
    finePitchCapability.push(machineInfoData[i].finePitchCapability);
  }
  stringToRender += '<div class="category-field-name-container" id="bonding-capability-field-name-container">';
  stringToRender += machineFieldRow(machineFields[MACHINE_BOND_PLACEMENT_REPEATABILITY_INDEX], bondReplacementRepeatability);
  stringToRender += machineFieldRow(machineFields[MACHINE_BONDING_AREA_INDEX], bondingArea);
  stringToRender += machineFieldRow(machineFields[MACHINE_LOOP_TYPES_INDEX], loopTypes);
  stringToRender += machineFieldRow(machineFields[MACHINE_UPH_INDEX], uph);
  stringToRender += machineFieldRow(machineFields[MACHINE_XY_RESOLUTION_INDEX], xyResolution);
  stringToRender += machineFieldRow(machineFields[MACHINE_Z_RESOLUTION_INDEX], zResolution);
  stringToRender += machineFieldRow(machineFields[MACHINE_FINE_PITCH_CAPABILITY_INDEX], finePitchCapability);
  stringToRender += '</div>';
 
  return stringToRender;
}

function wireLoopingToRender(machineFields, machineInfoData) {
  var stringToRender = "";
  var loopHeightVariation = [];
  var wireLength = [];
  var wireCapacity = [];

  for (var i=0; i<machineInfoData.length; i++) {
    loopHeightVariation.push(machineInfoData[i].loopHeightVariation);
    wireLength.push(machineInfoData[i].wireLength);
    wireCapacity.push(machineInfoData[i].wireCapacity);
  }
  stringToRender += '<div class="category-field-name-container" id="wire-looping-field-name-container" style="display:none;">';
  stringToRender += machineFieldRow(machineFields[MACHINE_LOOP_HEIGHT_VARIATION_INDEX], loopHeightVariation);
  stringToRender += machineFieldRow(machineFields[MACHINE_WIRE_LENGTH_INDEX], wireLength);
  stringToRender += machineFieldRow(machineFields[MACHINE_WIRE_CAPACITY_INDEX], wireCapacity);
  stringToRender += '</div>';

  return stringToRender;
}

function visionOpticsToRender(machineFields, machineInfoData) {
  var stringToRender = "";
  var opticsLensMagnification = [];
  var sScanVisionEngine = [];
  var recognitionRange = [];
  var referenceSystems = [];
  var cameraType = [];
  var depthOfField = [];
  var dieRotation = [];

  for (var i=0; i<machineInfoData.length; i++) {
    opticsLensMagnification.push(machineInfoData[i].opticsLensMagnification);
    sScanVisionEngine.push(machineInfoData[i].sScanVisionEngine);
    recognitionRange.push(machineInfoData[i].recognitionRange);
    referenceSystems.push(machineInfoData[i].referenceSystems);
    cameraType.push(machineInfoData[i].cameraType);
    depthOfField.push(machineInfoData[i].depthOfField);
    dieRotation.push(machineInfoData[i].dieRotation);
  }
  stringToRender += '<div class="category-field-name-container" id="vision-optics-field-name-container" style="display:none;">';
  stringToRender += machineFieldRow(machineFields[MACHINE_OPTICS_LENS_MAGNIFICATON_INDEX], opticsLensMagnification);
  stringToRender += machineFieldRow(machineFields[MACHINE_S_SCAN_VISION_ENGINE_INDEX], sScanVisionEngine);
  stringToRender += machineFieldRow(machineFields[MACHINE_RECOGNITION_RANGE_INDEX], recognitionRange);
  stringToRender += machineFieldRow(machineFields[MACHINE_REFERENCE_SYSTEMS_INDEX], referenceSystems);
  stringToRender += machineFieldRow(machineFields[MACHINE_CAMERA_TYPE_INDEX], cameraType);
  stringToRender += machineFieldRow(machineFields[MACHINE_DEPTH_OF_FIELD_INDEX], depthOfField);
  stringToRender += machineFieldRow(machineFields[MACHINE_DIE_ROTATION_INDEX], dieRotation);
  stringToRender += '</div>';

  return stringToRender;
}

function workholderToRender(machineFields, machineInfoData) {
  var stringToRender = "";
  var xyMotorsType = [];
  var lfWidth = [];
  var lfLength = [];
  var lfThickness = [];
  var dieSiteIndexingPitch = [];

  for (var i=0; i<machineInfoData.length; i++) {
    xyMotorsType.push(machineInfoData[i].xyMotorsType);
    lfWidth.push(machineInfoData[i].lfWidth);
    lfLength.push(machineInfoData[i].lfLength);
    lfThickness.push(machineInfoData[i].lfThickness);
    dieSiteIndexingPitch.push(machineInfoData[i].dieSiteIndexingPitch);
  }
  stringToRender += '<div class="category-field-name-container" id="workholder-field-name-container" style="display:none;">';
  stringToRender += machineFieldRow(machineFields[MACHINE_XY_MOTORS_TYPE_INDEX], xyMotorsType);
  stringToRender += machineFieldRow(machineFields[MACHINE_L_F_WIDTH_INDEX], lfWidth);
  stringToRender += machineFieldRow(machineFields[MACHINE_L_F_LENGTH_INDEX], lfLength);
  stringToRender += machineFieldRow(machineFields[MACHINE_L_F_THICKNESS_INDEX], lfThickness);
  stringToRender += machineFieldRow(machineFields[MACHINE_DIE_SITE_INDEXING_PITCH_INDEX], dieSiteIndexingPitch);
  stringToRender += '</div>';

  return stringToRender;
}

function loaderUnloaderToRender(machineFields, machineInfoData) {
  var stringToRender = "";
  var noOfMagazine = [];
  var noOfLevels = [];
  var magazineWidth = [];
  var magazineLength = [];
  var magazineHeight = [];
  var slotPitch = [];

  for (var i=0; i<machineInfoData.length; i++) {
    noOfMagazine.push(machineInfoData[i].noOfMagazine);
    noOfLevels.push(machineInfoData[i].noOfLevels);
    magazineWidth.push(machineInfoData[i].magazineWidth);
    magazineLength.push(machineInfoData[i].magazineLength);
    magazineHeight.push(machineInfoData[i].magazineHeight);
    slotPitch.push(machineInfoData[i].slotPitch);
  }
  stringToRender += '<div class="category-field-name-container" id="loader-unloader-field-name-container" style="display:none;">';
  stringToRender += machineFieldRow(machineFields[MACHINE_NO_OF_MAGAZINE_INDEX], noOfMagazine);
  stringToRender += machineFieldRow(machineFields[MACHINE_NO_OF_LEVELS_INDEX], noOfLevels);
  stringToRender += machineFieldRow(machineFields[MACHINE_MAGAZINE_WIDTH_INDEX], magazineWidth);
  stringToRender += machineFieldRow(machineFields[MACHINE_MAGAZINE_LENGTH_INDEX], magazineLength);
  stringToRender += machineFieldRow(machineFields[MACHINE_MAGAZINE_HEIGHT_INDEX], magazineHeight);
  stringToRender += machineFieldRow(machineFields[MACHINE_SLOT_PITCH_INDEX], slotPitch);
  stringToRender += '</div>';

  return stringToRender;
}

function wireFeedToRender(machineFields, machineInfoData) {
  var stringToRender = "";
  var spoolDiameter = [];
  var spoolWidth = [];
  var wireCount = [];
  var wireEnd = [];

  for (var i=0; i<machineInfoData.length; i++) {
    spoolDiameter.push(machineInfoData[i].spoolDiameter);
    spoolWidth.push(machineInfoData[i].spoolWidth);
    wireCount.push(machineInfoData[i].wireCount);
    wireEnd.push(machineInfoData[i].wireEnd);
  }
  stringToRender += '<div class="category-field-name-container" id="wire-feed-field-name-container" style="display:none;">';
  stringToRender += machineFieldRow(machineFields[MACHINE_SPOOL_DIAMETER_INDEX], spoolDiameter);
  stringToRender += machineFieldRow(machineFields[MACHINE_SPOOL_WIDTH_INDEX], spoolWidth);
  stringToRender += machineFieldRow(machineFields[MACHINE_WIRE_COUNT_INDEX], wireCount);
  stringToRender += machineFieldRow(machineFields[MACHINE_WIRE_END_INDEX], wireEnd);
  stringToRender += '</div>';

  return stringToRender;
}

function bondHeadToRender(machineFields, machineInfoData) {
  var stringToRender = "";
  var driveMotorType = [];
  var wireClamp = [];
  var bondTimeRange = [];
  var ultrasonicMode = [];
  var transducerFrequency = [];

  for (var i=0; i<machineInfoData.length; i++) {
    driveMotorType.push(machineInfoData[i].driveMotorType);
    wireClamp.push(machineInfoData[i].wireClamp);
    bondTimeRange.push(machineInfoData[i].bondTimeRange);
    ultrasonicMode.push(machineInfoData[i].ultrasonic);
    transducerFrequency.push(machineInfoData[i].transducerFreq);
  }
  stringToRender += '<div class="category-field-name-container" id="bondhead-field-name-container" style="display:none;">';
  stringToRender += machineFieldRow(machineFields[MACHINE_DRIVE_MOTOR_TYPE_INDEX], driveMotorType);
  stringToRender += machineFieldRow(machineFields[MACHINE_WIRE_CLAMP_INDEX], wireClamp);
  stringToRender += machineFieldRow(machineFields[MACHINE_BOND_TIME_RANGE_INDEX], bondTimeRange);
  stringToRender += machineFieldRow(machineFields[MACHINE_ULTRASONIC_MODE_INDEX], ultrasonicMode);
  stringToRender += machineFieldRow(machineFields[MACHINE_TRANSDUCER_FREQUENCY_INDEX], transducerFrequency);
  stringToRender += '</div>';

  return stringToRender;
}

function miscToRender(machineFields, machineInfoData) {
  var stringToRender = "";
  var manMachineInterface = [];
  var storageMedia = [];
  var powerInput = [];
  var powerConsumption = [];
  var minAirPressure = [];
  var airConsumption = [];
  var airQuality = [];
  var environmentalRequirement = [];
  var machineOutline = [];
  var machineWeight = [];
  var machineShippingWeight = [];

  for (var i=0; i<machineInfoData.length; i++) {
    manMachineInterface.push(machineInfoData[i].manMachineInterface);
    storageMedia.push(machineInfoData[i].storageMedia);
    powerInput.push(machineInfoData[i].powerInput);
    powerConsumption.push(machineInfoData[i].powerConsumption);
    minAirPressure.push(machineInfoData[i].minAirPressure);
    airConsumption.push(machineInfoData[i].airConsumption);
    airQuality.push(machineInfoData[i].airQuality);
    environmentalRequirement.push(machineInfoData[i].environmentalRequirement);
    machineOutline.push(machineInfoData[i].machineOutline);
    machineWeight.push(machineInfoData[i].machineWeight);
    machineShippingWeight.push(machineInfoData[i].machineShippingWeight);
  }
  stringToRender += '<div class="category-field-name-container" id="misc-field-name-container" style="display:none;">';
  stringToRender += machineFieldRow(machineFields[MACHINE_MAN_MACHINE_INTERFACE_INDEX], manMachineInterface);
  stringToRender += machineFieldRow(machineFields[MACHINE_STORE_MEDIA_INDEX], storageMedia);
  stringToRender += machineFieldRow(machineFields[MACHINE_POWER_INPUT_INDEX], powerInput);
  stringToRender += machineFieldRow(machineFields[MACHINE_POWER_CONSUMPTION_INDEX], powerConsumption);
  stringToRender += machineFieldRow(machineFields[MACHINE_MINIMUM_AIR_PRESSURE_INDEX], minAirPressure);
  stringToRender += machineFieldRow(machineFields[MACHINE_AIR_CONSUMPTION_INDEX], airConsumption);
  stringToRender += machineFieldRow(machineFields[MACHINE_AIR_QUALITY_INDEX], airQuality);
  stringToRender += machineFieldRow(machineFields[MACHINE_ENVIRONMENTAL_REQUIREMENT_INDEX], environmentalRequirement);
  stringToRender += machineFieldRow(machineFields[MACHINE_MACHINE_OUTLINE_INDEX], machineOutline);
  stringToRender += machineFieldRow(machineFields[MACHINE_MACHINE_WEIGHT_INDEX], machineWeight);
  stringToRender += machineFieldRow(machineFields[MACHINE_MACHINE_SHIPPING_WEIGHT_INDEX], machineShippingWeight);
  stringToRender += '</div>';

  return stringToRender;
}

function optionsToRender(machineFields, machineInfoData) {
  var stringToRender = "";
  var indexers = [];
  var materialHandlingKits = [];
  var heavyWireKit = [];
  var illuminationKit = [];
  var qfnKit = [];
  var cuApplication = [];

  for (var i=0; i<machineInfoData.length; i++) {
    indexers.push(machineInfoData[i].indexers);
    materialHandlingKits.push(machineInfoData[i].materialHandlingKits);
    heavyWireKit.push(machineInfoData[i].heavyWireKit);
    illuminationKit.push(machineInfoData[i].illuminationKit);
    qfnKit.push(machineInfoData[i].qfnKit);
    cuApplication.push(machineInfoData[i].cuApplication);
  }
  stringToRender += '<div class="category-field-name-container" id="options-field-name-container" style="display:none;">';
  stringToRender += machineFieldRow(machineFields[MACHINE_INDEXERS_INDEX], indexers);
  stringToRender += machineFieldRow(machineFields[MACHINE_MATERIAL_HANDLING_KITS_INDEX], materialHandlingKits);
  stringToRender += machineFieldRow(machineFields[MACHINE_HEAVY_WIRE_KIT_INDEX], heavyWireKit);
  stringToRender += machineFieldRow(machineFields[MACHINE_ILLUMINATION_KIT_INDEX], illuminationKit);
  stringToRender += machineFieldRow(machineFields[MACHINE_QFN_KIT_INDEX], qfnKit);
  stringToRender += machineFieldRow(machineFields[MACHINE_CU_APPLICATION_INDEX], cuApplication);
  stringToRender += '</div>';

  return stringToRender;
}

function otherFeaturesToRender(machineFields, machineInfoData) {
  var stringToRender = "";
  var easyCuConversion = [];
  var smartPR = [];
  var easyCuLooping = [];
  var smartWireHandling = [];
  var autoWireRethread = [];

  for (var i=0; i<machineInfoData.length; i++) {
    easyCuConversion.push(machineInfoData[i].easyCuConversion);
    smartPR.push(machineInfoData[i].smartPR);
    easyCuLooping.push(machineInfoData[i].easyCuLooping);
    smartWireHandling.push(machineInfoData[i].smartWire);
    autoWireRethread.push(machineInfoData[i].autoWireRethread);
  }
  stringToRender += '<div class="category-field-name-container" id="other-features-field-name-container" style="display:none;">';
  stringToRender += machineFieldRow(machineFields[MACHINE_EASY_CU_CONVERSION_INDEX], easyCuConversion);
  stringToRender += machineFieldRow(machineFields[MACHINE_SMART_PR_INDEX], smartPR);
  stringToRender += machineFieldRow(machineFields[MACHINE_EASY_CU_LOOPING_INDEX], easyCuLooping);
  stringToRender += machineFieldRow(machineFields[MACHINE_SMART_WIRE_HANDLER_INDEX], smartWireHandling);
  stringToRender += machineFieldRow(machineFields[MACHINE_AUTO_WIRE_RETHREAD_INDEX], autoWireRethread);
  stringToRender += '</div>';

  return stringToRender;
}

// Return each machine info row
// Example:
// <div class="row">
//   <div class="col-xs-3">Bond placement repeatability</div>
//   <div class="col-xs-4">some bpr1</div>
//   <div class="col-xs-4">some bpr2</div>
// </div>

function machineFieldRow(machineField, machineInfoList) {
  var stringToRender = "";
  stringToRender += '<div class="row">';
  stringToRender += '<div class="col-xs-3 machine-info-highlight"><b>' + machineField + '</b></div>';
  for (var i=0; i<machineInfoList.length; i++) {
    stringToRender += '<div class="col-xs-3 machine-info-item-container text-center" ><div class="machine-info-item-highlight-bgnd"><div class="machine-info-item-highlight">' + machineInfoList[i] + '</div></div></div>'
  }
  stringToRender += '</div>';

  return stringToRender;
  console.log(machineInfoList[i]);
}