odoo.define('budget_expense_management.change_month', function(require) { 
	 "use strict" 
	
	$(document).ready(function() {
		
		function update_summary(month_name,year){
			console.log('2222222',month_name,year);
			
/*			var year = $("#change_year").val();
*/			var xhttp = new XMLHttpRequest();
			xhttp.onload = function () {
			if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
				/*var parser = new DOMParser();
				var htmlDoc = parser.parseFromString(xhttp.responseText, 'text/xml');
				console.log(htmlDoc.html) */
				$('body').html(xhttp.responseText);
				}
			};
			var url = "/budget_monthly_rpt/?current_month=" + month_name;
			url += "&current_year="+ year;
			xhttp.open("GET", url, true);
			xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhttp.send();
		};
		
		
		
		$("#change_month").change(function() {
			var month_name = $("#change_month").val();
			var year = $("#change_year").val();
			sessionStorage.setItem("SelItem", month_name);
			update_summary(month_name, year);
		});
		$("#change_year").change(function() {
			var month_name = $("#change_month").val();
			var year = $("#change_year").val();
			sessionStorage.setItem("SelYear", year);
			update_summary(month_name, year);
		}); 
		
		
	});
	
        window.onload = function() {
		    var selItem = sessionStorage.getItem("SelItem");  
			var SelYear = sessionStorage.getItem("SelYear"); 
			
			if (selItem) {
			 var curr_month = $('input[id="current_month"]').attr('value');
   			 $('#change_month').val(curr_month);
			}
			if (SelYear) {
			 var curr_year = $('input[id="current_year"]').attr('value');
   			 $('#change_year').val(curr_year);
			console.log('===================',curr_year,$('#change_year').val());
			}
		
        }
         
			
});
