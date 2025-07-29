import prisma from "../../config/prisma.js"

export class InventoryEntities {

  // -- Precios --

  static async getPrices() {
    try {
      let msg = {
        status: false,
        msg: "No prices found",
        code: 404,
      }

      const prices = await prisma.prices.findMany()
      if (prices.length > 0) {
        msg = {
            success: true,
            code: 200,
            message: "prices Found",
            prices,
          }
      }

      return msg

    } catch (error) {
      console.error("Error inventory: " , error)
    }
  }

  static async getPrice(id){
    try {
      let msg = {
        status: false,
        msg: "No price found",
        code: 404,
      }

      const price = await prisma.prices.findUnique({ where: { id } })
      if (price) {
        msg = {
            success: true,
            code: 200,
            message: "Price Found",
            price,
          }
      }

      return msg

    } catch (error) {
      console.error("Error price: " , error)
    }
  }

  static async createPrice(data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "Price creation failed",
      };

      const { id_product, id_typeCurrency, id_cost_center , value, type, id_user } = data

      console.log(data)

      // Validaciones de relaciones
      // const searchProduct = await prisma.inventory.findUnique({
      //   where: { id: id_product }
      // })
      // if (!searchProduct) {
      //   return res.status(400).json({
      //     success: false,
      //     code: 400,
      //     message: 'Invalid Id Product',
      //     data: id_product
      //   })
      // }
  
      // const searchCost = await prisma.costCenter.findUnique({
      //   where: { id: id_cost_center }
      // })
      // if (!searchCost) {
      //   return res.status(400).json({
      //     success: false,
      //     code: 400,
      //     message: 'Invalid Cost Center ID',
      //     data: id_cost_center
      //   })
      // }
  
      // const search = await prisma.typeCurrency.findUnique({
      //   where: { id: id_typeCurrency }
      // })
      // if (!search) {
      //   return res.status(400).json({
      //     success: false,
      //     code: 400,
      //     message: 'Invalid Type Currency ID',
      //     data: id_typeCurrency
      //   })
      // }
  
      // Buscar valor anterior del precio
      const previousPrice = await prisma.prices.findFirst({
        where: { id_product },
        orderBy: { createdAt: 'desc' }
      })
  
      const createdPrice = await prisma.prices.create({ data })
  
      // Crear entrada en PriceHistory
      await prisma.priceHistory.create({
        data: {
          id_product,
          id_user: "userTest1",
          type_price: "type",
          old_value: previousPrice?.value || 0,
          new_value: data.price_base,
          module: 'price'
        }
      })

      msg = {
        success: true,
        code: 200,
        message: `Price created successfully`,
        price: createdPrice
      };

      return msg

    } catch (error) {
      console.error("Error creating price:", error);
      return {
        success: false,
        code: 500,
        message: "Server error while creating price",
        error: error.message
      };
    }
  }

  static async editPrice(id, data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "Price update failed",
      }

      const search = await prisma.prices.findUnique({ where: { id } })

      if(search){
        const price = await prisma.prices.update({ 
          data,
          where: { id } 
        })

        msg = {
          success: true,
          code: 200,
          message: `Price updated successfully`,
          price: price
        }
      }


      return msg

    } catch (error) {
      console.error("Error updating price:", error)
      return {
        success: false,
        code: 500,
        message: "Server error while updating price",
        error: error.message
      }
    }
  }

  static async deletePrice(id) {
    try {
      let msg = {
        status: false,
        msg: "No price found",
        code: 404,
      }

      const price = await prisma.prices.findUnique({ where: { id } })
      if (price) {
        await prisma.prices.delete({ where: { id } })
        msg = {
            success: true,
            code: 200,
            message: "price deleted",
            price,
          }
      }

      return msg

    } catch (error) {
      console.error("Error price: " , error)
    }
  }

      // -- Costos --

  static async getCosts() {
    try {
      let msg = {
        status: false,
        msg: "No costs found",
        code: 404,
      }

      const costs = await prisma.costs.findMany()
      if (costs.length > 0) {
        msg = {
            success: true,
            code: 200,
            message: "costs Found",
            costs,
          }
      }

      return msg

    } catch (error) {
      console.error("Error costs: " , error)
    }
  }

  static async getCost(id){
    try {
      let msg = {
        status: false,
        msg: "No cost found",
        code: 404,
      }

      const cost = await prisma.costs.findUnique({ where: { id } })
      if (cost) {
        msg = {
            success: true,
            code: 200,
            message: "cost Found",
            cost,
          }
      }

      return msg

    } catch (error) {
      console.error("Error cost: " , error)
    }
  }

  static async createCost(data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "Cost creation failed",
      };

      const { id_product, id_typeCurrency, id_user } = data

      console.log(data)

      // Validaciones de relaciones
      // const searchProduct = await prisma.inventory.findUnique({
      //   where: { id: id_product }
      // })
      // if (!searchProduct) {
      //   return res.status(400).json({
      //     success: false,
      //     code: 400,
      //     message: 'Invalid Id Product',
      //     data: id_product
      //   })
      // }

      // const search = await prisma.typeCurrency.findUnique({
      //   where: { id: id_typeCurrency }
      // })
      // if (!search) {
      //   return res.status(400).json({
      //     success: false,
      //     code: 400,
      //     message: 'Invalid Type Currency ID',
      //     data: id_typeCurrency
      //   })
      // }

      // const searchCost = await prisma.costCenter.findUnique({
      // where: { id: id_cost_center }
      // })
      // if (!searchCost) {
      //   return res.status(400).json({
      //     success: false,
      //     code: 400,
      //     message: 'Invalid Cost Center ID',
      //     data: id_cost_center
      //   })
      // }

      // Buscar valor anterior del precio
      const previouscost = await prisma.costs.findFirst({
        where: { id_product },
        orderBy: { createdAt: 'desc' }
      })

      const createdcost = await prisma.costs.create({ data })

      // Crear entrada en costHistory
      await prisma.costHistory.create({
        data: {
          id_product,
          id_user: "idusertest",
          type_cost: "type",
          old_value: previouscost?.value || data.previous_cost,
          new_value: data.current_cost,
          module: 'cost'
        }
      })

      msg = {
        success: true,
        code: 200,
        message: `Cost created successfully`,
        cost: createdcost
      };

      return msg

    } catch (error) {
      console.error("Error creating price:", error);
      return {
        success: false,
        code: 500,
        message: "Server error while creating price",
        error: error.message
      };
    }
  }

  static async editCost(id, data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "cost update failed",
      }

      const search = await prisma.costs.findUnique({ where: { id } })

      if(search){
        const cost = await prisma.costs.update({ 
          data,
          where: { id } 
        })

        msg = {
          success: true,
          code: 200,
          message: `cost updated successfully`,
          cost: cost
        }
      }


      return msg

    } catch (error) {
      console.error("Error updating cost:", error)
    }
  }

  static async deleteCost(id) {
    try {
      let msg = {
        status: false,
        msg: "No cost found",
        code: 404,
      }

      const cost = await prisma.costs.findUnique({ where: { id } })
      if (cost) {
        await prisma.costs.delete({ where: { id } })
        msg = {
            success: true,
            code: 200,
            message: "Cost deleted",
            cost,
          }
      }

      return msg

    } catch (error) {
      console.error("Error cost: " , error)
    }
  }

  // -- Códigos Alternos --

  static async getAlternateCodes() {
    try {
      let msg = {
        status: false,
        msg: "No alternateCodes found",
        code: 404,
      }

      const alternateCodes = await prisma.alternateCodes.findMany()
      if (alternateCodes.length > 0) {
        msg = {
            success: true,
            code: 200,
            message: "alternateCodes Found",
            alternateCodes
          }
      }

      return msg

    } catch (error) {
      console.error("Error Alternate Codes: " , error)
    }
  }

  static async getAlternateCode(id){
    try {
      let msg = {
        status: false,
        msg: "No alternateCode found",
        code: 404,
      }

      const alternateCode = await prisma.alternateCodes.findUnique({ where: { id } })
      if (alternateCode) {
        msg = {
            success: true,
            code: 200,
            message: "alternateCode Found",
            alternateCode,
          }
      }

      return msg

    } catch (error) {
      console.error("Error price: " , error)
    }
  }

  static async createAlternateCode(data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "Alternate code creation failed",
      };

      const { id_product, code } = data

      // Validaciones de relaciones
      // const searchProduct = await prisma.inventory.findUnique({
      //   where: { id: id_product }
      // })
      // if (!searchProduct) {
      //   return res.status(400).json({
      //     success: false,
      //     code: 400,
      //     message: 'Invalid Id Product',
      //     data: id_product
      //   })
      // }
  
      await prisma.alternateCodes.create({ data })

      msg = {
        success: true,
        code: 200,
        message: `Alternate Code created successfully`,
        alternateCode: code
      };

      return msg

    } catch (error) {
      console.error("Error creating Alternate code:", error);
      return {
        success: false,
        code: 500,
        message: "Server error while creating Alternate code",
        error: error.message
      };
    }
  }

  static async editAlternateCode(id, data) {
    try {
      let msg = {
        status: false,
        code: 400,
        message: "Alternate code update failed",
      }

      const search = await prisma.alternateCodes.findUnique({ where: { id } })

      if(search){
        await prisma.alternateCodes.update({ 
          data,
          where: { id } 
        })

        msg = {
          success: true,
          code: 200,
          message: `Alternate code updated successfully`,
          alternateCode: data.code
        }
      }


      return msg

    } catch (error) {
      console.error("Error updating Alternate code:", error)
      return {
        success: false,
        code: 500,
        message: "Server error while updating Alternate code",
        error: error.message
      }
    }
  }

  static async deleteAlternateCode(id) {
    try {
      let msg = {
        status: false,
        msg: "No Alternate code found",
        code: 404,
      }

      const alternateCode = await prisma.alternateCodes.findUnique({ where: { id } })
      if (alternateCode) {
        await prisma.alternateCodes.delete({ where: { id } })
        msg = {
            success: true,
            code: 200,
            message: "alternateCode deleted",
            alternateCode,
          }
      }

      return msg

    } catch (error) {
      console.error("Error alternateCode: " , error)
    }
  }

    // -- Tipos de Moneda --

  static async getTypesCurrency() {
    try {
      let msg = {
        status: false,
        msg: "No types of currency found",
        code: 404,
      }

      const typesCurrency = await prisma.typeCurrency.findMany()
      if (typesCurrency.length > 0) {
        msg = {
            success: true,
            code: 200,
            message: "typesCurrency Found",
            typesCurrency,
          }
      }

      return msg

    } catch (error) {
      console.error("Error types of currency: " , error)
    }
  }

  static async getTypeCurrency(id){
    try {
      let msg = {
        status: false,
        msg: "No type currency found",
        code: 404,
      }

      const currency = await prisma.typeCurrency.findUnique({ where: { id } })
      if (currency) {
        msg = {
            success: true,
            code: 200,
            message: "Type Currency Found",
            currency,
          }
      }

      return msg

    } catch (error) {
      console.error("Error type currency: " , error)
    }
  }

  static async createTypeCurrency(data) {
    try {
      let msg = {
        status: false,
        code: 500,
        message: "Type Currency creation failed",
      };

      const { id_product} = data;

      // Validaciones de relaciones solo si se proporciona un valor

      // if (id_product) {
      //   const searchProduct = await prisma.inventory.findUnique({
      //     where: { id: id_product }
      //   });
      //   if (!searchProduct) {
      //     return {
      //       success: false,
      //       code: 400,
      //       message: 'Invalid Id Product',
      //       data: id_product
      //     };
      //   }
      // }

      let previousPrice = null;
      if (id_product) {
        previousPrice = await prisma.typeCurrency.findFirst({
          where: { id_product },
          orderBy: { createdAt: 'desc' }
        });
      }

      const createdTypeCurrency = await prisma.typeCurrency.create({
        data: {
          id_product,
          name: data.name,
          price_value: data.price_value,
          purchase_value: data.purchase_value,
          sales_value: data.sales_value,
          official_value: data.official_value,
          operator: data.operator,
        }
      });

      if (createdTypeCurrency && id_product) {
        await prisma.typeCurrencyHistory.create({
          data: {
            id_typeCurrency: createdTypeCurrency.id,
            type_currency: data.typeCurrency,
            id_user: data.id_user || "userTest1",
            type_price: data.type,
            old_value: previousPrice?.value || 0,
            new_value: data.price_value || value,
            module: 'price'
          }
        });
      }

      msg = {
        success: true,
        code: 200,
        message: `Type currency created successfully`,
        price: createdTypeCurrency
      };

      return msg;

    } catch (error) {
      console.error("Error creating type currency:", error);
      return {
        success: false,
        code: 500,
        message: "Server error while creating type currency",
        error: error.message
      };
    }
  }

  static async editTypeCurrency(id, data) {
    try {
      let msg = {
        status: false,
        code: 500,
        message: "Type Currency update failed",
      }

      const search = await prisma.typeCurrency.findUnique({ where: { id } })

      if(search){
        const typeCurrency = await prisma.typeCurrency.update({ 
          data: {
            id_product: data.id_product,
            name: data.name,
            price_value: data.price_value,
            purchase_value: data.purchase_value,
            sales_value: data.sales_value,
            official_value: data.official_value,
            operator: data.operator,
          },
          where: { id } 
        })

        msg = {
          success: true,
          code: 200,
          message: `Type Currency updated successfully`,
          typeCurrency: typeCurrency
        }
      }

      return msg

    } catch (error) {
      console.error("Error updating type currency:", error)
      return {
        success: false,
        code: 500,
        message: "Server error while updating type currency",
        error: error.message
      }
    }
  }

  static async deleteTypeCurrency(id) {
    try {
      let msg = {
        status: false,
        msg: "No type currency found",
        code: 404,
      }

      const typeCurrency = await prisma.typeCurrency.findUnique({ where: { id } })
      if (typeCurrency) {
        await prisma.typeCurrency.delete({ where: { id } })
        msg = {
            success: true,
            code: 200,
            message: "type currency deleted",
            typeCurrency,
          }
      }

      return msg

    } catch (error) {
      console.error("Error type currency: " , error)
    }
  }
}
