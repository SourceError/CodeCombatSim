function Vector(x, y) {
    return {
        x:x,
        y:y,
        distance: function (vec) {
            var difVec = Vector.subtract(vec,this);
            return Math.sqrt(difVec.x*difVec.x + difVec.y*difVec.y);
        },
        equals: function (vec) {
            return this.x === vec.x && this.y === vec.y;
        },
        magnitude: function () {
            return Math.sqrt(this.x*this.x + this.y*this.y);
        },
        normalize: function() {
            return Vector.divide(this,this.magnitude());
        },
        dot: function(vec) {
            return this.x * vec.x + this.y * vec.y;
        },
        heading: function() {
            return -1 * Math.atan2(-1 * this.y, this.x);
        }
    };
}
Vector.add = function (a,b) {
    return new Vector(a.x+b.x, a.y+b.y);
};
Vector.subtract = function (a,b) {
    return new Vector(a.x-b.x, a.y-b.y);
};
Vector.multiply = function (vec,scale) {
    return new Vector(vec.x*scale, vec.y*scale);
};
Vector.divide = function (vec,scale) {
    return new Vector(vec.x/scale, vec.y/scale);
};