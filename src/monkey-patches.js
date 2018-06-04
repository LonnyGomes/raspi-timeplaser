// Borrowed from https://gist.github.com/endel/321925f6cafa25bbfbde
Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}