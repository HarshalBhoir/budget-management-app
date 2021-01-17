odoo.define('budget_expense_management.expense_form_submit', function(){ 
 "use strict" 

$(document).ready(function(){
	function sendData(xw) {
    	const XHR = new XMLHttpRequest();
	    //const form = document.getElementById("myForm");
		const FD = new FormData(form);
		
		
		
		// Define what happens on successful data submission
		XHR.addEventListener( "load", function() {
			const GXHR = new XMLHttpRequest();
			GXHR.addEventListener("load", function() {
				$('body').html(GXHR.responseText);	
					
			});
  			GXHR.open( "GET", "/my_expenses", true );
			GXHR.send();
			window.history.pushState({}, null, "/my_expenses");
			
		});
		
		XHR.open( "POST", "/my_expenses", true );
		xw
		XHR.send(FD);
	
	 };
	
	 const form = document.getElementById("myForm");
	 if(typeof form !== 'undefined' && form !== null) {
		form.addEventListener( "submit", function( ) {
			console.log('@@@$$$-----------------------$@@@@',event);
    		event.preventDefault();
    		sendData();
		});	
	   }
	
	
	});
	
});