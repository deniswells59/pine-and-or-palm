let canvas = null;

exports.asyncLoop = (iterations, func, callback) => {
  let index = 0;
  let done = false;
  let loop = {
    next: function() {
      if (done) {
        return;
      }

      if (index < iterations) {
        index++;
        func(loop);

      } else {
        done = true;
        callback();
      }
    },

    iteration: function() {
      return index;
    },

    break: function() {
      done = true;
      callback();
    }
  };

  loop.next();
  return loop;
}

let convertHex = hex => {
  hex = hex.replace('#','');

  let r = parseInt(hex.substring(0,2), 16);
  let g = parseInt(hex.substring(2,4), 16);
  let b = parseInt(hex.substring(4,6), 16);

  return { r, g, b };
}

exports.transition = (current, target) => {
  let r = 1;
  let g = 1;
  let b = 1;
  let currentColor = convertHex(current);
  let targetColor = convertHex(target);

  if (currentColor.r > targetColor.r) {
    currentColor.r -= 2;
    if (currentColor.r <= targetColor.r) {
      r = 0;
    }
  } else {
    currentColor.r += 2;
    if (currentColor.r >= targetColor.r) {
      r = 0;
    }
  }

  if (currentColor.g > targetColor.g) {
    currentColor.g -= 2;
    if (currentColor.g <= targetColor.g) {
      g = 0;
    }
  } else {
    currentColor.g += 2;
    if (currentColor.g >= targetColor.g) {
      g = 0;
    }
  }

  // checking B
  if (currentColor.b > targetColor.b) {
    currentColor.b -= 2;
    if (currentColor.b <= targetColor.b) {
      b = 0;
    }
  } else {
    currentColor.b += 2;
    if (currentColor.b >= targetColor.b) {
      b = 0;
    }
  }

  // transition ended. start a new one
  if (r == 0 && g == 0 && b == 0) {
    return null;
  } else {
    return rgb2hex(currentColor);
  }
}

let rgb2hex = (colorObj) => {
	var color = [];

	for (let i in colorObj) {
		var hex = colorObj[i].toString(16);
		if (hex.length < 2) { hex = "0" + hex; }
		color.push(hex);
	}
	return "#" + color.join("");
}

let getCanvas = () => {
  if(!canvas) {
    canvas = document.querySelector('#canvas');
  }

  return canvas;
}

exports.getContext = () => {
  if(!canvas) canvas = getCanvas();
  return canvas.getContext( '2d' );
}

let getMouseCoordinates = (canvas, e) => {
  let rect = canvas.getBoundingClientRect();

  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }
}

exports.convertHex = convertHex;
exports.getCanvas = getCanvas;
exports.getMouseCoordinates = getMouseCoordinates;
