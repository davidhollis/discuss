Meteor.startup(function () {
    Session.set('topicBeingEdited', null);
})

var Topics = new Meteor.Collection(null);
var Points = new Meteor.Collection(null);

var proRegex = new RegExp("^(for )", "i");
var conRegex = new RegExp("^(against )", "i");

function canAddATopic() {
    // We can have at most 4 topics, so we're allowed to add one if we have
    // strictly fewer than 4
    return Topics.find().count() < 4;
}

// == Navbar ==
Template.navbar.allowedToAdd = canAddATopic;

Template.navbar.events({
    'click #add-button': function () {
        if (canAddATopic()) {
            Topics.insert({name: 'New Topic'});
        }
    }
})


// == TopicList ==
Template.topicList.topics = function () {
    return Topics.find();
}


// == Topic ==
Template.topic.columnWidth = function () {
    var numTopics = Topics.find().count();
    
    return 12 / numTopics;
}

Template.topic.points = function () {
    return Points.find({topicId: this._id});
}

Template.topic.isBeingEdited = function () {
    return Session.equals('topicBeingEdited', this._id);
}

Template.topic.listStyle = function () {
    if (proRegex.test(this.name)) {
        return 'alert alert-success';
    } else if (conRegex.test(this.name)) {
        return 'alert alert-danger';
    } else {
        return '';
    }
}

function commitName(topic) {
    var nameField = nameFieldFor(topic);
    Topics.update(topic._id, {$set: {name: nameField.val()}});
    nameField.val('');
    Session.set('topicBeingEdited', null);
}

function nameFieldFor(topic) {
    Session.get('topicBeingEdited');
    return $('#topic-' + topic._id + ' .new-topic-name');
}

function createPoint(topic) {
    var pointField = $('#topic-' + topic._id + ' .new-point-text'),
        pointText = pointField.val();
    
    Points.insert({text: pointText, topicId: topic._id, status: 'neutral'});
    pointField.val('');
}

Template.topic.rendered = function () {
    var nameField, topic = this.data;
    
    if (Session.equals('topicBeingEdited', topic._id)) {
        nameField = nameFieldFor(topic);
        nameField.val(topic.name);
        nameField.focus().select();
    }
}

Template.topic.events({
    'click .topic-edit-name': function () {
        // If another topic's name is being edited, commit that first
        if (    (!Session.equals('topicBeingEdited', this._id)) &&
                (!Session.equals('topicBeingEdited', null))) {
            commitName(Topics.findOne(Session.get('topicBeingEdited')));
        }
        
        Session.set('topicBeingEdited', this._id);
    },
    'click .topic-commit-name': function () {
        commitName(this);
    },
    'keyup .new-topic-name': function (event) {
        if (event.which === 13) {
            commitName(this);
        }
    },
    'click .topic-delete': function () {
        Points.remove({topicId: this._id});
        Topics.remove(this._id);
    },
    'click .topic-add-point': function () {
        createPoint(this);
    },
    'keyup .new-point-text': function(event) {
        if (event.which === 13) {
            createPoint(this);
        }
    }
})


// == Point ==
Template.point.pointClass = function () {
    var parent = Topics.findOne({_id: this.topicId});
    
    if (proRegex.test(parent.name) || conRegex.test(parent.name)) {
        // A topic which is a pro or a con topic overrides any styling on the
        // point.
        return '';
    } else if (this.status == 'positive') {
        return 'alert-success';
    } else if (this.status == 'negative') {
        return 'alert-danger';
    } else {
        return 'alert-info';
    }
}

Template.point.events({
    'click .point-delete': function (event) {
        Points.remove(this._id);
        event.stopPropagation();
    },
    'click .point': function () {
        var nextStatus = 'neutral';
        
        if (this.status == 'positive') {
            nextStatus = 'negative';
        } else if (this.status == 'negative') {
            nextStatus = 'neutral';
        } else {
            nextStatus = 'positive';
        }
        
        Points.update(this._id, {$set: {status: nextStatus}});
    }
})