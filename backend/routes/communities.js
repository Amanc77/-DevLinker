const express = require('express');
const { body, validationResult } = require('express-validator');
const Community = require('../models/Community');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/communities
// @desc    Get all communities with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      search,
      tech_stack,
      platform,
      location_mode,
      activity_level,
      page = 1,
      limit = 20
    } = req.query;

    // Build filter object
    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    if (tech_stack) {
      filter.tech_stack = { $regex: tech_stack, $options: 'i' };
    }

    if (platform) {
      filter.platform = platform;
    }

    if (location_mode) {
      filter.location_mode = location_mode;
    }

    if (activity_level) {
      filter.activity_level = activity_level;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const communities = await Community.find(filter)
      .sort({ member_count: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Community.countDocuments(filter);

    res.json({
      success: true,
      count: communities.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: communities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/communities/:id
// @desc    Get single community
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({
        success: false,
        message: 'Community not found'
      });
    }

    // Get related communities
    const related = await Community.find({
      _id: { $ne: community._id },
      $or: [
        { tech_stack: community.tech_stack },
        { tags: { $in: community.tags } }
      ]
    }).limit(3);

    res.json({
      success: true,
      data: community,
      related
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/communities
// @desc    Create a new community
// @access  Private
router.post('/', protect, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('tech_stack').trim().notEmpty().withMessage('Tech stack is required'),
  body('platform').trim().notEmpty().withMessage('Platform is required'),
  body('joining_link').trim().isURL().withMessage('Valid joining link is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const communityData = {
      ...req.body,
      createdBy: req.user.id
    };

    const community = await Community.create(communityData);

    res.status(201).json({
      success: true,
      data: community
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/communities/featured
// @desc    Get featured communities
// @access  Public
router.get('/featured/list', async (req, res) => {
  try {
    const communities = await Community.find()
      .sort({ member_count: -1, activity_level: -1 })
      .limit(6);

    res.json({
      success: true,
      data: communities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;

