import prisma from "../../config/prisma.js"

export class Inventory {
  static async getInventories() {
    try {
      let msg = {
        status: false,
        msg: "No Inventories found",
        code: 404,
      }

      const inventories = await prisma.inventory.findMany()
      if (inventories.length > 0) {
        msg = {
            success: true,
            code: 200,
            message: "inventories Found",
            inventories,
          }
      }

      return msg

    } catch (error) {
      console.error("Error inventory: " , error)
    }
  }

  static async getInventory(id){
    try {
      let msg = {
        status: false,
        msg: "No Inventory found",
        code: 404,
      }

      const inventory = await prisma.inventory.findUnique({ where: { id } })
      if (inventory) {
        msg = {
            success: true,
            code: 200,
            message: "inventory Found",
            inventory,
          }
      }

      return msg

    } catch (error) {
      console.error("Error inventory: " , error)
    }
  }

  static async createInventory(data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "Inventory creation failed",
      }

      const {
        id_categories,
        id_clients,
        id_costs,
        id_prices,
        id_alternateCodes,
        id_additionalInfo,
        id_type,
        id_finish,
        id_width,
        id_composition,
        id_physicalLocation,
        id_manufacturer,
        id_laboratory,
        id_unitOfMeasure,
        id_componentActive,
        id_brand,
        id_subbrand,
        id_model,
        id_subCategory,
        id_businessUnit,
        id_purchaseStatistics,
        type
      } = data

      // Validaciones de relaciones
      const validations = [
        { id: id_categories, model: prisma.categories, name: 'category ID' },
        { id: id_clients, model: prisma.clients, name: 'client ID' },
        { id: id_costs, model: prisma.costs, name: 'cost ID' },
        { id: id_prices, model: prisma.prices, name: 'price ID' },
        { id: id_alternateCodes, model: prisma.alternateCodes, name: 'alternate code ID' },
        { id: id_additionalInfo, model: prisma.additionalInfo, name: 'additional info ID' },
        { id: id_type, model: prisma.type, name: 'type ID' },
        { id: id_finish, model: prisma.finish, name: 'finish ID' },
        { id: id_width, model: prisma.width, name: 'width ID' },
        { id: id_composition, model: prisma.composition, name: 'composition ID' },
        { id: id_physicalLocation, model: prisma.physicalLocation, name: 'physical location ID' },
        { id: id_manufacturer, model: prisma.manufacturer, name: 'manufacturer ID' },
        { id: id_laboratory, model: prisma.laboratory, name: 'laboratory ID' },
        { id: id_unitOfMeasure, model: prisma.unitOfMeasure, name: 'unit of measure ID' },
        { id: id_componentActive, model: prisma.componentActive, name: 'active component ID' },
        { id: id_brand, model: prisma.brand, name: 'brand ID' },
        { id: id_subbrand, model: prisma.subBrand, name: 'subbrand ID' },
        { id: id_model, model: prisma.model, name: 'model ID' },
        { id: id_subCategory, model: prisma.subCategory, name: 'subcategory ID' },
        { id: id_businessUnit, model: prisma.businessUnit, name: 'business unit ID' },
        { id: id_purchaseStatistics, model: prisma.purchaseStatistics, name: 'purchase statistics ID' }
      ]

      for (const validation of validations) {
        if (validation.id) {
          const exists = await validation.model.findUnique({
            where: { id: validation.id }
          })
          if (!exists) {
            return {
              success: false,
              code: 400,
              message: `Invalid ${validation.name}`,
              data: validation.id
            }
          }
        }
      }

      const createdInventory = await prisma.inventory.create({ data })

      msg = {
        success: true,
        code: 200,
        message: `${type.charAt(0).toUpperCase() + type.slice(1)} created successfully`,
        [type]: createdInventory
      }

      return msg

    } catch (error) {
      console.error("Error creating inventory:", error)
      return {
        success: false,
        code: 500,
        message: "Server error while creating inventory",
        error: error.message
      }
    }
  }

  static async editInventory(id, data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "Inventory update failed",
      }

      const {
        id_categories,
        id_clients,
        id_costs,
        id_prices,
        id_alternateCodes,
        id_additionalInfo,
        id_type,
        id_finish,
        id_width,
        id_composition,
        id_physicalLocation,
        id_manufacturer,
        id_laboratory,
        id_unitOfMeasure,
        id_componentActive,
        id_brand,
        id_subbrand,
        id_model,
        id_subCategory,
        id_businessUnit,
        id_purchaseStatistics,
        type
      } = data

      // Verificar que el inventario existe
      const existingInventory = await prisma.inventory.findUnique({ where: { id } })

      if (!existingInventory) {
        return {
          success: false,
          code: 404,
          message: "Inventory not found",
        }
      }

      // Validaciones de relaciones
      const validations = [
        { id: id_categories, model: prisma.categories, name: 'category ID' },
        { id: id_clients, model: prisma.clients, name: 'client ID' },
        { id: id_costs, model: prisma.costs, name: 'cost ID' },
        { id: id_prices, model: prisma.prices, name: 'price ID' },
        { id: id_alternateCodes, model: prisma.alternateCodes, name: 'alternate code ID' },
        { id: id_additionalInfo, model: prisma.additionalInfo, name: 'additional info ID' },
        { id: id_type, model: prisma.type, name: 'type ID' },
        { id: id_finish, model: prisma.finish, name: 'finish ID' },
        { id: id_width, model: prisma.width, name: 'width ID' },
        { id: id_composition, model: prisma.composition, name: 'composition ID' },
        { id: id_physicalLocation, model: prisma.physicalLocation, name: 'physical location ID' },
        { id: id_manufacturer, model: prisma.manufacturer, name: 'manufacturer ID' },
        { id: id_laboratory, model: prisma.laboratory, name: 'laboratory ID' },
        { id: id_unitOfMeasure, model: prisma.unitOfMeasure, name: 'unit of measure ID' },
        { id: id_componentActive, model: prisma.componentActive, name: 'active component ID' },
        { id: id_brand, model: prisma.brand, name: 'brand ID' },
        { id: id_subbrand, model: prisma.subBrand, name: 'subbrand ID' },
        { id: id_model, model: prisma.model, name: 'model ID' },
        { id: id_subCategory, model: prisma.subCategory, name: 'subcategory ID' },
        { id: id_businessUnit, model: prisma.businessUnit, name: 'business unit ID' },
        { id: id_purchaseStatistics, model: prisma.purchaseStatistics, name: 'purchase statistics ID' }
      ]

      for (const validation of validations) {
        if (validation.id) {
          const exists = await validation.model.findUnique({
            where: { id: validation.id }
          })
          if (!exists) {
            return {
              success: false,
              code: 400,
              message: `Invalid ${validation.name}`,
              data: validation.id
            }
          }
        }
      }

      const updatedInventory = await prisma.inventory.update({
        where: { id },
        data
      })

      msg = {
        success: true,
        code: 200,
        message: `${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully`,
        [type]: updatedInventory
      }

      return msg

    } catch (error) {
      console.error("Error updating inventory:", error)
      return {
        success: false,
        code: 500,
        message: "Server error while updating inventory",
        error: error.message
      }
    }
  }

  static async deleteInventory(id) {
    try {
      let msg = {
        status: false,
        msg: "No Inventory found",
        code: 404,
      }

      const inventory = await prisma.inventory.findUnique({ where: { id } })
      if (inventory) {
        await prisma.inventory.delete({ where: { id } })
        msg = {
            success: true,
            code: 200,
            message: "inventory deleted",
            inventory,
          }
      }

      return msg

    } catch (error) {
      console.error("Error inventory: " , error)
    }
  }
}
