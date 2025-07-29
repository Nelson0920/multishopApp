import prisma from "../../config/prisma.js"

export class InventoryEntities3 {

  // -- Alertas de Producto --

  static async getAlertProducts() {
    try {
      let msg = {
        status: false,
        msg: "No Alert Products found",
        code: 404,
      }

      const info = await prisma.productAlert.findMany()
      if (info.length > 0) {
        msg = {
            success: true,
            code: 200,
            message: "Alert Products Found",
            data: info,
          }
      }

      return msg

    } catch (error) {
      console.error("Error get Alert Products: " , error)
    }
  }

  static async getAlertProduct(id){
    try {
      let msg = {
        status: false,
        msg: "No Alert Product found",
        code: 404,
      }

      const info = await prisma.productAlert.findUnique({ where: { id } })
      if (info) {
        msg = {
            success: true,
            code: 200,
            message: "Alert Product Found",
            data: info,
          }
      }

      return msg

    } catch (error) {
      console.error("Error Alert Product: " , error)
    }
  }

  static async createAlertProduct(data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "Alert Product creation failed",
      };

      const { id_product } = data

      // Validaciones de relaciones
      const searchProduct = await prisma.inventory.findUnique({
        where: { id_product: id_product }
      })
      if (!searchProduct) {
        return res.status(400).json({
          success: false,
          code: 400,
          message: 'Invalid Id Product',
          data: id_product
        })
      }

      const create = await prisma.productAlert.create({ data })

      msg = {
        success: true,
        code: 200,
        message: `Alert Product created successfully`,
        data: create
      };

      return msg

    } catch (error) {
      console.error("Error creating Alert Product:", error);
      return {
        success: false,
        code: 500,
        message: "Server error while creating Alert Product",
        error: error.message
      };
    }
  }

  static async editAlertProduct(id, data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "Alert Product update failed",
      }

      const search = await prisma.productAlert.findUnique({ where: { id } })

      if(search){
        const AlertProduct = await prisma.productAlert.update({ 
          data,
          where: { id } 
        })

        msg = {
          success: true,
          code: 200,
          message: `Alert Product updated successfully`,
          data: AlertProduct
        }
      }

      return msg

    } catch (error) {
      console.error("Error updating Alert Product:", error)
      return {
        success: false,
        code: 500,
        message: "Server error while updating Alert Product",
        error: error.message
      }
    }
  }

  static async deleteAlertProduct(id) {
    try {
      let msg = {
        status: false,
        msg: "No Alert Product found",
        code: 404,
      }

      const AlertProduct = await prisma.productAlert.findUnique({ where: { id } })
      if (AlertProduct) {
        await prisma.productAlert.delete({ where: { id } })
        msg = {
            success: true,
            code: 200,
            message: "Alert Product deleted",
            data: AlertProduct
          }
      }

      return msg

    } catch (error) {
      console.error("Error Alert Product: " , error)
    }
  }

  // -- Estadísticas de Compra --

    static async getPurchaseStatistics() {
    try {
      let msg = {
        status: false,
        msg: "No Purchase Statistics found",
        code: 404,
      }

      const info = await prisma.purchaseStatistics.findMany()
      if (info.length > 0) {
        msg = {
            success: true,
            code: 200,
            message: "Purchase Statistics Found",
            data: info,
          }
      }

      return msg

    } catch (error) {
      console.error("Error get Purchase Statistics: " , error)
    }
  }

  static async getPurchaseStatistic(id){
    try {
      let msg = {
        status: false,
        msg: "No Purchase Statistics found",
        code: 404,
      }

      const info = await prisma.purchaseStatistics.findUnique({ where: { id } })
      if (info) {
        msg = {
            success: true,
            code: 200,
            message: "Purchase Statistics Found",
            data: info,
          }
      }

      return msg

    } catch (error) {
      console.error("Error Purchase Statistics: " , error)
    }
  }

  static async createPurchaseStatistic(data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "Purchase Statistics creation failed",
      };

      const { id_product } = data

      // Validaciones de relaciones
      const searchProduct = await prisma.inventory.findUnique({
        where: { id_product: id_product }
      })
      if (!searchProduct) {
        return res.status(400).json({
          success: false,
          code: 400,
          message: 'Invalid Id Product',
          data: id_product
        })
      }

      const create = await prisma.purchaseStatistics.create({ data })

      msg = {
        success: true,
        code: 200,
        message: `Purchase Statistics created successfully`,
        data: create
      };

      return msg

    } catch (error) {
      console.error("Error creating Purchase Statistics:", error);
      return {
        success: false,
        code: 500,
        message: "Server error while creating Purchase Statistics",
        error: error.message
      };
    }
  }

  static async editPurchaseStatistic(id, data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "Purchase Statistics update failed",
      }

      const search = await prisma.purchaseStatistics.findUnique({ where: { id } })

      if(search){
        const PurchaseStatistic = await prisma.purchaseStatistics.update({ 
          data,
          where: { id } 
        })

        msg = {
          success: true,
          code: 200,
          message: `Purchase Statistics updated successfully`,
          data: PurchaseStatistic
        }
      }

      return msg

    } catch (error) {
      console.error("Error updating Purchase Statistics:", error)
      return {
        success: false,
        code: 500,
        message: "Server error while updating Purchase Statistics",
        error: error.message
      }
    }
  }

  static async deletePurchaseStatistic(id) {
    try {
      let msg = {
        status: false,
        msg: "No Purchase Statistics found",
        code: 404,
      }

      const PurchaseStatistic = await prisma.purchaseStatistics.findUnique({ where: { id } })
      if (PurchaseStatistic) {
        await prisma.purchaseStatistics.delete({ where: { id } })
        msg = {
            success: true,
            code: 200,
            message: "Purchase Statistics deleted",
            data: PurchaseStatistic
          }
      }

      return msg

    } catch (error) {
      console.error("Error Purchase Statistics: " , error)
    }
  }

  // -- Funciones Web --

    static async getWebFeatures() {
    try {
      let msg = {
        status: false,
        msg: "No Web Feature found",
        code: 404,
      }

      const info = await prisma.webFeatures.findMany()
      if (info.length > 0) {
        msg = {
            success: true,
            code: 200,
            message: "Web Feature Found",
            data: info,
          }
      }

      return msg

    } catch (error) {
      console.error("Error get Web Feature: " , error)
    }
  }

  static async getWebFeature(id){
    try {
      let msg = {
        status: false,
        msg: "No Web Feature found",
        code: 404,
      }

      const info = await prisma.webFeatures.findUnique({ where: { id } })
      if (info) {
        msg = {
            success: true,
            code: 200,
            message: "Web Feature Found",
            data: info,
          }
      }

      return msg

    } catch (error) {
      console.error("Error Web Feature: " , error)
    }
  }

  static async createWebFeature(data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "Web Feature creation failed",
      };

      const { id_product } = data

      // Validaciones de relaciones
      const searchProduct = await prisma.inventory.findUnique({
        where: { id_product: id_product }
      })
      if (!searchProduct) {
        return res.status(400).json({
          success: false,
          code: 400,
          message: 'Invalid Id Product',
          data: id_product
        })
      }

      const create = await prisma.webFeatures.create({ data })

      msg = {
        success: true,
        code: 200,
        message: `Web Feature created successfully`,
        data: create
      };

      return msg

    } catch (error) {
      console.error("Error creating Web Feature:", error);
      return {
        success: false,
        code: 500,
        message: "Server error while creating Web Feature",
        error: error.message
      };
    }
  }

  static async editWebFeature(id, data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "Web Feature update failed",
      }

      const search = await prisma.webFeatures.findUnique({ where: { id } })

      if(search){
        const WebFeature = await prisma.webFeatures.update({ 
          data,
          where: { id } 
        })

        msg = {
          success: true,
          code: 200,
          message: `Web Feature updated successfully`,
          data: WebFeature
        }
      }

      return msg

    } catch (error) {
      console.error("Error updating Web Feature:", error)
      return {
        success: false,
        code: 500,
        message: "Server error while updating Web Feature",
        error: error.message
      }
    }
  }

  static async deleteWebFeature(id) {
    try {
      let msg = {
        status: false,
        msg: "No Web Feature found",
        code: 404,
      }

      const webFeature = await prisma.webFeatures.findUnique({ where: { id } })
      if (webFeature) {
        await prisma.webFeatures.delete({ where: { id } })
        msg = {
            success: true,
            code: 200,
            message: "Web Feature deleted",
            data: webFeature
          }
      }

      return msg

    } catch (error) {
      console.error("Error Web Feature: " , error)
    }
  }


}
