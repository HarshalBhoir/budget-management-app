# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

# from odoo.tests.common import TransactionCase
from odoo.tests import common

class TestAccountMoneyTransfer(common.TransactionCase):
 
    
    def setUp(self):
        print('************111**********'*5)
        super(TestAccountMoneyTransfer, self).setUp()
        print('**********************'*5)
        self.cash_transfer = self.env['account.money.transfer']
       
        self.cash_transfer1 = self.cash_transfer.create({
            'date': '2020-10-26',
            'name': 'Product A',
            'source_journal_id': 6,
            'dest_journal_id':7,
            'amount':77
        })
