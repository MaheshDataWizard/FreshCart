import jwt from "jsonwebtoken";

// Middleware to authenticate user
export const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "User not Authorized" }); // ❌ You had: `return res, json(...)`
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (tokenDecode?.id) {
      req.userId = tokenDecode.id; // ✅ Attach userId to req (not req.body)
      next(); // ✅ Move to the next middleware/route handler
    } else {
      return res.json({ success: false, message: "Not Authorized" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
