const { validationResult } = require("express-validator");
const permission = require("../../modelsDb/PermissionModel");

const addPermission = async (req, res) => {
    try {
        // Validate request data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: "Validation errors",
                errors: errors.array(),
            });
        }

        // Extract permission data from request
        const { name } = req.body;
       
        console.log(req.body);

        // Check if permission already exists
        const existingPermission = await permission.findOne({ name });
        // console.log(existingPermission);

        if (existingPermission) {
            return res.status(400).json({
                success: false,
                msg: "Permission already exists",
            });
        }

        // Create permission object
        let objectPermission = { name };

        console.log(objectPermission);
        if (req.body.default) {
            objectPermission.is_default = parseInt(req.body.default);
        }

        const newPermission = new permission(objectPermission); // ✅ Fixed object creation
        await newPermission.save();

        return res.status(201).json({
            success: true,
            msg: "Permission added successfully",
            data: newPermission,
        });
    } catch (error) {
        console.error("Error in addPermission:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { addPermission };