# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'Budget Expense Management',
    'version': '1.0',
    'category': '',
    'sequence': 5,
    'summary': '',
    'description': "",
    'website': 'https://www.odoo.com/page/crm',
    'depends': [
        'base','portal','website','auth_signup'
    ],
    'data': [
       'security/ir.model.access.csv',
       'data/budget_customization_data.xml',
       'views/assets.xml',
       'views/budget_expense_view.xml',
       'views/bank_account_view.xml',
       'views/expected_income_view.xml',
       'views/expense_summary_view.xml',
       'views/income_summary_view.xml',
       'views/account_money_tranfer_view.xml',
       'views/monthly_report_view.xml',
       'views/exp_summary_template.xml',
       'views/inc_summary_template.xml',
       'views/cash_tranfer_template.xml',
       'views/annual_summary_report.xml',
       'views/investment_update_view.xml'
#        'report/account_transaction_report_view.xml'
    ],
#     'qweb': [
#         "static/src/xml/inherit_chatter.xml",
#     ],
#     'css': ['static/src/css/budget.css',
#             ],
    'installable': True,
    'application': True,
    'auto_install': False,
    'test-enable':True
}
