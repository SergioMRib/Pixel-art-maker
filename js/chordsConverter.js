/*
 * The point is to select a list of chords and then convvert them to
 * a form of your liking
 * The conversion is going to take place using two buttons: one to increase
 * and another to decrease; each change by half a tone (I'll call it a step)
*/

const halfStepUpButton = document.getElementById('up-button'),
      halfStepDownButton = document.getElementById('down-button'),
      hamburgerMenu = document.getElementsByClassName('hamburger-menu')[0],
      instructions = document.getElementsByClassName('instructions')[0],
      newLine = document.getElementById('new-line');

/*
  Button to togle instructions
*/
hamburgerMenu.addEventListener('click', function(){
    instructions.classList.toggle('hidden');
});

/*
    Event listeners to convert chord using the buttons and up and down arrows
*/
halfStepUpButton.addEventListener('click', function(){
    model.step = 1;
    controller.convert(model.selectedChords, model.step);
});
halfStepDownButton.addEventListener('click', function(){
    model.step = -1;
    controller.convert(model.selectedChords, model.step);
});

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        38: 'up',
        40: 'down'
    };
    if (e.keyCode === 38) {
        model.step = 1;
    };
    if (e.keyCode === 40) {
        model.step = -1;
    };
    controller.convert(model.selectedChords, model.step);
});

newLine.addEventListener('click', function(){
    let line = {
        pos: 'blank line',
        name: '',
        modifier: ''
    };
    model.selectedChords.push(line);
    //document.getElementById('chords_selection').childNodes[1].className = 'selected-chord two'
});

/*
    MODEL: Here is:
        - list of chords - unchangeable
        - list of modifiers - unchangeable
        - list of selected chord - changeable by clicking
*/
let model = {
    step: 1,
    chords: [
        {
            pos:1,
            name:"A"
        },
        {
            pos:2,
            name: "A#"
        },
        {
            pos:3,
            name:"B"
        },
        {
            pos:4,
            name:"C"
        },
        {
            pos:5,
            name:"C#"
        },
        {
            pos:6,
            name:"D"
        },
        {
            pos:7,
            name:"D#"
        },
        {
            pos:8,
            name:"E"
        },
        {
            pos:9,
            name:"F"
        },
        {
            pos:10,
            name:"F#"
        },
        {
            pos:11,
            name:"G"
        },
        {
            pos:12,
            name:"G#"
        }
    ],
    chordModifiers: {
        minor:"m",
        maj:"M",
        7:"7",
        9:"9",
        sus:"sus",
        dim:"dim"
    },
    selectedChords: []
};

/*
    CONTROLLER
*/
let controller = {
    init: function() {
        console.log("controller called");
        chordListView.init();
        selectedChordsView.init();
    },
    getChords: function() {
        return model.chords;
    },
    getSelectedChords: function() {
        return model.selectedChords;
    },
    getModifiers: function(){
        return model.chordModifiers;
    },
    selectChord: function(clickedChord) {

        //create a new object
        let newChord = {
            pos: '',
            name: '',
            modifier: ''
        };
        //define its properties according to the clicked chord
        newChord.pos = clickedChord.pos;
        newChord.name = clickedChord.name;

        //add it to selected chords array
        model.selectedChords.push(newChord);
        selectedChordsView.render();
    },
    deleteChord: function(clickedChord) {
        //delete the chord from selectedChords array
        let i = model.selectedChords.indexOf(clickedChord);
        delete model.selectedChords[i];
        console.log('you just unselected that chord');
    },
    addModifier: function(modifier) {
        //this will change the elements info on the original object
        model.selectedChords[model.selectedChords.length - 1].modifier += modifier;
        selectedChordsView.render();
    },

    /**
    @description Converts the selected chords list
    @param {Array} selectChord - an array of chord objects
    */
    convert: function(chordsList, step) {

        //make sure the list is not empty
        if (chordsList.length < 1) {
            alert('You have no chords selected; click them to select');
            return;
        };
        //needed variables for processing: a new list and related position of the chord
        let convertedChords = [],
            position;

        /**
        * loop to increase the position one step,
        * compare the new position to model.chords list and get the corresponding,
        * push to the converted chords list
        */
        chordsList.forEach(element => {
            //change the position reference of each chord
            let newElement;

            if (element.pos !== 'blank line') {
                // if it is not a blank line do all the operations
                position = element.pos + step;
                if (position === 13) {
                    position = 1;
                } else if (position === 0) {
                    position = 12;
                };
                console.log(`The position of the select is: ${element.pos}`)

                //get the apropriate chord (returns the chord object) using the position and assign to a variable
                newElement = model.chords.find(chord => {
                    return chord.pos === position;
                });

                //move the modifiers to the new element
                newElement.modifier = element.modifier
                //remove the modifiers from the old element
                element.modifier = "";
            } else {
                //if it is a blank line just push it
                newElement = element;
            };
            //push the new chord to the list of converted chords
            convertedChords.push(newElement);
        });

        //assign the new list to the selectedChords list
        model.selectedChords = convertedChords;

        //render the new list
        selectedChordsView.render();
    }
};

let chordListView = {
    init: function() {
        this.chordListElem = document.getElementById('chord_list');
        this.chordModifiersElem = document.getElementById('modifiers_list');

        this.render();
    },

    render: function() {
        console.log("chord and modifiers render called");

        /*
            Rendering the list of chords
        */

        let chord, elem, i;

        //get chords from the model
        let chords = controller.getChords();

        //for loop to add all the chords to the dom
        for (i in chords) {
            //creates a list element
            elem = document.createElement('div');
            elem.className = 'chord';

            //get the current chord (the object) from the chords list
            chord = chords[i];


            //add event listeners; attention to closure on these events
            elem.addEventListener('click', (function(chordCopy) {
                return function() {
                    console.log(`The chord clicked was: ${chordCopy.name}`);
                    //ask the controller to add it to the selected chords list
                    controller.selectChord(chordCopy);

                    /*
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                    */
                };
            })(chord));

            //set the elem's text to the chord
            elem.textContent = chord.name;

            //add the element
            this.chordListElem.appendChild(elem);
        };

        /*
            Rendering the list of chord modifiers
            NOTE: not very DRY!
        */
        let modifier;

        //get the modifiers
        let modifiers = controller.getModifiers();

        for (i in modifiers) {
            //creates a list element
            elem = document.createElement('div');
            elem.className = 'modifier';

            //get the current chord from the chord list
            modifier = modifiers[i];

            //add event listeners; attention to closure on these events
            elem.addEventListener('click', (function(modCopy) {
                return function() {
                    console.log("The chord modifier clicked was: " + modCopy);

                    controller.addModifier(modCopy);
                    /*
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                    */
                };
            })(modifier));

            //set the elem's text to the modifier
            elem.textContent = '...' + modifier;

            //add the element
            this.chordModifiersElem.appendChild(elem);
        };
    }
};

let selectedChordsView = {

    init: function() {
        this.selectedChordsElem = document.getElementById('chords_selection');
    },
    render: function() {
        //this will render each time a chord is selected
        this.selectedChordsElem.innerHTML = '';
        console.log("selected is about to be rendered");

        let chord, elem, i;

        //get chords from the model
        let chords = controller.getSelectedChords();

        //for loop to add all the selecetd chords to the dom
        for (i in chords) {
            elem = document.createElement('div');

            if (chords[i].pos === 'blank line') {
                elem.className = 'selected-chord blank-line';
            } else {
                elem.className = 'selected-chord';
            };

            chord = chords[i];

            //add the event listener
            elem.addEventListener('click', (function(selectCopy) {
                return function() {
                    console.log("The chord clicked was: " + selectCopy.name);
                    controller.deleteChord(selectCopy);
                    selectedChordsView.render();
                    /*
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                    */
                };
            })(chord));

            elem.textContent = chord.name + chord.modifier;

            //add the element
            this.selectedChordsElem.appendChild(elem);
        }
    }
};

/*
    Initialization
*/
controller.init();