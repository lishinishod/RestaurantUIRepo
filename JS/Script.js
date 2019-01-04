function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("about_div").style.marginLeft = "250px";
    document.getElementById("book_table").style.marginLeft = "250px";
    document.getElementById("contact_div").style.marginLeft = "250px";
    document.getElementById("Gallery").style.marginLeft = "250px";
    document.getElementById("Menu").style.marginLeft = "250px";
    document.getElementById("orderOnline").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.getElementById("about_div").style.marginLeft = "0";
    document.getElementById("book_table").style.marginLeft = "0";
    document.getElementById("contact_div").style.marginLeft = "0";
    document.getElementById("Gallery").style.marginLeft = "0";
    document.getElementById("Menu").style.marginLeft = "0";
    document.getElementById("orderOnline").style.marginLeft = "0";
}
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function openModal(){
	document.getElementById("myModal").style.display = "block";
}

function closeModal(){
	document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
// showSlides(slideIndex);

function currentSlide(n){
	showSlides(slideIndex = n);
}
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function showSlides(n){
	var i;
	var slides = document.getElementsByClassName("myslides");
	if(n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) { slideIndex = slides.length;}
	 for(i = 0; i < slides.length; i++ )
	 {
	 	slides[i].style.display = "none";
	 }
	 slides[slideIndex-1].style.display = "block";
}
function selectCat(link){
	var element = document.getElementsByClassName("link");
	for(var i=0; i<element.length; i++)
		element[i].style.backgroundColor = "white";
	var tableElements = document.getElementsByClassName("dish");
	for(var i=0; i<tableElements.length; i++)
		tableElements[i].style.display = "";

	link.style.backgroundColor = "#e75b1e";
	var inner = link.innerHTML;
	var doc = document.getElementsByClassName("tdheading");
	doc[0].innerHTML = inner;

	if(inner != "All")
	{
		for(var i=0; i<tableElements.length; i++)
		{
			var cat = tableElements[i].cells[4].innerHTML;
			if(cat == inner)
				tableElements[i].style.display = "";
			else
				tableElements[i].style.display = "none";
		}
	}
}
