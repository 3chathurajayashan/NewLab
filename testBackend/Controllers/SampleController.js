
import Sample from '../Models/SampleModel.js'

/* =========================================
   🔹 Create Gate Pass with Multiple Samples
========================================= */
const createGatePass = async (req, res) => {
  try {
    const data = req.body;

    const newGatePass = new Sample({
      ...data,
      createdBy: "65f1c2abc123456789000000", // assuming auth middleware
    });

    await newGatePass.save();

    res.status(201).json({
      success: true,
      message: "Gate Pass created successfully",
      data: newGatePass,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================
   🔹 Add Child Sample to Existing Gate Pass
========================================= */
const addSampleToGatePass = async (req, res) => {
  try {
    const { gatePassId } = req.params;
    const newSample = req.body;

    const gatePass = await Sample.findById(gatePassId);

    if (!gatePass) {
      return res.status(404).json({
        success: false,
        message: "Gate Pass not found",
      });
    }

    gatePass.samples.push(newSample);
    await gatePass.save();

    res.status(200).json({
      success: true,
      message: "Sample added successfully",
      data: gatePass,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================
   🔹 Get All Gate Passes
========================================= */
const getAllGatePasses = async (req, res) => {
  try {
    const gatePasses = await Sample.find()
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: gatePasses.length,
      data: gatePasses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================
   🔹 Get Single Gate Pass
========================================= */
const getSingleGatePass = async (req, res) => {
  try {
    const gatePass = await Sample.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    if (!gatePass) {
      return res.status(404).json({
        success: false,
        message: "Gate Pass not found",
      });
    }

    res.status(200).json({
      success: true,
      data: gatePass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================
   🔹 Update Child Sample
========================================= */
const updateChildSample = async (req, res) => {
  try {
    const { gatePassId, sampleId } = req.params;

    const gatePass = await Sample.findById(gatePassId);

    if (!gatePass) {
      return res.status(404).json({
        success: false,
        message: "Gate Pass not found",
      });
    }

    const sample = gatePass.samples.find(
      (s) => s.sampleId === sampleId
    );

    if (!sample) {
      return res.status(404).json({
        success: false,
        message: "Sample not found",
      });
    }

    Object.assign(sample, req.body);

    await gatePass.save();

    res.status(200).json({
      success: true,
      message: "Sample updated successfully",
      data: gatePass,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================
   🔹 Delete Child Sample
========================================= */
const deleteChildSample = async (req, res) => {
  try {
    const { gatePassId, sampleId } = req.params;

    const gatePass = await Sample.findById(gatePassId);

    if (!gatePass) {
      return res.status(404).json({
        success: false,
        message: "Gate Pass not found",
      });
    }

    gatePass.samples = gatePass.samples.filter(
      (s) => s.sampleId !== sampleId
    );

    await gatePass.save();

    res.status(200).json({
      success: true,
      message: "Sample deleted successfully",
      data: gatePass,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  createGatePass,
  addSampleToGatePass,
  getAllGatePasses,
  getSingleGatePass,
  updateChildSample,
  deleteChildSample
};