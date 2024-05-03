// vendorController.js
const Vendor = require('../models/vendorModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, email, password,role } = req.body;
 const encryptedpassword = await bcrypt.hash(password, 10);
  // const password1 = await (password,10);

  try {
    const oldVendor = await Vendor.findOne({ email });
    if (oldVendor) {
      return res.send({ error: 'Vendor Exists' });
    }

    await Vendor.create({
      username,
      email,
      password: encryptedpassword,
      isApproved: false, // or status: 'pending'
    });

    res.send({ status: 'ok', message: 'Vendor Successfully Registered' });
  } catch (error) {
    res.send({ status: 'error', error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const vendor = await Vendor.findOne({ $or: [{ email: username }, { username, isApproved: true }] });
  if (!vendor) {
    return res.json({ error: 'Vendor Not found or Not yet approved' });
  }

  if (await bcrypt.compare(password, vendor.password)) {
    const tokenData = {
      email: vendor.email,
      username: vendor.username,
      
      // Add other vendor details as needed
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRETVALUE, {
      expiresIn: '1h', // Adjust the expiration time as needed
    });

    return res.json({ status: 'ok', data: token, role: 'vendor' });
  }

  return res.json({ status: 'error', error: 'Invalid Password' });
};
const getallvendors = async (req,res) =>{
  try {
    const vendors = await Vendor.find();
    res.json({ status: 'ok', data: vendors });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ status: 'error', error: 'Internal Server Error' });
  }
}
const manage = async (req, res) => {
  // Implement vendor management logic (approval, etc.)
};
const updateApproval = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { isApproved } = req.body;

    // Find the vendor by ID and update the approval status
    const updatedVendor = await Vendor.findByIdAndUpdate(
      vendorId,
      { isApproved },
      { new: true } // Return the updated document
    );

    if (!updatedVendor) {
      return res.status(404).json({ status: 'error', error: 'Vendor not found' });
    }

    res.json({ status: 'ok', data: updatedVendor });
  } catch (error) {
    console.error('Error updating approval status:', error);
    res.status(500).json({ status: 'error', error: 'Internal Server Error' });
  }
};
module.exports = {
  register,
  login,
  manage,
  getallvendors,
  updateApproval
};
