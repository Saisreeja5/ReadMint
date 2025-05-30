import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuthController = async (req, res) => {
    try {
      const { token } = req.body;
      
      if (!token) return res.status(400).json({ message: "Token required" });
  
      // Verify token with Google
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
  
      const payload = ticket.getPayload();
      const { sub, name, email, picture } = payload;
  
      // Check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          name,
          email,
          googleId: sub,
          avatar: picture,
        });
      }
  
      // Generate JWT
      const appToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      console.log(appToken);
     
  
      res.status(200).json({ ttoken: appToken, user });
    } catch (err) {
      console.error("Google login error:", err);
      res.status(500).json({ message: "Authentication failed" });
    }
  };
  

export default googleAuthController;