// Select size input


$('#sizePicker').submit(function (event) {

    // prevent refreshing the page
    event.preventDefault();

    // remove the previous table
    $('#pixel_canvas').children().remove()

    // assign form values to variables
    var canvasHeight = $('#input_height').val(),
        canvasWidth = $('#input_width').val();

    // debugging logs...
    console.log('The height is:', canvasHeight)
    console.log('The width is:', canvasWidth)

    // callback to makeGrid function - creates the canvas
    makeGrid(canvasHeight, canvasWidth);

    $('table').toggleClass('with-no-canvas')

    // hiding the size picker and showing the createNewGrid button
    $('#sizePicker').hide();
    $('#createNewGrid').show();

})

function makeGrid(height, width) {
    /*
    * @description creates the grid - creates the html syntax and appends it to 'pixel_canvas'
    * @param {number} height
    * @param {number} width
    */
    let columns, table;

    // create number of cells (columns) per line
    for(i = 0; i < width; i++) {
        columns = columns + '<td></td>';
    }

    // creates number of lines using
    for(i = 0; i < height; i++) {
        table = table + '<tr>' + columns + '</tr>';
    }
    $('#pixel_canvas').append(table)
    console.log('added the grid')
}


/*
Selection of the color for cells
and aplying it to them
*/



let selectedColor = $('#colorPicker').on('change', function(){
    // event to select color

    // assign the color code to the variable
    let colorCode = $(this).val(),

    // add a button with the selected color code and background to the bottom div
    styleTag = ' style="background-color:' + colorCode + '";>',
    textToInsert = '<button class="reselect-button"'+ styleTag + colorCode + '</button>';
    $('#selected-colors-list').append(textToInsert);

    // debugging
    console.log($(this).val());
})


$('#selected-colors-list').on('click','button', function (){
    /*
    Event to reselect previous colors
    */
    console.log('Reselection worked. Color code is: ' + $(this).css('background-color'));
    let buttonColorCode = $(this).css('background-color');
    console.log('Cor anterior' + selectedColor.val())
    selectedColor = '#0F0';
})

/*
Cells selection and cell drawing
*/

const cursorDrawing = 'url(rainbowpntbrsh.cur),auto'
const cursorErasing = 'url(eraser.cur),auto'

function painter(cell, color) {
    /*
    * @description changes the color of the cell. Declared separately to be possible to pass arguments.
    * @param {object} a cell - jquery selector of the cell -
    * @param {sring} the color - the value of the color given by the object returned by the colorPicker change event
    */
    console.log('Painter function worked')  // debugging purpose
    cell.css('background-color', color)
}

let isDrawing = false,
    isErasing = false;

$('table').on({
    /*
    * @description using click and doubleclick to toggle painting and isErasing
    */
    click: function () {

        // if either drawing or erasing feature is ON it disables it
        if (isDrawing == true || isErasing == true) {
            isDrawing = false;
            isErasing = false;

            // changing the cursor default
            $(this).css('cursor', 'default')
        }else {

            // If neither are ON then the user wants to start drawing
            isDrawing = true;

            //return cursor to to show it's drawing
            $(this).css('cursor', cursorDrawing)
        }
    },
    dblclick: function () {

        // Start erasing
        if (isErasing == false) {
            isErasing = true;
            isDrawing = false;

            // change the cursor to show it's erasing
            $(this).css('cursor',cursorErasing)
        } else {
            isErasing = false;

            // change cursor to default
            $(this).css('cursor','default')
        }
    }
})

$('table').on('mouseover','td', function () {
    /* event that selects the cell and passes it to the painter
    function
    */

    // if statement to draw
    if (isDrawing == true){
        console.log('clicked');
        painter($(this), selectedColor.val());
    }

    // if statement to erase
    if (isErasing == true) {
        console.log('isErasing color');
        $(this).css('background-color', 'transparent');
    }
})


$('#createNewGrid').on('click', function () {
    /*
    * @description event to show the creation grid form
    */
    $('#sizePicker').show();
    $('#createNewGrid').hide();
})