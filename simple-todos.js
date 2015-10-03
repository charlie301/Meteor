Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
 //Code only runs on the client

  Template.body.helpers({
     tasks: function (){
     	return Tasks.find({}, {sort: {createdAt: -1}});
     }
  });

  //Assign events to be handled on the body	
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


Template.task.events({
	"click .toggle-checked": function(){
		
		//Set checked property to opposite of currrent value
		Tasks.update(this._id,{
			$set: {checked: !this.checked}
		});
	},
	"click .delete": function(){
		Tasks.remove(this._id);
	}
	
});

}//always nake sure the code is in if(meteor is client)

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


