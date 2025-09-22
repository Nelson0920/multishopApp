import prisma from '../../config/prisma.js'

export const validateAccountAndAuxiliaries = async (accountCode, aux1, aux2, label) => {
  console.log(`Validating account and auxiliaries: ${accountCode}, ${aux1}, ${aux2}, ${label}`)

  // Validate main account
  const account = await prisma.accountingAccounts.findFirst({
    where: { code_account: accountCode }
  })

  if (!account) {
    throw new Error(`The ${label} account (${accountCode}) does not exist`)
  }

  // Validate auxiliary 1
  const auxiliary1 = await prisma.auxiliariesAccounts.findMany({
    where: { auxiliary_code: aux1 }
  })

  if (!auxiliary1 || auxiliary1.length === 0) {
    throw new Error(`Auxiliary 1 of ${label} (${aux1}) does not exist`)
  }

  const initial1 = aux1.charAt(0)
  const allowedInitials1 = account.auxiliary1_initials.split(',').map(i => i.trim())

  if (!allowedInitials1.includes(initial1)) {
    throw new Error(`Auxiliary 1 of ${label} (${aux1}) does not have an allowed initial (${initial1}) for account ${accountCode}`)
  }

  let auxiliary2 = null

  // Validate auxiliary 2 only if it has content
  if (aux2 && aux2.trim() !== '') {
    auxiliary2 = await prisma.auxiliariesAccounts.findMany({
      where: { auxiliary_code: aux2 }
    })

    if (!auxiliary2 || auxiliary2.length === 0) {
      throw new Error(`Auxiliary 2 of ${label} (${aux2}) does not exist`)
    }

    const initial2 = aux2.charAt(0)
    const allowedInitials2 = account.auxiliary2_initials.split(',').map(i => i.trim())

    if (!allowedInitials2.includes(initial2)) {
      throw new Error(`Auxiliary 2 of ${label} (${aux2}) does not have an allowed initial (${initial2}) for account ${accountCode}`)
    }
  }

  return { account, auxiliary1, auxiliary2 }
}
