const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {
	constructor() {
	}

	async create(data) {
	try {

    const newOrder = await models.Order.create(data);
		return newOrder;

    } catch (error) {
        throw boom.notFound(error)
    }
	}
  async addItem(data) {
    try {

        const newItem = await models.order_product.create(data);
        return newItem;

    } catch (error) {
        throw boom.notAcceptable(error)
    }
	}

	async findByUser(userId) {
    const orders = await models.Order.findAll( {
      where:{
        '$customer.user.id$':userId //asociones a la cual quiere hacer la consulta
      },
			include: [
				{
					association: 'customer',
					include: ['user'],
				},

			],
		});

		return orders
	}
	async find() {
		return [];
	}

	async findOne(id) {
		const order = await models.Order.findByPk(id, {
			include: [
				{
					association: 'customer',
					include: ['user'],
				},
        'items'
			],
		});
		return order;
	}

	async update(id, changes) {
		return {
			id,
			changes,
		};
	}

	async delete(id) {
		return { id };
	}
}

module.exports = OrderService;
