
'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {
dialogflow,
Image,
BasicCard,
Suggestions,
Carousel,
} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Define a mapping of fake color strings to basic card objects.
const profileMap = {
  'profile': {
    title: 'Image',
    text: 'Hi!! This is Gurpreet Singh',
    image: {
      url: 'https://avatars1.githubusercontent.com/u/55634740?s=460&v=4',
      accessibilityText: 'Profile Image',
    },
    display: 'WHITE',
  },
};
const contactMap = {
  'contactProfile': {
    title: 'Contact Information',
    text: 'Gurpreet Singh \nEmail:- gurpreetsinghsanghotra@gmail.com',
    image: {
      url: 'https://avatars1.githubusercontent.com/u/55634740?s=460&v=4',
      accessibilityText: 'contact image',
    },
    display: 'WHITE',
  },
};
// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});


app.intent('Default Welcome Intent', (conv) => {
// Welcome the user
  	conv.ask( "Hey!!!! Welcome to Gurpreet's resume. What do you want to know?");
// Give suggestions to the user
	conv.ask(new Suggestions('About', 'Skills', 'Qualifications','Projects','Contact','Exit'));
  });


// Handle the Dialogflow intent named 'About'.
// The intent collects a parameter named 'about'.
app.intent('About', (conv, {about}) => {

	conv.ask('I am Gurpreet Singh, a student of Arka Jain University persuing BCA. ')
    const i="profile";

    conv.ask(new BasicCard(profileMap[i]));
    
conv.ask(new Suggestions('About', 'Skills', 'Qualifications','Projects','Contact','Exit')); 
});


app.intent('Skills',(conv, {skills})=>{
	conv.ask("I am a Programmer and Coder \nOn the technical front, I have good command over the various programming languages like \nJava,\nJavaScript,\nHTML \nC and \nC++");
	
	conv.ask(new Suggestions('About', 'Skills', 'Qualifications','Projects','Contact','Exit'));
});

app.intent('Qualifications',(conv, {qualifications})=>{
	conv.ask("Arka Jain University \n \nSecondary School Kerala Public School, ");

	conv.ask(new Suggestions('About', 'Skills', 'Qualifications','Projects','Contact','Exit'));

});
	  const projectInformationCarousel = () => {
	  const carousel = new Carousel({
	   items: {
	     'github repository': {
	       title: 'Github repository',
	       synonyms: ['github', 'repository'],
	       image: new Image({
	         url: 'https://raw.githubusercontent.com/Shreyans13/Actions-on-google/master/cv-draft-1/resources/images.jpeg',
	         alt: 'Open Sources Contibutions',
	       }),
	     },
	     'actions on google': {
       title: 'Actins on google[Resume]',
       synonyms: ['actions', 'google', 'resumae'],
       image: new Image({
         url: 'https://raw.githubusercontent.com/Shreyans13/Actions-on-google/master/cv-draft-1/resources/actionsOnGoogle.jpeg',
         alt: 'Actions on google[Resume]',
       }),
     },
	 }});
	 return carousel;
	};

app.intent('Projects',(conv, {project})=>{
	conv.ask("I love programming and also contribute to open source. Here are my projects");
	
	if (conv.screen) {
		 conv.ask(projectInformationCarousel());
	}
	conv.ask(new Suggestions('About', 'Skills', 'Qualifications','Projects','Contact','Exit'));

});

app.intent('Contact',(conv, {contact})=>{
	const y="contactProfile";
conv.ask('Here`s my contact info',new BasicCard(contactMap[y]));
  // conv.ask(new BasicCard(contactMap[z]));
	
	conv.ask(new Suggestions('About', 'Skills', 'Qualifications','Projects','Contact','Exit'));
});
// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);