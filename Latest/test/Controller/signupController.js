const SignupModel = require("../Model/signupModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "rohitsisodiyachann";
const sendEmail = require("../Utility/helper");
const googleTTS = require("google-tts-api");
const { uploadImage } = require("../Utility/cloudinary");

// create user
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check existing user
    const existingUser = await SignupModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Check image
    if (!req.files || !req.files.student) {
      return res.status(400).json({
        message: "Please upload an image",
      });
    }

    // Hash Password
    const hash = bcrypt.hashSync(password, 10);

    // Upload Image to Cloudinary
    const uploadData = await uploadImage(req.files);

    if (!uploadData.length) {
      return res.status(400).json({
        message: "Image upload failed",
      });
    }

    const image = uploadData[0].secure_url;

    // Create User
    const result = await SignupModel.create({
      name,
      email,
      password: hash,
      role: role || "user",
      image,
    });

    res.status(201).json({
      message: "Signup Successfully",
      result,
    });

    sendEmail(
      email,
      "🎉 Welcome to React S",
      `
  <div style="max-width:600px;margin:auto;background:#f9fafb;padding:20px;font-family:Arial,sans-serif;">
    
    <div style="background:#2563eb;padding:30px;text-align:center;border-radius:12px 12px 0 0;">
      <h1 style="color:white;margin:0;">Welcome to React S 🚀</h1>
    </div>

    <div style="background:white;padding:30px;border:1px solid #e5e7eb;">
      <h2 style="color:#111827;">Hello ${name} 👋</h2>

      <p style="color:#4b5563;font-size:16px;">
        Congratulations! Your account has been created successfully.
      </p>

      <p style="color:#4b5563;">
        Thank you for registering with us. We are excited to have you on our platform.
      </p>

      <div style="text-align:center;margin-top:30px;">
        <a
          href="royalmart-store.netlify.app"
          style="
            background:#2563eb;
            color:white;
            text-decoration:none;
            padding:12px 24px;
            border-radius:8px;
            display:inline-block;
          "
        >
          Login Now
        </a>
      </div>

      <p style="margin-top:40px;color:#6b7280;">
        Best Regards,<br>
        <strong>Team React S</strong>
      </p>
    </div>

    <div style="text-align:center;padding:20px;color:#9ca3af;font-size:14px;">
      © 2026 React S. All Rights Reserved.
    </div>
  </div>
  `,
    ).catch((err) => console.log("Email Error:", err));
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// loginuser
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await SignupModel.findOne({ email });

    if (!result) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    const match = await bcrypt.compare(password, result.password);

    if (!match) {
      return res.status(400).json({
        message: "Wrong Password",
      });
    }

    const token = jwt.sign(
      {
        id: result._id,
        email: result.email,
        role: result.role,
      },
      secretKey,
      {
        expiresIn: "1d",
      },
    );

    return res.status(200).json({
      message: "Login Successfully",
      token,
      user: {
        id: result._id,
        name: result.name,
        email: result.email,
        role: result.role,
        image: result.image, // Cloudinary Image URL
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//forget password
const forgetPassword = async (req, res) => {
  console.log(">>>>>>>>body", req.body);

  try {
    const { email, password, confirmPassword } = req.body;

    const result = await SignupModel.findOne({ email });

    if (!result) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    console.log(">>>>>>>salt", salt);

    const hash = bcrypt.hashSync(password, salt);
    console.log(">>>>>>>hash", hash);

    await SignupModel.findOneAndUpdate({ email }, { password: hash });

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//reset password
const resetPassword = async (req, res) => {
  console.log(">>>>>>req", req.body);

  try {
    const { email, previousPassword, password, confirmPassword } = req.body;

    const result = await SignupModel.findOne({ email });

    if (!result) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    const isMatch = await bcrypt.compare(previousPassword, result.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Previous password is incorrect",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    if (previousPassword === password) {
      return res.status(400).json({
        message: "New password cannot be same as previous password",
      });
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(">>>>>>>>hash", hash);

    await SignupModel.findOneAndUpdate({ email }, { password: hash });

    return res.status(200).json({
      message: "Password Reset Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAllData = async (req, res) => {
  const users = await SignupModel.find();
  return res.status(200).json(users);
};

const url = googleTTS.getAudioUrl("Aagle do din Coaching ka Off hain", {
  lang: "en",
  slow: false,
  host: "https://translate.google.com",
});
console.log(url);

module.exports = {
  signup,

  login,

  forgetPassword,

  resetPassword,

  getAllData,
};
