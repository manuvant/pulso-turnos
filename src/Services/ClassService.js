import CRUDService from "./CRUDService";

class ClassService extends CRUDService {
   constructor() {
      super("classes");
   }
}

export default new ClassService();