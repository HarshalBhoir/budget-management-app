# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models, tools, _
from odoo.exceptions import ValidationError


class BankStatementLine(models.Model):
    _inherit = 'account.bank.statement.line'
    
    
    user_id = fields.Many2one('res.users', string='Responsible', required=False, default=lambda self: self.env.user)
    exp_summary_id = fields.Many2one('expense.summary', string='Exp ref')
    income_summary_id = fields.Many2one('income.summary', string='Income ref')
    cash_transfer_id = fields.Many2one('account.money.transfer', string="Transfer")
    
class BankStatement(models.Model):
    _inherit = 'account.bank.statement'
    
    
    
    @api.model
    def _default_bgt_opening_balance(self):
        #Search last bank statement and set current opening balance as closing balance of previous one
        ctx = dict(self.env.context) or {}
        print('4444444444----------------',ctx.get('res'))
        if ctx.get('res', False):
            journal_id = ctx.get('res').account_journal_id.id
        else:
            journal_id = ctx.get('default_journal_id', False) or ctx.get('journal_id', False)
            print('555555555588888*************************',journal_id,self._context)
        if journal_id:
            print('??????????@22222222-------------',self._get_bgt_opening_balance(journal_id))
            return self._get_bgt_opening_balance(journal_id)
        return 0 
       
            
    @api.multi
    def _get_bgt_opening_balance(self, journal_id):
        ctx = dict(self.env.context) or {}
        today = fields.Date.context_today(self)
        print('-----------------------1111111111111----------',ctx.get('res'), ctx.get('res').date)
        if ctx.get('res'):
            self._cr.execute("""select id from account_bank_statement where EXTRACT(MONTH FROM date)< %s AND
                            EXTRACT(YEAR FROM date) = %s OR EXTRACT(YEAR FROM date) < %s AND
                            journal_id = %s AND
                            user_id=%s GROUP BY id""",
                             ((ctx.get('res').date.month),(ctx.get('res').date.year),(ctx.get('res').date.year), journal_id,ctx.get('res').user_id.id))
            current_month_bank_stmt = self._cr.fetchall() 
            print('-----------999999999999999999------',current_month_bank_stmt)
            if current_month_bank_stmt:
                if ctx.get('res').date.year < today.year:
                    return self.browse(current_month_bank_stmt[0]).balance_end
                elif ctx.get('res').date.year == today.year:
                    return self.browse(current_month_bank_stmt[-1]).balance_end
            return 0
           
    
    
    
    balance_start = fields.Monetary(string='Starting Balance', states={'confirm': [('readonly', True)]}, default=_default_bgt_opening_balance)

    
    @api.model
    def create(self, vals):
        res = super(BankStatement, self).create(vals)   
        today = fields.Date.context_today(self)
        self._cr.execute("""select id from account_bank_statement where EXTRACT(MONTH FROM date)= %s AND
                        EXTRACT(YEAR FROM date)= %s AND
                        journal_id = %s AND
                        user_id=%s GROUP BY id""",
                         ((res.date.month),(res.date.year),vals.get('journal_id'),res.user_id.id))
        current_month_bank_stmt = self._cr.fetchall() 
        if len(current_month_bank_stmt) > 1:
            raise ValidationError(_("Statements can't be created for same month and year "))
        return res
    
    @api.multi
    def write(self, vals):
        res = super(BankStatement, self).write(vals) 
        today = fields.Date.context_today(self)
        self._cr.execute("""select id from account_bank_statement where EXTRACT(MONTH FROM date)= %s AND
                        EXTRACT(YEAR FROM date)= %s AND
                        journal_id = %s AND
                        user_id=%s GROUP BY id""",
                         ((self.date.month),(self.date.year),vals.get('journal_id'),self.user_id.id))
        current_month_bank_stmt = self._cr.fetchall()    
        if len(current_month_bank_stmt) > 1:
            raise ValidationError(_("Statements can't be created for  %s and %s.... ") % (self.date.strftime('%B'),self.date.year))
        return res
    
     
   