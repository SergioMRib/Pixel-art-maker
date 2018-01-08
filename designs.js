// Select size input

$("#sizePicker").submit(function (event) {
    event.preventDefault(); // prevent refreshing the page
    $("#pixel_canvas").children().remove()
    var height = $("#input_height").val();
    var width = $("#input_width").val();
    console.log("The height is:", height)
    console.log("The width is:", width)
    makeGrid(height, width);

})

function makeGrid(height, width) {
    /* 
    function that gets the arguments for the grid
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
var selectedColor = "#000"
var selectedColor = $("#colorPicker").on("change", function(){
     // event to select color
     console.log($(this).val())
})

function painter(cell, color) {
    /*
    This function changes the color of the cell.
    Declared separately to be possible to pass arguments.
    The arguments are a cell - jquery selector of the cell - 
    and the color - the value of the color given by the object 
    return by the colorPicker change event
    */
    console.log("clicked")
    cell.css("background-color", color)
}

$("table").on("click","td", function () {
    /* event that selects the cell and passes it to the painter
    function
    */
    painter($(this), selectedColor.val());
})

$("table").on("dblclick","td", function () {
    // function to erase color (change it to white!)
    console.log("clicked")
    $(this).css("background-color", "#FFF");  
})

