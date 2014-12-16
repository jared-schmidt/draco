Apiusers = new Meteor.Collection("apiusers");


Router.route('/account/:_id', function () {

  var user = Apiusers.findOne({'_id':this.params._id});
  if (user){
      Meteor.call('confirmuser', this.params._id);
      this.response.end('Hope for the best...\n');
  }
  else{
     this.response.end('No work');
  }
}, {where: 'server'});