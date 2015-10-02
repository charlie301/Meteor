Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
 //Code only runs on the client

  Template.body.helpers({
     tasks: function (){
     	return Tasks.find({});
     }
  });

  Template.body.events({
  	"submit .new-task": function(event){
  		
  		//prevent the norm
  		event.preventDefault();
  		
  		//Retrieve value from the element
  		var text = event.target.text.value;
  		
  		//insert task into the collection 
  		Tasks.insert({
  			text: text,
  			createdAt: new Date()
  		});
  		
  		//clear input field after 
  		event.target.text.value = "";
  	}
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


