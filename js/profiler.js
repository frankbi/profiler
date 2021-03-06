var totalEntries;
var allData = [];
var current = 0;
var $menu, totalwidth;
var ds;


function init() {
	$("#detail").hide();
	$("#prevbtn").hide();
	
	//CLOSE BUTTON
	$("#detail #closebtn").click(function() {
		$("#detail").hide();
		$("#detail").animate({ opacity: '0' }, 500);
		$("#detail #vid").empty();
	});

	loadData(1);
	
}

function loadData(which) {
	//LOAD DATA WITH MISO
	//SAMPLE SPREADSHEET 
	//https://docs.google.com/spreadsheet/pub?key=0AurS2EUbrPERdE9Nc1dMSGdfenFCN0FCTk9jZF9TVWc&output=html
	ds = new Miso.Dataset({
  		importer : Miso.Dataset.Importers.GoogleSpreadsheet,
  		parser : Miso.Dataset.Parsers.GoogleSpreadsheet,
  		key : "0AurS2EUbrPERdE9Nc1dMSGdfenFCN0FCTk9jZF9TVWc", //CHANGE TO YOUR KEY HERE
  		worksheet : which
	});

	ds.fetch({ 
	  success : function() {
	    populateGrid();
	  },
	  error : function() {
	  	console.log("ERROR: Failed to load Google Spreadsheet");
	  }
	});
}


function showDetail(which) {
	current = which;

	console.log(current);

	$("#detail").show();
	$("#detail").animate({ opacity: '1' }, 500);
	
	$("#detail #name").text(allData[which][0].name);
	$("#detail #data1").html("<p>Data 1: " + allData[which][0].data1 + "</p>");
	$("#detail #data2").html("<p>Data 2: " + allData[which][0].data2 + "</p>");
	$("#detail #data3").html("<p>Data 3: " + allData[which][0].data3 + "</p>");
	$("#detail #blurb").html(allData[which][0].blurb);
	
	//LOAD AND DISPLAY PHOTO
	var img = new Image();
	img.src = "imgs/" + allData[which][0].photourl;
	img.height = 135;
	img.width = 115;
	$("#detail #photocon").empty();
	$("#detail #photocon").append(img);

	checkNav();
	
}

function nextPerson() {
	current ++;
	showDetail(current);
}
function prevPerson() {
	current --;
	showDetail(current);
}
function checkNav() {

	var $prevbtn = $("#prevbtn");
	var $nextbtn = $("#nextbtn");

	if (current == 0) {
		$prevbtn.hide();
	} else {
		$prevbtn.show();
	}

	if (current == totalEntries - 1) {
		$nextbtn.hide();
	} else {
		$nextbtn.show();
	}
}


function populateGrid() {
	var $len = ds.column("name").data.length;
	totalEntries = $len;
	
	//LOOP THRU GOOGLE DATA AND PUT INTO OBJECT
	for (var j=0; j<$len; j++) {
		var counter = ds.column("id").data[j];
		allData[counter] = [ {
								myid: ds.column("id").data[j],
								name: ds.column("name").data[j],
								data1: ds.column("data1").data[j],
								data2: ds.column("data2").data[j],
								data3: ds.column("data3").data[j],
								blurb: ds.column("blurb").data[j],
								photourl: ds.column("image").data[j],
						    }];
	}
	
	for (var i = 0; i<totalEntries; i++) {

		var context = {
			id: i,
			name: allData[i][0].name,
			photo: allData[i][0].photourl
		}

		$("#container").append(Handlebars.templates['th-template'](context));
		
	}
	
	
}

$(document).ready(function(){
	init();
});
