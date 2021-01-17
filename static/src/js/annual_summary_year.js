odoo.define('budget_expense_management.change_year_annual_summary', function(require) { 
	 "use strict" 

	
	$(document).ready(function() {
	
	function update_summary(year){
				console.log('44444444',year);
				var xhttp = new XMLHttpRequest();
				xhttp.onload = function () {
				if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
					$('body').html(xhttp.responseText);
					}
				};
				var url = "/annual_summary/?current_year=" + year;
				xhttp.open("GET", url, true);
				console.log('9999999999999',url);
				xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				xhttp.send();
			};
		

	$("#change_annual_year").change(function() {
			var year = $("#change_annual_year").val();
/*			sessionStorage.setItem("AnnualYear", year);
*/			update_summary(year);
		}); 





	});


});