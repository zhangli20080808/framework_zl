console.log(XMLHttpRequest)
console.log(fetch)

console.log(this)

this.onmessage = function(e){
    this.console.log(e.data);
}