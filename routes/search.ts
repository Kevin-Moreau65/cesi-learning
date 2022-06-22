import express from 'express';
import checkRole from '$utils/checkRole';
import * as searchCtrl from '$controllers/search';
const routerSearch = express.Router();

routerSearch.get('/student/:param?', checkRole.isTeacher, searchCtrl.getStudents);
routerSearch.get('/teacher/:param?', checkRole.isAdmin, searchCtrl.getTeachers);
routerSearch.get('/admin/:param?', checkRole.isAdmin, searchCtrl.getAdmins);

export default routerSearch;
