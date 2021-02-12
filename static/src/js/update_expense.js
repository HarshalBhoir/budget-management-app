odoo.define('budget_expense_management.myexpenses', function(){ 
 "use strict" 
 	

	$(document).ready(function(){
		$('button[name="del_exp"]').click(function() {
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
					window.location.href = '/my_expenses';
				}
			};
			var data = { "expense_id": this.value };
			var url = "/my_expenses";
			xhttp.open("DELETE", url, true);
			xhttp.setRequestHeader('Content-type', 'application/json');
			data = JSON.stringify(data)
			xhttp.send(data);
		})
	
		$('td').on('click', function(e) {
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
			$('tr').removeClass('marked'); 
			$("td").removeClass('td_marked');
			$.each(currentTD, function () {
	                      $(this).prop('contenteditable', true)
						  $(this).addClass('td_marked');
	                  });
			$(this).closest('tr').find('td:first-child').click(function() {
				$('tr').find('td:first-child').prop('contenteditable', false);
				$(this).closest('tr').find('td:first-child').context.firstElementChild.type = 'date';
				$(this).closest('tr').find('td:first-child').context.lastElementChild.style.display = 'none';
				});
				$(this)[0].parentNode.children[0].style.display='none';
				$(this)[0].parentNode.children[1].style.display='inline-block';
				$(this)[0].parentNode.children[1].contentEditable = false;
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
			
			$(this)[0].parentNode.children[1].style.display='none';
			$(this)[0].parentNode.children[0].style.display='inline-block';
			$(this)[0].parentNode.children[0].contentEditable = false;
			
			xhttp.onload = function () {
				if (xhttp.readyState == XMLHttpRequest.DONE) {
					if (xhttp.status == 200) {
							$(".alert").fadeTo(2000, 500).slideUp(500, function() {
							    	$(".alert").slideUp(500);
							    });
							all_tds[4].children[1].style.display = 'none';
							all_tds[4].children[0].style.display = 'block';
							all_tds[4].children[0].value = all_tds[4].children[1].value;
							all_tds[4].children[0].textContent = all_tds[4].children[1].value;
						
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

