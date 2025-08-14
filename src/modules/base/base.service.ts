import boom from '@hapi/boom';
import moment from 'moment';
import { GetAllResponse, IBaseService } from '../base/base.interface';

class BaseService<T> implements IBaseService<T> {
  model: any;

  constructor(model: any) {
    this.model = model;
  }

  /**
   * @description method to get all the records easily, this is done so that just by extending the base class, you have access to an entire crud
   * @param professionalId
   * @param includeModel
   * @param page
   * @param size
   * @param where
   * @param all
   * @returns {HttpResponse.getSuccessful | boom.badRequest}
   */
  public async getAll(
    professionalId?: string | null,
    includeModel?: object,
    page?: number,
    size?: number,
    all?: boolean,
    where?: Record<string, unknown>,
  ): Promise<GetAllResponse<T>> {
    try {
      let whereCondition = { ...where };
      if (professionalId) {
        whereCondition.professionalId = professionalId;
      }

      const { limit, offset } = all
        ? { limit: null, offset: null }
        : { limit: size || 10, offset: page ? (page - 1) * (size || 10) : 0 };

      const records = await this.model.findAndCountAll({
          where: whereCondition,
          limit,
          offset,
          include: includeModel,
          subQuery: false,
          distinct: true,
        });

        if (!all) {
        const pages = Math.ceil(records.count / Number(limit));
        records.pagesQuantity = pages;
        }

        return records;
    } catch (e) {
      throw boom.badRequest(e);
    }
  }

  /**
   * @description method to easily obtain a record through a column, this is done so that by simply extending the base class, you have access to an entire crud
   * @param professionalId
   * @param where
   * @param includeModel
   * @returns
   */
  async getOne(
    where: Record<string, unknown>,
    includeModel?: object,
    professionalId?: string,
  ): Promise<T> {
    try {
      if (professionalId) {
        where.professionalId = professionalId;
      }

      const record = await this.model.findOne({
        where,
        include: includeModel,
      });

      if (!record) throw boom.notFound(`${this.model.name} not found`);

      return record;
    } catch (e) {
      throw boom.badRequest(e);
    }
  }

  /**
   * basic method for create a record in the db, body must arrive validated
   * @param professionalId
   * @param body
   * @param include
   * @returns {HttpResponse.postSuccessful | boom.badRequest}
   */
  async create(body: any, professionalId?: string, include?: any[]): Promise<T> {
    try {
      if (professionalId) {
        body.professionalId = professionalId;
      }

      const record = await this.model.create(body, include);

      return record;
    } catch (e) {
      throw boom.badRequest(e);
    }
  }

  /**
   * update a record in Bd
   * @param professionalId
   * @param body
   * @param where
   * @returns {HttpResponse.postSuccessful | boom.badRequest}
   */
  async update(body: any, where: Record<string, unknown>, professionalId?: string): Promise<T> {
    try {
      const record = await this.model.findOne({ where });

      if (!record) throw boom.notFound(`${this.model.name} not found`);

      if (professionalId && record.professionalId !== professionalId) {
        throw boom.unauthorized('You are not authorized to update this record');
      }

      body.updatedAt = moment().toISOString();
      
      await this.model.update(body, {where});
      const updatedRecord = await record.reload();

      return updatedRecord;
    } catch (e) {
      throw boom.badRequest(e);
    }
  }

  /**
   * basic method for delete a record in the db
   * @param where
   * @param professionalId
   * @param physicalDestroy
   * @returns {HttpResponse.deleteSuccessful | boom.badRequest}
   */
  async delete(
    where: Record<string, unknown>,
    professionalId?: string,
    physicalDestroy?: boolean,
  ): Promise<{ message: string; record?: any }> {
    try {
      const record = await this.model.findOne({ where });

      if (!record) throw boom.notFound(`${this.model.name} not found`);

      if (professionalId && record.professionalId !== professionalId) {
        throw boom.unauthorized('You are not authorized to delete this record');
      }

      if (physicalDestroy) {
        await this.model.delete({ where });
        return { message: 'Record deleted successfully' };
      }

      const updatedRecord = await this.model.update(
        { deleted: true, updatedAt: moment().toISOString() },
        { where },
      );
      return { message: 'Record deleted successfully', record: updatedRecord };
    } catch (e) {
      throw boom.badRequest(e);
    }
  }
}

export default BaseService;