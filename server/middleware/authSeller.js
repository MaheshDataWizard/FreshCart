import jwt from "jsonwebtoken";

export const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;
  if (!sellerToken) {
    return res.json({ success: false, message: "Not Authorized" });
  }

  try {
    const tokenDecode = jwt.verify(
      sellerToken,
      process.env.JWT_SECRET_KEY || "SECRET#RAMbhau"
    );

    if (tokenDecode?.email === process.env.SELLER_EMAIL) {
      next(); // ✅ Move to the next middleware/route handler
    } else {
      return res.json({ success: false, message: "Not Authorized" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
