import prisma from "../../config/prisma.js"

export class InventoryEntities2 {

  // -- Depositos --

  static async getDeposits() {
    try {
      let msg = {
        status: false,
        msg: "No Deposits found",
        code: 404,
      }

      const deposits = await prisma.deposits.findMany()
      if (deposits.length > 0) {
        msg = {
            success: true,
            code: 200,
            message: "Deposits Found",
            deposits,
          }
      }

      return msg

    } catch (error) {
      console.error("Error inventory: " , error)
    }
  }

  static async getDeposit(id){
    try {
      let msg = {
        status: false,
        msg: "No deposit found",
        code: 404,
      }

      const deposit = await prisma.deposits.findUnique({ where: { id } })
      if (deposit) {
        msg = {
            success: true,
            code: 200,
            message: "deposit Found",
            deposit,
          }
      }

      return msg

    } catch (error) {
      console.error("Error deposit: " , error)
    }
  }

  static async createDeposit(data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "deposit creation failed",
      };

      const searchDeposit = await prisma.deposits.findMany({
        where: { name: data.name }
      })
      if (searchDeposit.length > 0) {
        return msg = {
          success: false,
          code: 400,
          message: 'Invalid Deposit Name duplicated',
          data: data.name
        }
      }
  
      const deposit = await prisma.deposits.create({ data })

      msg = {
        success: true,
        code: 200,
        message: `deposit created successfully`,
        data: deposit
      };

      return msg

    } catch (error) {
      console.error("Error creating deposit:", error);
      return {
        success: false,
        code: 500,
        message: "Server error while creating deposit",
        error: error.message
      };
    }
  }

  static async editDeposit(id, data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "Deposit update failed",
      }

      const search = await prisma.deposits.findUnique({ where: { id } })

      if(search){
        const deposit = await prisma.deposits.update({ 
          data,
          where: { id } 
        })

        msg = {
          success: true,
          code: 200,
          message: `Deposit updated successfully`,
          deposit: deposit
        }
      }


      return msg

    } catch (error) {
      console.error("Error updating deposit:", error)
      return {
        success: false,
        code: 500,
        message: "Server error while updating deposit",
        error: error.message
      }
    }
  }

  static async deleteDeposit(id) {
    try {
      let msg = {
        status: false,
        msg: "No deposit found",
        code: 404,
      }

      const deposit = await prisma.deposits.findUnique({ where: { id } })
      if (deposit) {
        await prisma.deposits.delete({ where: { id } })
        msg = {
            success: true,
            code: 200,
            message: "deposit deleted",
            deposit,
          }
      }

      return msg

    } catch (error) {
      console.error("Error deposit: " , error)
    }
  }

// -- Almancenes --

  static async getWarehouses() {
    try {
      let msg = {
        status: false,
        msg: "No Warehouses found",
        code: 404,
      }

      const Warehouses = await prisma.warehouses.findMany()
      if (Warehouses.length > 0) {
        msg = {
            success: true,
            code: 200,
            message: "Warehouses Found",
            Warehouses,
          }
      }

      return msg

    } catch (error) {
      console.error("Error inventory: " , error)
    }
  }

  static async getWarehouse(id){
    try {
      let msg = {
        status: false,
        msg: "No warehouse found",
        code: 404,
      }

      const warehouse = await prisma.warehouses.findUnique({ where: { id } })
      if (warehouse) {
        msg = {
            success: true,
            code: 200,
            message: "warehouse Found",
            warehouse,
          }
      }

      return msg

    } catch (error) {
      console.error("Error warehouse: " , error)
    }
  }

  static async createWarehouse(data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "Warehouse creation failed",
      };

      const { id_product, id_deposit } = data

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

      const searchDeposit = await prisma.deposits.findUnique({
        where: { id: id_deposit }
      })
      if (!searchDeposit) {
        return res.status(400).json({
          success: false,
          code: 400,
          message: 'Invalid Deposit ID',
          data: id_deposit
        })
      }

      const createdWarehouse = await prisma.warehouses.create({ data })

      msg = {
        success: true,
        code: 200,
        message: `Warehouse created successfully`,
        data: createdWarehouse
      };

      return msg

    } catch (error) {
      console.error("Error creating Warehouse:", error);
      return {
        success: false,
        code: 500,
        message: "Server error while creating Warehouse",
        error: error.message
      };
    }
  }

  static async editWarehouse(id, data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "Warehouse update failed",
      }

      const search = await prisma.warehouses.findUnique({ where: { id } })

      if(search){
        const warehouse = await prisma.warehouses.update({ 
          data,
          where: { id } 
        })

        msg = {
          success: true,
          code: 200,
          message: `Warehouse updated successfully`,
          warehouse: warehouse
        }
      }


      return msg

    } catch (error) {
      console.error("Error updating warehouse:", error)
      return {
        success: false,
        code: 500,
        message: "Server error while updating warehouse",
        error: error.message
      }
    }
  }

  static async deleteWarehouse(id) {
    try {
      let msg = {
        status: false,
        msg: "No warehouse found",
        code: 404,
      }

      const warehouse = await prisma.warehouses.findUnique({ where: { id } })
      if (warehouse) {
        await prisma.warehouses.delete({ where: { id } })
        msg = {
            success: true,
            code: 200,
            message: "Warehouse deleted",
            data: warehouse
          }
      }

      return msg

    } catch (error) {
      console.error("Error warehouse: " , error)
    }
  }

  // -- Stock --

  static async getDetailedStocks() {
    try {
      let msg = {
        status: false,
        msg: "No Detailed Stocks found",
        code: 404,
      }

      const stock = await prisma.detailStock.findMany()
      if (stock.length > 0) {
        msg = {
            success: true,
            code: 200,
            message: "Detailed Stocks Found",
            stock,
          }
      }

      return msg

    } catch (error) {
      console.error("Error get Detailed Stocks: " , error)
    }
  }

  static async getDetailedStock(id){
    try {
      let msg = {
        status: false,
        msg: "No Detailed Stocks found",
        code: 404,
      }

      const stock = await prisma.detailStock.findUnique({ where: { id } })
      if (stock) {
        msg = {
            success: true,
            code: 200,
            message: "Detailed Stock Found",
            data: stock,
          }
      }

      return msg

    } catch (error) {
      console.error("Error Detailed Stocks: " , error)
    }
  }

  static async createDetailStock(data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "Detailed Stocks creation failed",
      };

      const { id_product, id_warehouses } = data

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

      const searchWarehouses = await prisma.warehouses.findUnique({
        where: { id: id_warehouses }
      })
      if (!searchWarehouses) {
        return res.status(400).json({
          success: false,
          code: 400,
          message: 'Invalid Warehouses ID',
          data: id_warehouses
        })
      }

      const createDetailStock = await prisma.detailStock.create({ data })

      msg = {
        success: true,
        code: 200,
        message: `Detailed Stock created successfully`,
        data: createDetailStock
      };

      return msg

    } catch (error) {
      console.error("Error creating Detailed Stock:", error);
      return {
        success: false,
        code: 500,
        message: "Server error while creating Detailed Stock",
        error: error.message
      };
    }
  }

  static async editDetailStock(id, data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "Detailed Stock update failed",
      }

      const search = await prisma.detailStock.findUnique({ where: { id } })

      if(search){
        const detailStock = await prisma.detailStock.update({ 
          data,
          where: { id } 
        })

        msg = {
          success: true,
          code: 200,
          message: `Detailed Stock updated successfully`,
          data: detailStock
        }
      }


      return msg

    } catch (error) {
      console.error("Error updating Detailed Stock:", error)
      return {
        success: false,
        code: 500,
        message: "Server error while updating Detailed Stock",
        error: error.message
      }
    }
  }

  static async deleteDetailStock(id) {
    try {
      let msg = {
        status: false,
        msg: "No Detailed Stock found",
        code: 404,
      }

      const detailStock = await prisma.detailStock.findUnique({ where: { id } })
      if (detailStock) {
        await prisma.detailStock.delete({ where: { id } })
        msg = {
            success: true,
            code: 200,
            message: "Detailed Stock deleted",
            data: detailStock
          }
      }

      return msg

    } catch (error) {
      console.error("Error detailed Stock: " , error)
    }
  }

  // -- Información Adicional --

  static async getAdditionalInfoAll() {
    try {
      let msg = {
        status: false,
        msg: "No Additional Info found",
        code: 404,
      }

      const info = await prisma.additionalInfo.findMany()
      if (info.length > 0) {
        msg = {
            success: true,
            code: 200,
            message: "Additional Info Found",
            data: info,
          }
      }

      return msg

    } catch (error) {
      console.error("Error get Additional Info: " , error)
    }
  }

  static async getAdditionalInfo(id){
    try {
      let msg = {
        status: false,
        msg: "No Additional Info found",
        code: 404,
      }

      const info = await prisma.additionalInfo.findUnique({ where: { id } })
      if (info) {
        msg = {
            success: true,
            code: 200,
            message: "Additional Info Found",
            data: info,
          }
      }

      return msg

    } catch (error) {
      console.error("Error Additional Info: " , error)
    }
  }

  static async createAdditionalInfo(data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "Additional Info creation failed",
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

      const createAddInfo = await prisma.additionalInfo.create({ data })

      msg = {
        success: true,
        code: 200,
        message: `Additional Info created successfully`,
        data: createAddInfo
      };

      return msg

    } catch (error) {
      console.error("Error creating Additional Info:", error);
      return {
        success: false,
        code: 500,
        message: "Server error while creating Additional Info",
        error: error.message
      };
    }
  }

  static async editAdditionalInfo(id, data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "Additional Info update failed",
      }

      const search = await prisma.additionalInfo.findUnique({ where: { id } })

      if(search){
        const additionalInfo = await prisma.additionalInfo.update({ 
          data,
          where: { id } 
        })

        msg = {
          success: true,
          code: 200,
          message: `Additional Info updated successfully`,
          data: additionalInfo
        }
      }


      return msg

    } catch (error) {
      console.error("Error updating Additional Info:", error)
      return {
        success: false,
        code: 500,
        message: "Server error while updating Additional Info",
        error: error.message
      }
    }
  }

  static async deleteAdditionalInfo(id) {
    try {
      let msg = {
        status: false,
        msg: "No Additional Info found",
        code: 404,
      }

      const additionalInfo = await prisma.additionalInfo.findUnique({ where: { id } })
      if (additionalInfo) {
        await prisma.additionalInfo.delete({ where: { id } })
        msg = {
            success: true,
            code: 200,
            message: "Additional Info deleted",
            data: additionalInfo
          }
      }

      return msg

    } catch (error) {
      console.error("Error Additional Info: " , error)
    }
  }

  // -- Productos Compuestos --

  static async getCompositeProducts() {
    try {
      let msg = {
        status: false,
        msg: "No Composite Products found",
        code: 404,
      }

      const info = await prisma.compositeProduct.findMany()
      if (info.length > 0) {
        msg = {
            success: true,
            code: 200,
            message: "Composite Products Found",
            data: info,
          }
      }

      return msg

    } catch (error) {
      console.error("Error get Composite Products: " , error)
    }
  }

  static async getCompositeProduct(id){
    try {
      let msg = {
        status: false,
        msg: "No Composite Product found",
        code: 404,
      }

      const info = await prisma.compositeProduct.findUnique({ where: { id } })
      if (info) {
        msg = {
            success: true,
            code: 200,
            message: "Composite Product Found",
            data: info,
          }
      }

      return msg

    } catch (error) {
      console.error("Error Composite Product: " , error)
    }
  }

  static async createCompositeProduct(data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "Composite Product creation failed",
      };

      const { id_product, id_product_child } = data

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

      const searchProductChild = await prisma.inventory.findUnique({
        where: { id_product: id_product_child }
      })
      if (!searchProductChild) {
        return res.status(400).json({
          success: false,
          code: 400,
          message: 'Invalid Id Product Child',
          data: id_product_child
        })
      }

      const create = await prisma.compositeProduct.create({ data })

      msg = {
        success: true,
        code: 200,
        message: `Composite Product created successfully`,
        data: create
      };

      return msg

    } catch (error) {
      console.error("Error creating Composite Product:", error);
      return {
        success: false,
        code: 500,
        message: "Server error while creating Composite Product",
        error: error.message
      };
    }
  }

  static async editCompositeProduct(id, data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "Composite Product update failed",
      }

      const search = await prisma.compositeProduct.findUnique({ where: { id } })

      if(search){
        const compositeProduct = await prisma.compositeProduct.update({ 
          data,
          where: { id } 
        })

        msg = {
          success: true,
          code: 200,
          message: `Composite Product updated successfully`,
          data: compositeProduct
        }
      }

      return msg

    } catch (error) {
      console.error("Error updating Composite Product:", error)
      return {
        success: false,
        code: 500,
        message: "Server error while updating Composite Product",
        error: error.message
      }
    }
  }

  static async deleteCompositeProduct(id) {
    try {
      let msg = {
        status: false,
        msg: "No Composite Product found",
        code: 404,
      }

      const compositeProduct = await prisma.compositeProduct.findUnique({ where: { id } })
      if (compositeProduct) {
        await prisma.compositeProduct.delete({ where: { id } })
        msg = {
            success: true,
            code: 200,
            message: "Composite Product deleted",
            data: compositeProduct
          }
      }

      return msg

    } catch (error) {
      console.error("Error Composite Product: " , error)
    }
  }
}
