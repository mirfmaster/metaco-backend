const ErrorInstance = require("../../../utils/ErrorInstance");
const httpResponse = require("../../../core/supports/httpResponse");
const {
    sequelize,
    Sequelize
} = require("../../models");

class BaseService {
    constructor(opts) {
        if (!opts.model) throw new ErrorInstance("Model is not defined!", 500)
        Object.assign(this, opts);
        this.defaultOrder = {
            order: [
                ['id', 'ASC']
            ]
        }
    }

    /**
     * Retrieve all entries from the table 
     * 
     * @param object query 
     * @returns array list
     */
    async get(query = {}) {
        try {
            if (!query.order) {
                query = {
                    ...query,
                    ...this.defaultOrder
                }
            }
            return await this.model.findAll(query);
        } catch (error) {
            throw new ErrorInstance(error.message, httpResponse.BAD_REQUEST);
        }
    }


    /**
     * Retrieve one entry from the table 
     * 
     * @param object query 
     * @returns array list
     */
    async first(query = {}, returnInstance = false) {
        try {
            let result = await this.model.findOne(query)
            if (!result) return result;

            return returnInstance ? result : result.dataValues;
        } catch (error) {
            throw new ErrorInstance(error.message, httpResponse.BAD_REQUEST);
        }
    }



    /**
     * Retrieve one entry from the table
     * 
     * @param object query 
     * @returns array list
     */
    async firstOrFail(query = {}, returnInstance = false) {
        try {
            let result = await this.model.findOne(query);
            // console.log(result);
            // if (!result) throw Error("Record not found")

            return returnInstance ? result : result.dataValues;
        } catch (error) {
            throw new ErrorInstance(error.message, httpResponse.NOT_FOUND)
        }
    }

    /**
     * The find method obtains only a single entry from the table 
     * using the provided primary key.
     * 
     * @param number Primary key - id 
     * @returns object result
     */
    async findById(id) {
        try {
            let result = await this.model.findByPk(id);
            if (!result) throw Error("Data is not found");
            return result
        } catch (error) {
            throw new ErrorInstance(error.message, httpResponse.NOT_FOUND)
        }
    }

    /**
     * Perform bulkCreate into model
     * 
     * @param array model properties 
     * @returns created record 
     */
    async bulkCreate(array) {
        try {
            return await this.model.bulkCreate(array)
        } catch (error) {
            throw new ErrorInstance(error.message, httpResponse.BAD_REQUEST);
        }
    }

    /**
     * Perform insert into model
     * 
     * @param object model properties 
     * @returns created record 
     */
    async create(object) {
        try {
            return await this.model.create(object)
        } catch (error) {
            throw new ErrorInstance(error.message, httpResponse.BAD_REQUEST);
        }
    }

    /**
     * Perform update to the found record
     * 
     * @param id primary key ID of model
     * @param object model properties
     * 
     * @returns updated record
     */
    async update(id, object) {
        try {
            let record = await this.model.findByPk(id);
            if (!record) throw new Error(`Update failed on id: ${id} is not found`)

            return await record.update(object)
        } catch (error) {
            throw new ErrorInstance(error.message, httpResponse.BAD_REQUEST)
        }
    }

    /**
     * Perform delete of searched object with custom object
     * 
     * @param  object primary key
     * @returns bool
     */
    async destroy(object) {
        try {
            let record = await this.model.destroy(object);
            if (!record) throw Error(`Delete failed, data is not found`)

            return record
        } catch (error) {
            throw new ErrorInstance(error.message, httpResponse.NOT_FOUND)
        }
    }


    /**
     * Perform delete of searched object by ID
     * 
     * @param  id primary key
     * @returns bool
     */
    async destroyById(id) {
        try {
            let record = await this.model.destroy({
                where: {
                    id
                }
            });
            if (!record) throw Error(`Delete failed on id: ${id} is not found`)

            return record
        } catch (error) {
            throw new ErrorInstance(error.message, httpResponse.NOT_FOUND)
        }
    }

    async querySelect(query, replacements = null) {
        try {
            let options = {
                type: Sequelize.QueryTypes.SELECT
            }
            if (replacements) {
                options = {
                    ...options,
                    replacements
                }
            }
            console.log(replacements, options);

            let record = await sequelize.query(query, options);
            if (!record) throw Error(`Query select failed at model: ${this.model}`)

            return record
        } catch (error) {
            throw new ErrorInstance(error.message, httpResponse.SERVER_ERROR)
        }
    }
}

module.exports = BaseService;