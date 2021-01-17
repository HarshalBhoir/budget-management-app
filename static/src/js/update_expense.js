odoo.define('budget_expense_management.myexpenses', function(){ 
 "use strict" 
 	

	$(document).ready(function(){
		$('button[name="del_exp"]').click(function() {
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				
				if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
					//$('body').html(xhttp.responseText);
					//window.location.reload();
					window.location.href = '/my_expenses';
					/*const GXHR = new XMLHttpRequest();
					GXHR.addEventListener("load", function() {
						$('body').html(GXHR.responseText);		
					});
		  			GXHR.open( "GET", "/my_expenses", true );
					GXHR.send();*/
				}
			};
			var data = { "expense_id": this.value };
			//data.button_clicked = true
			var url = "/my_expenses";
			xhttp.open("DELETE", url, true);
			xhttp.setRequestHeader('Content-type', 'application/json');
			data = JSON.stringify(data)
			xhttp.send(data);
		})
	
		/*$(document).on('click', function(e) { 
				if (($(e.target).context.textContent)) {
					$("td").removeClass('td_marked');
					}
				
			});*/
		$('td').on('click', function(e) { 
			console.log('==============',$(event.target).closest('td'));
			if ('text-right td_marked' == ($(this).context.className)) {
				var accounts = $("#all_account_ids").val();
				var choices = JSON.parse(accounts.replace(/'/g, '"'));
				if ($(this).context.id === 'acct') {
					$(this).prop('contenteditable', false);
					$(this).addClass('td_marked');
					$(this).context.parentNode.cells[4].childNodes[1].style.display = "none";
					$(this).context.parentNode.cells[4].childNodes[3].style.display = "inline-block";
				}
				if ($(this).context.id === 'catg') {
					$(this).prop('contenteditable', false);
					$(this).addClass('td_marked');
					$(this).context.parentNode.cells[1].childNodes[1].style.display = "none";
					$(this).context.parentNode.cells[1].childNodes[3].style.display = "inline-block";
				}
				
			}
			

			});
		$('button[name="edit_exp"]').on('click', function() { 
			var currentTD = $(this).closest('tr').find('td').not(':nth-child(8), :nth-child(7), :nth-child(9)');   
			//var tds = $('tr').find('td').prop('contenteditable', false);
			$('tr').removeClass('marked'); 
			//$('td').removeClass('dropdown-toggle');
			//$(this).closest('tr').find('.fa-save').show();
			//$(this).closest('tr').find('.fa-trash-o').show();
	
			//hide edit button
			//$(this).closest('tr').find('.fa-edit').hide(); 
	        //$(this).closest('tr').addClass('marked'); // adds the highlight to this row
			/*$(this).closest('tr').find('td:eq(4)').addClass('dropdown-toggle');
			$(this).closest('tr').find('td:eq(4)').attr('data-toggle', 'dropdown');*/
			$("td").removeClass('td_marked');
			$.each(currentTD, function () {
	                      $(this).prop('contenteditable', true)
						  $(this).addClass('td_marked');
						  
	                  });
			console.log('testing----------------', $(this).closest('tr').find('td:first-child'));
			$(this).closest('tr').find('td:first-child').click(function() {
				/*var td_date = $(this).closest('tr').find('td:first').datepicker();
				const newItem = document.createElement('input');
				newItem.innerHTML = '<input type="date" name="date" />';*/
				console.log('testing----------------',$(this).closest('tr').find('td:first-child'));
				/*td_date.context.parentNode.firstElementChild.innerHTML = '<input type="text" class="date-picker datepicker" name="date" />';
				$(".date-picker").datepicker({
					});*/	
				$('tr').find('td:first-child').prop('contenteditable', false);
				$(this).closest('tr').find('td:first-child').context.firstElementChild.type = 'date';
				$(this).closest('tr').find('td:first-child').context.lastElementChild.style.display = 'none';
				

				});
				
				
			});
			
		
		
		
		$('button[name="save_exp"]').click(function(e){
			e.preventDefault();
			var data = {}
			var all_tds = $(this).closest('tr').find('td');
			var xhttp = new XMLHttpRequest();
			var currentTD = $(this).closest('tr').find('td').not(':nth-child(8), :nth-child(7), :nth-child(9)');   
			
			$.each(currentTD, function () {
                 	$(this).prop('contenteditable', false)
				  	$(this).removeClass('td_marked');
					});
			
			
			xhttp.onload = function () {
				if (xhttp.readyState == XMLHttpRequest.DONE) {
					if (xhttp.status == 200) {
							$(".alert").fadeTo(2000, 500).slideUp(500, function() {
							    	$(".alert").slideUp(500);
							    });
						window.location.href = '/my_expenses';
						/*const GXHR = new XMLHttpRequest();
						//GXHR.addEventListener("load", function() {
						GXHR.onload = function() {
							
								$('body').html(GXHR.responseText);	
								//$('.alert').show();
								//setTimeout(function(){ $('.alert').show(); }, 1000);
								$(".alert").fadeTo(2000, 500).slideUp(500, function() {
							    	$(".alert").slideUp(500);
							    });
						//}); 
						}
						
			  			GXHR.open( "GET", "/my_expenses", true);
						GXHR.send(); */
					} 
				}
			}
			if (all_tds[4].children[1].value){
				var amount = all_tds[4].children[1].value;
			} else {
				var amount = all_tds[4].children[0].textContent;
			}
			if (all_tds[1].children[1].value){
				var category = all_tds[1].children[1].value;
			} else {
				var category = all_tds[1].children[0].textContent;
			}
			
			console.log('=====================',all_tds[4].children[0].textContent, all_tds[4].children[1].value );
			var data = {
				'date': $(this).closest('tr').find('td')[0].firstElementChild.value,
				'category':category,
				'description':all_tds[2].textContent,
				'location':all_tds[3].textContent,
				'account':amount,
				'amount':all_tds[5].textContent,
				'exp_id':this.value
			}
			var url = "/my_expenses";
			xhttp.open('PATCH', url, true);
			xhttp.setRequestHeader('Content-type', 'application/json');
			data = JSON.stringify(data);
			xhttp.send(data);
		});
		
	});

}); 

