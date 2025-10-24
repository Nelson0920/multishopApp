import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testTransaction() {
      try {
            console.log('🧪 Probando transacción con Prisma...')

            const result = await prisma.$transaction(async (tx) => {
                  const auxAccount = await tx.auxiliariesAccounts.create({
                        data: {
                              name: 'Cuenta de Prueba - ' + new Date().toISOString(),
                              auxiliary_code: 'TEST' + Math.floor(Math.random() * 1000)
                        }
                  })

                  console.log('✅ Registro creado:', auxAccount.name)
                  return auxAccount
            })

            console.log('🎉 ¡Transacción completada exitosamente!')
            console.log('📋 ID del registro:', result.id)

      } catch (error) {
            console.error('❌ Error en la transacción:', error.message)
      } finally {
            await prisma.$disconnect()
      }
}

testTransaction()
