function ce(arr) {//创建元素
    if (!Array.isArray(arr) || arr.length < 1 || arr.length % 2 == 0) { return; }
    var e = document.createElement(arr[0]);
    for (var i = arr.length - 1; i >= 1; i -= 2) {
        e.setAttribute(arr[i - 1], arr[i]);
    }
    return e;
}
function cet(arr, t) {//创建元素
    if (!Array.isArray(arr) || arr.length < 1 || arr.length % 2 == 0) { return; }
    var e = document.createElement(arr[0]);
    for (var i = arr.length - 1; i >= 1; i -= 2) {
        e.setAttribute(arr[i - 1], arr[i]);
    }
    e.innerText = t;
    return e;
}