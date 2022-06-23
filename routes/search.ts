import express from 'express';
import * as searchCtrl from '$controllers/search';
const routerSearch = express.Router();

routerSearch.get('/student/:param?', searchCtrl.searchStudent);
routerSearch.get('/teacher/:param?', searchCtrl.searchTeacher);
routerSearch.get('/admin/:param?', searchCtrl.searchAdmin);

export default routerSearch;
