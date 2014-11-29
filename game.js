var canvas = document.getElementById("free_chess_canvas");
var context = canvas.getContext("2d");
canvas.width = 500
canvas.height = canvas.width * 1.2
var tile_width = (canvas.width)/8
var r = 0.9 * canvas.width / (16 * Math.sqrt(2))
var dragging; var mouseDown;
var canvasX; var canvasY;
var x_del; var y_del;

function median(values) {
    values.sort( function(a,b) {return a - b;} );
    var half = Math.floor(values.length/2);
    if(values.length % 2){
        return values[half];
    }else{
        return (values[half-1] + values[half]) / 2.0;
    }
}

//Board.
function tile_board(){
	for (i = 0; i<64; i++){
		if( (i + Math.floor(i/8)) % 2 == 0) {
			var leftmost_x = (i % 8) * tile_width
			var topmost_y = Math.floor(i/8) * tile_width
			context.fillStyle = "grey"
			context.fillRect(leftmost_x, topmost_y, tile_width, tile_width);
			context.fillStyle = "blue"
			context.fillRect(0, canvas.width, canvas.width, 100);
		}
	}	
}

function distance(x1, y1, x2, y2){
  return Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2));
}

function show_piece_at(text_string, xy_array, color){
	var x = xy_array[0]; var y = xy_array[1]
	if (color == 'black'){
		var fillcolor = '#222222';
		var bordercolor = '#dddddd';
		var textcolor = '#888888';
	} else if (color == 'white') {
		var fillcolor = '#dddddd';
		var bordercolor = '#222222';
		var textcolor = '#222222';
	}
  context.beginPath();
  context.arc(x, y, r, 0, 2 * 3.1415);
	context.fillStyle = fillcolor;
	context.fill();
  context.strokeStyle = bordercolor;
  context.stroke();
  context.font = '20px Helvetica';
  context.fillStyle = textcolor;
  context.textAlign = 'center';
  context.fillText(text_string, x, y + 20/(2.62));
}

// This could be done in one 32 element array,
// Let's keep it explicit for now.

//Armies.
var white = [];
var black = [];

//Units.
function Piece (color, location_x, location_y) {
	this.radius = r;
	this.color = color;
	this.location_x = location_x;
	this.location_y = location_y;
	this.getLocation = function () {

	};
};

function Rook() {
	this.move = function () {

	};
};
Rook.proto = new Piece();

function Knight() {
	this.move = function () {

	};
};

function Bishop() {
	this.move = function () {

	};
};

function Queen() {
	this.move = function () {

	};
};

function King() {
	this.move = function () {

	};
};

var foo = {}

foo.wR =  [0.5 * tile_width, 0.5 * tile_width, 'alive', 'white', '\u2656']
foo.wk =  [1.5 * tile_width, 0.5 * tile_width, 'alive', 'white', '\u2658']
foo.wB =  [2.5 * tile_width, 0.5 * tile_width, 'alive', 'white', '\u2657']
foo.wK =  [3.5 * tile_width, 0.5 * tile_width, 'alive', 'white', '\u2654']
foo.wQ =  [4.5 * tile_width, 0.5 * tile_width, 'alive', 'white', '\u2655']
foo.wB2 = [5.5 * tile_width, 0.5 * tile_width, 'alive', 'white', '\u2657']
foo.wk2 = [6.5 * tile_width, 0.5 * tile_width, 'alive', 'white', '\u2658']
foo.wR2 = [7.5 * tile_width, 0.5 * tile_width, 'alive', 'white', '\u2656']

foo.wp1 = [0.5 * tile_width, 1.5 * tile_width, 'alive', 'white', '\u2659']
foo.wp2 = [1.5 * tile_width, 1.5 * tile_width, 'alive', 'white', '\u2659']
foo.wp3 = [2.5 * tile_width, 1.5 * tile_width, 'alive', 'white', '\u2659']
foo.wp4 = [3.5 * tile_width, 1.5 * tile_width, 'alive', 'white', '\u2659']
foo.wp5 = [4.5 * tile_width, 1.5 * tile_width, 'alive', 'white', '\u2659']
foo.wp6 = [5.5 * tile_width, 1.5 * tile_width, 'alive', 'white', '\u2659']
foo.wp7 = [6.5 * tile_width, 1.5 * tile_width, 'alive', 'white', '\u2659']
foo.wp8 = [7.5 * tile_width, 1.5 * tile_width, 'alive', 'white', '\u2659']

foo.bR =  [0.5 * tile_width, 7.5 * tile_width, 'alive', 'black', '\u265C']
foo.bk =  [1.5 * tile_width, 7.5 * tile_width, 'alive', 'black', '\u265E']
foo.bB =  [2.5 * tile_width, 7.5 * tile_width, 'alive', 'black', '\u265D']
foo.bK =  [3.5 * tile_width, 7.5 * tile_width, 'alive', 'black', '\u265A']
foo.bQ =  [4.5 * tile_width, 7.5 * tile_width, 'alive', 'black', '\u265B']
foo.bB2 = [5.5 * tile_width, 7.5 * tile_width, 'alive', 'black', '\u265D']
foo.bk2 = [6.5 * tile_width, 7.5 * tile_width, 'alive', 'black', '\u265E']
foo.bR2 = [7.5 * tile_width, 7.5 * tile_width, 'alive', 'black', '\u265C']

foo.bp1 = [0.5 * tile_width, 6.5 * tile_width, 'alive', 'black', '\u265F']
foo.bp2 = [1.5 * tile_width, 6.5 * tile_width, 'alive', 'black', '\u265F']
foo.bp3 = [2.5 * tile_width, 6.5 * tile_width, 'alive', 'black', '\u265F']
foo.bp4 = [3.5 * tile_width, 6.5 * tile_width, 'alive', 'black', '\u265F']
foo.bp5 = [4.5 * tile_width, 6.5 * tile_width, 'alive', 'black', '\u265F']
foo.bp6 = [5.5 * tile_width, 6.5 * tile_width, 'alive', 'black', '\u265F']
foo.bp7 = [6.5 * tile_width, 6.5 * tile_width, 'alive', 'black', '\u265F']
foo.bp8 = [7.5 * tile_width, 6.5 * tile_width, 'alive', 'black', '\u265F']

function show_pieces(){
	for (var key in foo) {
		 if (foo.hasOwnProperty(key)) {
		    if (foo[key][2] == 'alive'){
		    	show_piece_at(foo[key][4], [foo[key][0],foo[key][1]], foo[key][3])
		    }
		 }
	}
}

tile_board()
show_pieces()

var handlefocus = function(e){ 
  if(e.type=='mouseover'){
    canvas.focus();
    return false;
  }else if(e.type=='mouseout'){
    canvas.blur();
    return false;
  }
  return true;
};

var handlemousemove = function(event){
  var coords = canvas.relMouseCoords(event);
  canvasX = coords.x;
  canvasY = coords.y;
  if (dragging){
  	foo[dragging][2] = 'dead'
  	canvas.width = canvas.width
  	tile_board()
	show_pieces()
  	show_piece_at(foo[dragging][4], 
  		[
  		foo[dragging][0],
		median([canvasY + y_del, foo[dragging][1] - tile_width, foo[dragging][1]])
  		], foo[dragging][3])
  }

  // refresh_canvas();
  // if (mouseDown && event.which == 1 && value_of_moving_circle > 0){
  //   dragging = true;
  //   restoreCanvas();
  //   context.beginPath();
  //   context.arc(canvasX + clickXdel, canvasY + clickYdel, r, 0, 2 * 3.1415);
  //   context.fillStyle = color3;
  //   context.fill();
  //   context.lineWidth = border_width;
  //   context.strokeStyle = "white";
  //   context.stroke();
  //   print_string_at_xy(value_of_moving_circle, canvasX + clickXdel, canvasY + clickYdel);
  // }
  // show_piece_at('foo', [canvasX, canvasY], 'black')
	// for (var key in foo) {
	//   	if (foo.hasOwnProperty(key)) {
	//     	if (distance(foo[key][0],foo[key][1], canvasX, canvasY)<= r){
	//     		// show_piece_at(foo[key][4], [foo[key][0],foo[key][1]], 'red')
	//    		}
	//   	}
	// }
}


function xy_to_piece(){
	for (var key in foo) {
	  	if (foo.hasOwnProperty(key)) {
	    	if (distance(foo[key][0],foo[key][1], canvasX, canvasY)<= r){
	    		x_del = foo[key][0] - canvasX
	    		y_del = foo[key][1] - canvasY
				return key
	   		}
	  	}
	}
	return false
}

var handlemouseup = function(event){
//  var a; var b;
//  refresh_canvas();
// 	saveCanvas();
 	mouseDown = false
 	canvas.style.cursor="default"
 	if (dragging){
 		foo[dragging][2] = 'alive'
 		foo[dragging][1] = median(
 			[
 				foo[dragging][1], 
 				canvasY + y_del,
 				foo[dragging][1] - tile_width
 			]
 		)
 	}
 	dragging = false
//  if (dragging){
//     var ab = ab_from_xy(canvasX+clickXdel, canvasY+clickYdel);
//     a = ab[0]; b = ab[1];
//     if (distance(atox[a], btoy[b], canvasX+clickXdel, canvasY+clickYdel) < r){
//       labels[index(click_original_a, click_original_b)] = 0;
//       labels[index(a,b)] = value_of_moving_circle;
//       refresh_canvas();
//     }
//   }else{
//     var ab = ab_from_xy(canvasX, canvasY);
//     a = ab[0]; b = ab[1];
//     if (distance(atox[a], btoy[b], canvasX, canvasY) < r){
//       if (event.which == 1){ update_state(a,b); }
//       refresh_canvas();
//     }
//   }
//   dragging = false; // does the magic on mouseup
}

var handlemousedown = function(event) { // Where the clickiness happens.
	mouseDown = true
 	dragging = xy_to_piece()
 	canvas.style.cursor="none"
 	// show_piece_at(canvasX, [canvasX, canvasY], 'black')
 	// show_piece_at(canvasY, [canvasX, canvasY+2*r], 'black')
 	// show_piece_at()
//   var a; var b;
//   var ab = ab_from_xy(canvasX, canvasY);
//   a = ab[0]; b = ab[1];
// 	 if (event.which == 1){
//     if     (distance(canvasX, canvasY, atox[a_width-3], btoy[0]) < r && max_vertex > 1) { max_vertex--; }
//     else if (distance(canvasX, canvasY, atox[a_width-1], btoy[0]) < r && max_vertex < 99){ max_vertex++; }
//     else if (distance(canvasX, canvasY, atox[2], btoy[0]) < r){
//       document.getElementById("new_square_game").submit(); return
//     }
//     else if (a_width > 6 && distance(canvasX, canvasY, atox[3], btoy[0]) < r){
//       document.getElementById("new_square_game").submit(); // seems broken.
//       window.location.assign("http://www.peterkagey.com"); //I'd prefer a "home_path" solution.
//       return
//     }
//     else if (a_width > 7  && distance(canvasX, canvasY, atox[4], btoy[0])  < r){ move_everything("left");   }
//     else if (a_width > 8  && distance(canvasX, canvasY, atox[5], btoy[0])  < r){ move_everything("right");  }
//     else if (a_width > 9  && distance(canvasX, canvasY, atox[6], btoy[0])  < r){ move_everything("up");     }
//     else if (a_width > 10 && distance(canvasX, canvasY, atox[7], btoy[0])  < r){ move_everything("down");   }
//     else if (a_width > 11 && distance(canvasX, canvasY, atox[8], btoy[0])  < r){ resize_canvas("widen");    }
//     else if (a_width > 12 && distance(canvasX, canvasY, atox[9], btoy[0])  < r){ resize_canvas("heighten"); }
//     else if (a_width > 13 && distance(canvasX, canvasY, atox[10], btoy[0]) < r){ resize_canvas("narrow");   }
//     else if (a_width > 14 && distance(canvasX, canvasY, atox[11], btoy[0]) < r){ resize_canvas("shorten");  }
//     if (distance(atox[a], btoy[b], canvasX, canvasY) < r){
//       click_original_a = a; click_original_b = b;
//       clickXdel = atox[a] - canvasX; clickYdel = btoy[b] - canvasY;
//       value_of_moving_circle = labels[index(a,b)];
//       labels[index(a,b)] = 0;
//       refresh_canvas();
//       saveCanvas();
//       labels[index(a,b)] = value_of_moving_circle;
//     }
//     else { value_of_moving_circle = 0; }
//   }
//   if (event.which == 3){
//     if (distance(atox[a], btoy[b], canvasX, canvasY) < r){
//       labels[index(a,b)] = (parseInt(labels[index(a,b)]) + 1) % (max_vertex + 1);
//     }
//   }
//   refresh_canvas();
//   return false;
}

canvas.addEventListener('mouseover', handlefocus, false);
canvas.addEventListener('mouseout',  handlefocus, false);
canvas.addEventListener('mousemove', handlemousemove, false);
canvas.addEventListener('mousedown', handlemousedown, false);
canvas.addEventListener('mouseup', 	 handlemouseup, false);


// pawns can move vertically in (0,1]