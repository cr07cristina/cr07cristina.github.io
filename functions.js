var topic_mapping = {};

topic_mapping ['prem_league'] = [
  {question_title: "What was the Premier League's revenue in 2015? (in billion £)", min: 0, max: 100},
  {question_title: "How much was Manchester United's club revenue? (in million £)", min: 0, max: 100}
]

topic_mapping ['other_leagues'] = [
  {question_title: "This is the first subquestion", min: 0, max: 100},
  {question_title: "This is the second subquestion", min: 0, max: 100},
  {question_title: "This is the second subquestion", min: 0, max: 100},
  {question_title: "This is the second subquestion", min: 0, max: 100},
  {question_title: "This is the third subquestion", min: 0, max: 100}
]

var answer_mapping = {};

answer_mapping['prem_league'] = [
  {title: "Question One", answer: "The Premier League's revenue in 2015 was £3.26bn", fact: "The Premier League made more money than Spain's and Italy's clubs combined. It's currently third in the list of highest-paying professional sport leagues. The first one is...you guessed it the NFL! "},
  {title: "Question Two", answer: " Manchester United's revenue was £433 million", fact: "It has the highest revenue of any English club."}
]

answer_mapping['other_leagues'] = [
  {title: "Title One", answer: "The Premier League's revenue in 2015 was £3.26bn", fact: "The Premier League made more money than Spain's and Italy's clubs combined. It's currently third in the list of highest-paying professional sport leagues. "},
  {title: "Title Two", answer: " Manchester United's revenue was £433 million", fact: "It has the highest revenue of any English club."},
  {title: "Title One", answer: "The Premier League's revenue in 2015 was £3.26bn", fact: "The Premier League made more money than Spain's and Italy's clubs combined. It's currently third in the list of highest-paying professional sport leagues. "},
  {title: "Title Two", answer: " Manchester United's revenue was £433 million", fact: "It has the highest revenue of any English club."},
  {title: "Title One", answer: "The Premier League's revenue in 2015 was £3.26bn", fact: "The Premier League made more money than Spain's and Italy's clubs combined. It's currently third in the list of highest-paying professional sport leagues. "}
]


var answers = [];
var selected_topic;


$( document ).ready(function() {
    console.log( "ready!" );

    $("#master-submit").click(function(){
      $("#answer-panel").show();

      var root_node = $("#answers-container")
      var topic_data = answer_mapping[selected_topic];
      root_node.empty();

      for(i = 0; i < answers.length; i++){
        var item_data = topic_data[i];
        root_node.append("<h4>" +  item_data['title'] + "</h4>");      
        root_node.append("<p><b>Your answer was: </b>" + item_data['answer'] + "</p>");
        root_node.append("<p><b>Fun fact: </b>" + item_data['fact'] + "</p>");
        root_node.append("<br>");
      }
    });

    //mapping from selected topic to question definitions, i.e title, slider ranges, correct answer
	//listen to when topic selected
	$('#topic-select').change(function () {
	   	var optionSelected = $(this).find("option:selected"); 
	    var option  = optionSelected.attr('name'); //get the name of selected option. not ideal, want id      
	    var question_set = topic_mapping[option]; //get corresponding question definition 
      selected_topic = option;

	    var container = $("#sub-questions-container") //box where the questions go
	    container.empty(); //clear out questions from previously selected topics

	 //for each question in our set, create corresponding html elements
	    for(i =0; i < question_set.length; i++){
	    	var question = question_set[i];
	    	var id = option + "_" + i;
  			container.append($("<p class='sub-question-title'>" + question['question_title'] + "</p>"));			
  			var slider = $("<input id='slider_" + id + " ' type='range' class='numeric-slider'/>");
  			container.append(slider);
  			var ele = $("<p id='"+ id + "'>Your Answer: ")
  			container.append(ele);

        const i_const = i;

	   		//i want to update the <p> defined in the previous line, how do i get the id of the slider that has changed? 
  			slider.change(function(){
  			    var newval=$(this).val();
            answers[i_const] = newval;
  			    //find element after slider, update text
            console.log("Answers[" + i_const + "] ==> " + newval);
  			    $(this).next().text("Your Answer: " + newval);
  			});
		}
	 });

});



