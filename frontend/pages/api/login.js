import { serialize } from 'cookie';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username,
        password,
      });

      if (response.data.exists) {
        const token = 'JGH65455158AHRH';

        res.setHeader('Set-Cookie', serialize('authToken', token, { path: '/', httpOnly: true, maxAge: 3600 }));
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
