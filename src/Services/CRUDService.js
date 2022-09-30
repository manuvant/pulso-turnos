import axios from "axios";
import config from "../config";

class CRUDService {
   nombreRecurso = "";
   http = null;

   // recibimos en el constructor el nombre de un recurso
   // representa un modelo en la api
   constructor(recurso = "") {
      this.nombreRecurso = recurso;

      this.http = axios.create();
      this.api = axios.create();
      this.http.defaults.baseURL = config.backendUrl + "/" + this.nombreRecurso;
   }

   async find(filter = {}) {
      return await this.http.get("", {
         params: {
            filter
         }
      });
   }

   async findById(id, filter) {
      return await this.http.get(`/${id}`, {
         params: {
            filter
         }
      })
   }

   async create(data) {
      return await this.http.post("", data);
   }

   async update(id, data) {
      return await this.http.put("/" + id, data);
   }

   async patch(id, data) {
      return await this.http.patch("/" + id, data);
   }

   async delete(id) {
      return await this.http.delete("/" + id);
   }

   async findLinked(modelId, targetName, filter) {
      return await this.http.get("/" + modelId + "/" + targetName, {
         params: {
            filter
         }
      });
   }

   async link(modelId, targetName, targetId) {
      return await this.http.patch("/" + modelId + "/" + targetName + "/link/" + targetId);
   }

   async unlink(modelId, targetName, targetId) {
      return await this.http.delete("/" + modelId + "/" + targetName + "/unlink/" + targetId);
   }

   async fetchBetweenDates(finalDay, classeId) {
      return await this.find({
         include: ["users"],
         order: ["date ASC"],
         where: {
            classeId,
            dayString: finalDay
         }
      });
   }
};

export default CRUDService;