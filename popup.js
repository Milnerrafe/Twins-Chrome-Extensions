// Function to delete the element with the ID 'link'
function deleteElement() {
  var element = document.getElementById("link");
  if (element) {
    element.remove();
  }
}

// Run the deleteElement function every second for the first minute
var interval = setInterval(deleteElement, 1000);

// Stop the interval after 1 minute (60 seconds)
setTimeout(function () {
  clearInterval(interval);
}, 60000);

console.log(document.getElementById("link"));
