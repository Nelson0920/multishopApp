id
name
credit_limit
credit_terms
discount_percentage
auxiliary1
auxiliary2
accountingAccounts: {
  id_accountingAccounts
  name
  code_account
  auxiliary1_initials (se referencia con AuxiliariesAccounts) : {
    id
    name
    auxiliary_code
  },
  auxiliary2_initials (se referencia con AuxiliariesAccounts) : {
    id
    name
    auxiliary_code
  },
}