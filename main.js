var game;
(function (game) {
    var Shape = (function () {
        function Shape(cssClass, container) {
            this.cssClass = cssClass;
            this.container = container;
        }
        Shape.prototype.createAt = function (center) {
            this.element = document.createElement("div");
            this.element.className = this.cssClass;
            //cannot be bigger that half the screen (arbitrary limit)
            var maxSize = Math.min(this.container.clientHeight, this.container.clientWidth) / 2;
            //cannot be bigger than the distance from the offset to the border
            var maxSize = Math.min(maxSize, center.x, center.y, this.container.clientWidth - center.x, this.container.clientHeight - center.y);
            this.size = Randomizer.getRandomTo(maxSize);
            this.left = center.x - this.size / 2;
            this.top = center.y - this.size / 2;
            this.color = Randomizer.getRandomColor();
            this.setStyle();
            this.container.appendChild(this.element);
        };
        Shape.prototype.setStyle = function () {
            this.element.style.width = this.size + "px";
            this.element.style.height = this.size + "px";
            this.element.style.top = this.top + "px";
            this.element.style.left = this.left + "px";
            this.element.style.backgroundColor = this.color;
        };
        Shape.prototype.energize = function () {
            var _this = this;
            while (!this.leftDirection)
                this.leftDirection = Randomizer.getRandomRange(-4, 5);
            while (!this.topDirection)
                this.topDirection = Randomizer.getRandomRange(-4, 5);
            if ((this.left + this.leftDirection < 0) || (this.left + this.size + this.leftDirection > this.container.clientWidth))
                this.leftDirection = -this.leftDirection;
            if ((this.top + this.topDirection < 0) || (this.top + this.size + this.topDirection > this.container.clientHeight))
                this.topDirection = -this.topDirection;
            this.left += this.leftDirection;
            this.top += this.topDirection;
            this.setStyle();
            setTimeout(function () { return _this.energize(); }, 0);
        };
        return Shape;
    })();
    game.Shape = Shape;
    var Shaper = (function () {
        function Shaper(container) {
            this.container = container;
        }
        Shaper.prototype.start = function () {
            var _this = this;
            console.log("shaper started");
            this.container.addEventListener("click", function (event) {
                //we're using the fact that the container is actually the body element
                _this.createShape({ x: event.clientX, y: event.clientY });
                event.preventDefault();
            });
        };
        Shaper.prototype.createShape = function (center) {
            console.log("creating shape @(" + center.x + "," + center.y + ")");
            var shapeIndex = Randomizer.getRandomTo(Shaper.shapes.length);
            var shape = Shaper.shapes[shapeIndex](this.container);
            console.log(shape);
            shape.createAt(center);
            shape.energize();
        };
        Shaper.shapes = [
            function (c) { return new Shape("box", c); },
            function (c) { return new Shape("circle", c); },
        ];
        return Shaper;
    })();
    game.Shaper = Shaper;
    var Randomizer = (function () {
        function Randomizer() {
        }
        Randomizer.getRandomColor = function () {
            //naive approach, should use HSB randomization for evenly spaced colors;
            var letters = '0123456789abcdef'.split("");
            var color = Array.apply(null, Array(6)).map(function (_) { return letters[Randomizer.getRandomTo(16)]; }).join("");
            return "#" + color;
        };
        Randomizer.getRandomTo = function (bound) {
            return Math.floor(Math.random() * bound);
        };
        Randomizer.getRandomRange = function (low, high) {
            var range = high - low;
            return low + Math.floor(Math.random() * range);
        };
        return Randomizer;
    })();
    game.Randomizer = Randomizer;
})(game || (game = {}));
document.addEventListener('DOMContentLoaded', function () {
    var container = document.getElementById("content");
    var shaper = new game.Shaper(container);
    shaper.start();
});
//# sourceMappingURL=main.js.map