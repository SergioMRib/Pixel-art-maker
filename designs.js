// Select size input

$("#sizePicker").submit(function (event) {
    event.preventDefault(); // prevent refreshing the page
    $("#pixel_canvas").children().remove()
    var canvasHeight = $("#input_height").val(),
    canvasWidth = $("#input_width").val(),
    cellSize = $("#input_cell_size").val();

    console.log("The height is:", canvasHeight)
    console.log("The width is:", canvasWidth)
    console.log("The cell size is:", cellSize, "px")

    makeGrid(canvasHeight, canvasWidth);
    $("table").toggleClass("with-no-canvas")
    $("#sizePicker").hide();
    $("#createNewGrid").show();

})

function makeGrid(height, width) {
    /* 
    function that gets the arguments for the grid,
    creates the html syntax and appends it to "pixel_canvas"
    */    
    var columns, table;
    for(i = 0; i < width; i++) {
        columns = columns + "<td></td>"; 
    }
    for(i = 0; i < height; i++) {
        table = table + "<tr>" + columns + "</tr>";
    }
    $("#pixel_canvas").append(table)
    console.log("added the grid")
}   


/* 
Selection of the color for cells
and aplying it to them
*/
var selectedColor = "#000";
selectedColor = $("#colorPicker").on("change", function(){
     // event to select color
     var colorCode = $(this).val(),
     styleTag = " style=\"background-color:" + colorCode + ";\">",
     textToInsert = "<button class=\"reselect-button\""+ styleTag + colorCode + "</button>";
     $("#selected-colors-list").append(textToInsert);     
     console.log($(this).val());
})


// to reselect one of the colors already used
$("selected-colors-list").on("click",".reselect-button", function (){
    console.log("reselection worked. Color code is: " + $(this).css("background-color"));
    selectedColor.val() = "#000";
})

function painter(cell, color) {
    /*
    This function changes the color of the cell.
    Declared separately to be possible to pass arguments.
    The arguments are a cell - jquery selector of the cell - 
    and the color - the value of the color given by the object 
    returned by the colorPicker change event
    */
    console.log("Painter function worked")
    cell.css("background-color", color)
}

var paintCells = false,
    eraseCells = false;

$("table").on({
    click: function () {
        if (paintCells == false) {
            paintCells = true;
            eraseCells = false;
        }else{
            paintCells = false;
        }
    },
    dblclick: function () {
        if (eraseCells == false) {
            eraseCells = true;
            paintCells = false;
        }else{
            eraseCells = false;
        }
    }
})

$("table").on("mouseover","td", function () {
    /* event that selects the cell and passes it to the painter
    function
    */
    if (paintCells == true){
        console.log("clicked");
        painter($(this), selectedColor.val());
    }
    if (eraseCells == true) {
        console.log("erasing color");
        $(this).css("background-color", "transparent");
    }
})


$("#createNewGrid").on("click", function () {
    $("#sizePicker").show();
    $("#createNewGrid").hide();
})