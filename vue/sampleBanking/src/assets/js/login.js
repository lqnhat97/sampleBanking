$("#Login").submit(function (e) {
  e.preventDefault();
  if (grecaptcha.getResponse() == ""){
    alert("You can't proceed!");
} else {
    alert("Thank you");
}
});
