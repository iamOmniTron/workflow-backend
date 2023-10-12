const {Router} = require("express");
const { loginUser, loginDepartmentalCoordinator, loginPGAdmin, profile } = require("../controllers/auth");
const {auth} = require("../middlewares");
const { createFaculty, updateFaculty, getFaculties, deleteFaculties } = require("../controllers/faculties");
const { updateDepartment,createDepartment,getDepartments,deleteDepartments } = require("../controllers/department");
const { createStudent, updateUser,uploadStudentImage, getAllUser, deleteUser, searchByMatric, getDepartmentalUser} = require("../controllers/students");
const { createCoordinator, updateCoordinator, getCoordinators, uploadCoordinatorImage } = require("../controllers/coordinator");
const { createDocumentType, updateDocumentType, getDocumentTypes } = require("../controllers/docType");
const { createDocument, getDepartmentalDocuments, getAllDocument, deleteDocument } = require("../controllers/documents");
const { updateMemo, getAllMemo, getStudentMemos, getCoordinatorMemo, createMemo } = require("../controllers/memo");
const { createApplication, getAllApplications, getDepartmentApplications, getMyApplication, approveApplication, rejectApplication } = require("../controllers/application");
const {uploadDocument,uploadImage} = require("../utilities/helpers");
const { createComment, updateComment, getAllDocumentComments, getAllStudentComments, deleteComment } = require("../controllers/comment");


const router = Router();



// AUTHENTICATION
router.post("/auth/student/login",loginUser);
router.post("/auth/coordinator/login",loginDepartmentalCoordinator);
router.post("/auth/pg/login",loginPGAdmin);
router.get("/get-current-user",auth,profile)


// FACULTY
router.post("/faculty/create",auth,createFaculty);
router.put("faculty/update/:facultyId",auth,updateFaculty);
router.get("/faculty/get-all",auth,getFaculties);
router.delete("/faculty/delete/:facultyId",auth,deleteFaculties);



// DEPARTMENT

router.post("/department/create",auth,createDepartment);
router.put("/department/update/:departmentId",auth,updateDepartment);
router.get("/department/get-all",auth,getDepartments);
router.delete("/department/delete/:departmentId",auth,deleteDepartments);


// USER/STUDENT
router.post("/user/create",auth,createStudent)
router.put("/user/update/:userId",auth,updateUser);
router.get("/user/get-all",auth,getAllUser);
router.delete("/user/delete/:userId",auth,deleteUser);
router.get("/user/find/:matricNumber",searchByMatric);
router.get("/user/department",auth,getDepartmentalUser);
router.post("/user/image",auth,uploadImage.single("image"),uploadStudentImage)


// COORDINATOR
router.post("/coordinator/create",auth,createCoordinator);
router.put("/coordinator/update/:coordinatorId",auth,updateCoordinator);
router.get("/coordinator/get-all",auth,getCoordinators);
router.post("/coordinator/image",auth,uploadImage.single("image"),uploadCoordinatorImage);


// DOCUMENT TYPE
router.post("/doc-type/create",auth,createDocumentType);
router.put("/doc-type/update/:typeId",auth,updateDocumentType);
router.get("/doc-type/get-all",auth,getDocumentTypes);


// DOCUMENTS
router.post("/document/create",auth,uploadDocument.single("file"),createDocument);
router.get("/document/department",auth,getDepartmentalDocuments);
router.get("/document/get-all",auth,getAllDocument);
router.delete("/document/delete/:documentId",auth,deleteDocument);



// MEMO
router.post("/memo/create",auth,createMemo);
router.put("/memo/update/:memoId",auth,updateMemo);
router.get("/memo/get-all",auth,getAllMemo);
router.get("/memo/student",auth,getStudentMemos);
router.get("/memo/department",auth,getCoordinatorMemo);


// APPLICATION
router.post("/application/create",auth,createApplication);
router.get("/application/get-all",auth,getAllApplications);
router.get("/application/department",auth,getDepartmentApplications);
router.get("/application/me",auth,getMyApplication);
router.put("/application/approve/:applicationId",auth,approveApplication);
router.put("/application/reject/:applicationId",auth,rejectApplication);



// COMMENTS
router.post("/comment/create",auth,createComment);
router.put("/comment/update/:commentId",auth,updateComment);
router.get("/comment/document/:documentId",auth,getAllDocumentComments);
router.get("/comment/student/:studentId",auth,getAllStudentComments);
router.delete("/comment/delete/:commentId",auth,deleteComment);

module.exports = router;