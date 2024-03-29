import rateLimit from 'express-rate-limit';
import type { RateLimitRequestHandler } from 'express-rate-limit';

// timeToReEntry is in minutes, it would be converted to seconds
const limiter = (maxNumOfRequests = 100, timeToReEntry = 2): RateLimitRequestHandler =>
  rateLimit({
    max: maxNumOfRequests,
    windowMs: timeToReEntry * 60 * 1000,
    message: `Too many request from this IP, please try again in ${(timeToReEntry * 60 * 1000) / 1000} minutes`,
    handler: (req, res) => {
      res.status(500).json({
        status: 'fail',
        message: 'Too many requests from this IP address',
      });
    },
  });

export default limiter;
