import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
// Register User : /api/user/register

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password ) {
            return res.json({success: false, message: 'Missing Details'});
        }

        const existingUser = await User.findOne({email})

        if (existingUser) {
            return res.json({success: false, message: 'User already Exist'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({name, email, password: hashedPassword});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        // Debug logging
        console.log('Register - Setting cookie for user:', user.email);
        console.log('Register - Environment:', process.env.NODE_ENV);
        console.log('Register - Request origin:', req.get('origin'));

        // More flexible cookie configuration for production
        const cookieOptions = {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        };

        // Set secure and sameSite based on environment
        if (process.env.NODE_ENV === 'production') {
            cookieOptions.secure = true;
            cookieOptions.sameSite = 'none'; // Required for cross-origin in production
        } else {
            cookieOptions.sameSite = 'lax';
        }

        res.cookie('token', token, cookieOptions);

        console.log('Register - Cookie set successfully');

        return res.json({success: true, user: {email: user.email, name: user.name} });

    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: error.message});
    }
}

// Login User : /api/user/login

//  export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email ||!password) {
//             return res.json({success: false, message: 'Email & Passwrord are required'});
//         }
        
//         const user = await User.findOne({email});
//         if (!user) {
//             return res.json({success: false, message: 'Invalid Email & Password'});
//         }
        
//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.json({success: false, message: 'Invalid Email or Password'});
//         }

//         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

//         // Debug logging
//         console.log('Login - Setting cookie for user:', user.email);
//         console.log('Login - Environment:', process.env.NODE_ENV);
//         console.log('Login - Request origin:', req.get('origin'));

//         // More flexible cookie configuration for production
//         const cookieOptions = {
//             httpOnly: true,
//             maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//         };

//         // Set secure and sameSite based on environment
//         if (process.env.NODE_ENV === 'production') {
//             cookieOptions.secure = true;
//             cookieOptions.sameSite = 'none'; // Required for cross-origin in production
//         } else {
//             cookieOptions.sameSite = 'lax';
//         }

//         res.cookie('token', token, cookieOptions);

//         console.log('Login - Cookie set successfully');

//         return res.json({success: true, user: {email: user.email, name: user.name} });
//     } catch (error) {
//         console.log(error.message);
//         return res.json({success: false, message: error.message});
//     }
//  }

export const login = async (req, res) => {
    console.log('Check Login');
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email & Password are required' });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid Email or Password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid Email or Password' });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
  
      const cookieOptions = {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        secure: process.env.NODE_ENV === 'production', // secure only in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        // domain: process.env.NODE_ENV === 'production' ? '.yourdomain.com' : undefined, // optional
      };
  
      res.cookie('token', token, cookieOptions);
  
      return res.json({
        success: true,
        user: {
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      console.error('Login error:', error.message);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  };

//  check Auth : /api/user/is-auth

// export const isAuth = async (req, res) => {
//     try {
//         const { userId } = req.body;
//         const user = await User.findById(userId).select("-password");

//         return res.json({success: true, user});
        
//     } catch (error) {
//         console.log(error.message);
//         return res.json({success: false, message: error.message});
//     }
// }
export const isAuth = async (req, res) => {
    // console.log('is Auth');
    try {
      const token = req.cookies.token;
        // console.log('is Auth', token);

  
      if (!token) {
        return res.status(401).json({ success: false, message: 'No token found' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log('Check Decoded', decoded);
      const user = await User.findById(decoded.id).select('-password');
  
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
      }
  
      return res.json({ success: true, user });
    } catch (error) {
      console.error('Auth error:', error.message);
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  };



//  Logout User : /api/user/logout
export const logout = async (req, res) => {
    try {
        console.log('Logout - Clearing cookie');
        
        // More flexible cookie clearing configuration for production
        const cookieOptions = {
            httpOnly: true,
            maxAge: 0, // Expire immediately
        };

        // Set secure and sameSite based on environment
        if (process.env.NODE_ENV === 'production') {
            cookieOptions.secure = true;
            cookieOptions.sameSite = 'none';
        } else {
            cookieOptions.sameSite = 'lax';
        }

        res.clearCookie('token', cookieOptions);
        
        console.log('Logout - Cookie cleared successfully');
        return res.json({success: true, message: 'Logged Out'});
    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: error.message});
    }
}