crm.ready(function () {
	if (crm("oppo_description").getMode()=="view")
	{
		// Get All Stages
		getOppoStagesFl();	
	}
	
});

function getOppoStagesFl() {
	$.ajax({
	  method: "GET",
	  url: "../custompages/oppo_bar/fluxoppobar.asp"
	}).done(function(data) {
		console.log( "success" );
		buildOppoBarFl(data.Oppo_Stages);

	}).fail(function(jqXHR, textStatus ) {
		console.log("Request failed: " + textStatus);
		console.log( "error" );
	});
}

function buildOppoBarFl(allStages) {
	var markupScreen = "<tr><TD></TD><TD><TABLE><TR>" + getOppoBarMarkupFl(allStages, crm("oppo_stage").text()) + "</TR></TABLE></TD></tr>";
	$("TR.GridHeader").first().before(markupScreen);
	console.log(markupScreen);
}


function getOppoBarMarkupFl(allStages, stage) {
	var count = allStages.length;
	var width = "width: " + 100 / count + "%;";
	var backgroundCol = "background-color: rgb(75, 202, 132);";
	var cssClass = " oppoInnerPrevFl ";
	
	var _markup = "<div id=\"_pnlOppoBar\" class=\"TSPanel\" style=\"height: 28px; border-radius: 25px; margin-right: -45px;\">";
	
	if (allStages[0].oppo_stage === stage) {
		cssClass = " oppoInnerNextFl ";
		_markup += "<div class=\"oppoInnerCurrFl oppoInnerBarFl firstBarFl\" style=\""+width+"\">"+allStages[0].oppo_stage+"</div>";	
	} else {
		_markup += "<div class=\""+cssClass+" oppoInnerBarFl firstBarFl\" style=\""+width+"\">"+allStages[0].oppo_stage+"</div>";	
	}
	
	for (var i=1; i < count - 1; i ++) {
		if (allStages[i].oppo_stage === stage) {
			cssClass = " oppoInnerNextFl ";
			_markup += "<div class=\"oppoInnerCurrFl oppoInnerBarFl\" style=\""+width+"\">"+allStages[i].oppo_stage+"</div>";
		} else {
			_markup += "<div class=\""+cssClass+" oppoInnerBarFl\" style=\""+width+"\">"+allStages[i].oppo_stage+"</div>";
		}
	}
	
	if (allStages[count -1].oppo_stage === stage) {
		cssClass = " oppoInnerNextFl ";
		_markup += "<div class=\"oppoInnerCurrFl oppoInnerBarFl lastBarFl\" style=\""+width+"\">"+allStages[count -1].oppo_stage+"</div>";
	} else {
		_markup += "<div class=\""+cssClass+" oppoInnerBarFl lastBarFl\" style=\""+width+"\">"+allStages[count -1].oppo_stage+"</div>";
	}
	
	_markup += "</div>";
	
	return _markup;
}


