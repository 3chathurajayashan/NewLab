import express from 'express'
const router = express.Router();
 import sampleController from '../Controllers/SampleController.js'
 

// 🔹 Create Gate Pass
router.post(
  "/",
  
  sampleController.createGatePass
);

// 🔹 Get All Gate Passes
router.get(
  "/",
 
  sampleController.getAllGatePasses
);

// 🔹 Get Single Gate Pass
router.get(
  "/:id",
 
  sampleController.getSingleGatePass
);

// 🔹 Add Child Sample
router.post(
  "/:gatePassId/add-sample",
 
  sampleController.addSampleToGatePass
);

// 🔹 Update Child Sample
router.put(
  "/:gatePassId/sample/:sampleId",
  
  sampleController.updateChildSample
);

// 🔹 Delete Child Sample
router.delete(
  "/:gatePassId/sample/:sampleId",
  
  sampleController.deleteChildSample
);

export default router;