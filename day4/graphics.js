/*****************************************************
*	Designed and programmed by Mohamed Adam Chaieb.
*****************************************************/

/* Create an Isomer instance with our canvas */
var iso = new Isomer(document.getElementById("art"));

/* Some convenient renames */
var Point = Isomer.Point;
var Path = Isomer.Path;
var Shape = Isomer.Shape;
var Color = Isomer.Color;

/* Rotation angle for our centerpiece */
var angle = 0;
function scene() {
  /* Add some levels */
  iso.add(Shape.Prism(new Point(1, 0, 0), 4, 4, 2));
  iso.add(Shape.Prism(new Point(0, 0, 0), 1, 4, 1));
  iso.add(Shape.Prism(new Point(-1, 1, 0), 1, 3, 1));

  /* Some stair cases */
  iso.add(Stairs(new Point(-1, 0, 0)));

  /* Some more levels and stairs */
  iso.add(Shape.Prism(new Point(3, 0, 2), 2, 4, 1));
  iso.add(Shape.Prism(new Point(2, 1, 2), 1, 3, 1));

  iso.add(Stairs(new Point(2, 0, 2)).rotateZ(new Point(2.5, 0.5, 0), -Math.PI / 2));

  /* Add some colorful pyramids */
  iso.add(Shape.Pyramid(new Point(2, 3, 3))
    .scale(new Point(2, 4, 3), 0.5),
    new Color(180, 180, 0));
  iso.add(Shape.Pyramid(new Point(4, 3, 3))
    .scale(new Point(5, 4, 3), 0.5),
    new Color(180, 0, 180));
  iso.add(Shape.Pyramid(new Point(4, 1, 3))
    .scale(new Point(5, 1, 3), 0.5),
    new Color(0, 180, 180));
  iso.add(Shape.Pyramid(new Point(2, 1, 3))
    .scale(new Point(2, 1, 3), 0.5),
    new Color(40, 180, 40));

  /* Add a knot with a short platform */
  iso.add(Shape.Prism(new Point(3, 2, 3), 1, 1, 0.2), new Color(50, 50, 50));
  
  /* Draw a spinning octahedron as our centerpiece */
  iso.add(Octahedron(new Point(3, 2, 3.2))
   .rotateZ(new Point(3.5, 2.5, 0), angle)
   , new Color(0, 180, 180));

  angle += 2 * Math.PI / 60;
}

setInterval(scene, 1000 / 30);






/** Some Built-ins */


/* Draws some stars at a given point */
function Stairs(origin) {
  var STEP_COUNT = 10;

  /* Create a zig-zag */
  var zigzag = new Path(origin);
  var steps = [], i;

  /* Shape to return */
  var stairs = new Shape();

  for (i = 0; i < STEP_COUNT; i++) {
    /**
     *  2
     * __
     *   | 1
     */

    var stepCorner = origin.translate(0, i / STEP_COUNT, (i + 1) / STEP_COUNT);
    /* Draw two planes */
    steps.push(new Path([
      stepCorner,
      stepCorner.translate(0, 0, -1 / STEP_COUNT),
      stepCorner.translate(1, 0, -1 / STEP_COUNT),
      stepCorner.translate(1, 0, 0)
    ]));

    steps.push(new Path([
      stepCorner,
      stepCorner.translate(1, 0, 0),
      stepCorner.translate(1, 1 / STEP_COUNT, 0),
      stepCorner.translate(0, 1 / STEP_COUNT, 0)
    ]));

    zigzag.push(stepCorner);
    zigzag.push(stepCorner.translate(0, 1 / STEP_COUNT, 0));
  }

  zigzag.push(origin.translate(0, 1, 0));


  for (i = 0; i < steps.length; i++) {
    stairs.push(steps[i]);
  }
  stairs.push(zigzag);
  stairs.push(zigzag.reverse().translate(1, 0, 0));

  return stairs;
}


/**
 * Draws an octohedron contained in a 1x1 cube location at origin
 */
function Octahedron(origin) {
  /* Declare the center of the shape to make rotations easy */
  var center = origin.translate(0.5, 0.5, 0.5);
  var faces = [];

  /* Draw the upper triangle /\ and rotate it */
  var upperTriangle = new Path([
    origin.translate(0, 0, 0.5),
    origin.translate(0.5, 0.5, 1),
    origin.translate(0, 1, 0.5)
  ]);

  var lowerTriangle = new Path([
    origin.translate(0, 0, 0.5),
    origin.translate(0, 1, 0.5),
    origin.translate(0.5, 0.5, 0)
  ]);

  for (var i = 0; i < 4; i++) {
    faces.push(upperTriangle.rotateZ(center, i * Math.PI / 2));
    faces.push(lowerTriangle.rotateZ(center, i * Math.PI / 2));
  }

  /* We need to scale the shape along the x & y directions to make the
   * sides equilateral triangles */
  return new Shape(faces).scale(center, Math.sqrt(2)/2, Math.sqrt(2)/2, 1);
}



/* Draws an impossible MC Escher style knot */
function Knot(origin) {
  var knot = new Shape();

  knot.paths = knot.paths.concat(Shape.Prism(Point.ORIGIN, 5, 1, 1).paths);
  knot.paths = knot.paths.concat(Shape.Prism(new Point(4, 1, 0), 1, 4, 1).paths);
  knot.paths = knot.paths.concat(Shape.Prism(new Point(4, 4, -2), 1, 1, 3).paths);

  knot.push(new Path([
    new Point(0, 0, 2),
    new Point(0, 0, 1),
    new Point(1, 0, 1),
    new Point(1, 0, 2)
  ]));

  knot.push(new Path([
    new Point(0, 0, 2),
    new Point(0, 1, 2),
    new Point(0, 1, 1),
    new Point(0, 0, 1)
  ]));

  return knot.scale(Point.ORIGIN, 1/5).translate(-0.1, 0.15, 0.4).translate(origin.x, origin.y, origin.z);
}