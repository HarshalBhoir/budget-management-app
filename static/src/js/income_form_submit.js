odoo.define('budget_expense_management.income_form_submit', function(){
"use_strict"	
	
$(document).ready(function(){
	function sendData() {
		const XHR = new XMLHttpRequest();
		const FD = new FormData(form);
		
		// Define what happens on successful data submission
		XHR.addEventListener( "load", function() {
			console.log('-------2222-------')
			const GXHR = new XMLHttpRequest();
			GXHR.addEventListener("load", function() {
				$('body').html(GXHR.responseText);		
			});
            GXHR.open( "GET", "/my_incomes", true);
			console.log('-----111---------')
			GXHR.send();
			window.history.pushState({}, null, "/my_incomes");

		});
		
		XHR.open( "POST", "/my_incomes",true);
		console.log('----eeee----------')
		XHR.send(FD);
		
		
		
	}
	
	
	 const form = document.getElementById( "incomeForm" );
	 if(typeof form !== 'undefined' && form !== null) {
		form.addEventListener( "submit", function( ) {
			console.log('@@@$$$-----------------------$@@@@',event);
    		event.preventDefault();
    		sendData();
		});	
	   }
	
	
	});
	
	
	
});
