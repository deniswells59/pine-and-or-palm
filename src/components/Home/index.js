import React, { Component } from 'react';
import './style.css';

const SPACING = 14,
      ROWS = Math.max((window.innerHeight - 100) / SPACING),
      COLS = Math.max(window.innerWidth / SPACING),
      CIRCLE_PARTICLES = ROWS * COLS ,
      THICKNESS = Math.pow(100, 2 ),
      MARGIN = 0,
      COLOR = 117,
      DRAG = 0.95,
      EASE = 0.25;

let bounds, container,
    mouse, canvas,
    stats,
    ctx,
    list = [],
    tog = true,
    dx, dy,
    mouseX, mouseY,
    d, t, f,
    a, b, n,
    w, h,
    s, r;

let circle = {
  vx: 0,
  vy: 0,
  x: 0,
  y: 0
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.step = this.step.bind(this);
  }

  componentDidMount() {
    this.init();
    this.step();
  }

  init() {
    container = document.getElementById( 'canvas-container' );
    canvas = document.createElement( 'canvas' );

    ctx = canvas.getContext( '2d' );

    w = canvas.width = COLS * SPACING + MARGIN * 2;
    h = canvas.height = ROWS * SPACING + MARGIN * 2;

    // container.style.marginLeft = Math.round( w * -0.5 ) + 'px';
    // container.style.marginTop = Math.round( h * -0.5 ) + 'px';

    for (let i = 0; i < CIRCLE_PARTICLES; i++ ) {
      let c = Object.create( circle );
      c.x = c.ox = MARGIN + SPACING * ( i % COLS );
      c.y = c.oy = MARGIN + SPACING * Math.floor( i / COLS );

      list[i] = c;
    }

    container.addEventListener( 'mousemove', function(e) {
      bounds = container.getBoundingClientRect();
      mouseX = e.clientX - bounds.left;
      mouseY = e.clientY - bounds.top;
    });

    container.appendChild( canvas );
  }

  step() {
    if( tog = !tog ) {
      for(let i = 0; i < CIRCLE_PARTICLES; i++) {
        let c = list[i];

        d = ( dx = mouseX - c.x ) * dx + ( dy = mouseY - c.y ) * dy;
        f = -THICKNESS / d;

        if ( d < THICKNESS ) {
          t = Math.atan2( dy, dx );
          c.vx += f * Math.cos(t);
          c.vy += f * Math.sin(t);
        }

        c.x += ( c.vx *= DRAG ) + (c.ox - c.x) * EASE;
        c.y += ( c.vy *= DRAG ) + (c.oy - c.y) * EASE;

      }

    } else {
      let ctx = canvas.getContext('2d');

      let w = canvas.width;
      let h = canvas.height;
      let b = ( a = ctx.createImageData( w, h ) ).data;

      for (let i = 0; i < list.length; i++ ) {
        let c = list[i];
        if(!c.size) c.size = 2;//random(-2, 3);

        this.createNode(c, w, b, this.convertHex(this.props.colors.text));
      }

      ctx.putImageData( a, 0, 0 );
    }

    requestAnimationFrame( this.step );
  }

  createNode (circle, width, pixel, color) {
    let size = circle.size;

    for (let i = 0; i <= size; i++) { // X - Loop
      for (let ii = 0; ii <= size; ii++) { // Y - Loop
        let center = ((~~circle.x + i) + ( (~~circle.y + ii ) * width ) ) *  4;
        pixel[center] = color.r, pixel[center+1] = color.g, pixel[center+2] = color.b, pixel[center+3] = 200;
      }
    }
  }

  convertHex(hex) {
    hex = hex.replace('#','');

    let r = parseInt(hex.substring(0,2), 16);
    let g = parseInt(hex.substring(2,4), 16);
    let b = parseInt(hex.substring(4,6), 16);

    return { r, g, b };
  }

  render() {
    return (
      <div className='home-container'>
        <div id="canvas-container"></div>

        <div className="album-art">
          <h3>This is album art</h3>
        </div>
      </div>
    );
  }
}

export default Home;
