import { Injectable } from "@nestjs/common";
import { CommonService } from "./common";

@Injectable()
export class DBService {
  constructor(private readonly commonService: CommonService) {}
  /*
   * createDocument : create any mongoose document
   * @param  model  : mongoose model
   * @param  data   : {}
   */
  createDocument = (model, data) =>
    new Promise((resolve, reject) => {
      model.create(data, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

  /*
   * updateDocument : update any existing mongoose document
   * @param  model  : mongoose model
   * @param id      : mongoose document's _id
   * @param data    : {}
   */
  updateDocument = (model, id, data) =>
    new Promise((resolve, reject) => {
      model.updateOne(
        { _id: id },
        data,
        {
          runValidators: true,
          context: "query",
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        },
      );
    });

  /*
   * deleteDocument : delete any existing mongoose document
   * @param  model  : mongoose model
   * @param  id     : mongoose document's _id
   */
  deleteDocument = (model, id) =>
    new Promise((resolve, reject) => {
      model.deleteOne({ _id: id }, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

  /*
   * getAllDocuments : find all the mongoose document
   * @param  model   : mongoose model
   * @param query    : {}
   * @param options  : {}
   */
  getAllDocuments = async (model, query, options) => {
    query = await this.commonService.getFilterQuery(query);
    return new Promise((resolve, reject) => {
      model.paginate(query, options, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  };

  /*
   * getSingleDocumentById : find single mongoose document
   * @param  model  : mongoose model
   * @param  id     : mongoose document's _id
   * @param  select : [] *optional
   */
  getSingleDocumentById = (model, id, select = []) =>
    new Promise((resolve, reject) => {
      model.findOne({ _id: id }, select, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
}
