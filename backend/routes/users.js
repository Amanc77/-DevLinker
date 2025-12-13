const express = require('express');
const User = require('../models/User');
const Community = require('../models/Community');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   POST /api/users/join-community/:id
// @desc    Join a community
// @access  Private
router.post('/join-community/:id', async (req, res) => {
  try {
    const communityId = req.params.id;
    const userId = req.user.id;

    // Check if community exists
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({
        success: false,
        message: 'Community not found'
      });
    }

    // Check if already joined
    const user = await User.findById(userId);
    const alreadyJoined = user.joinedCommunities.some(
      jc => jc.communityId.toString() === communityId
    );

    if (alreadyJoined) {
      return res.status(400).json({
        success: false,
        message: 'Already joined this community'
      });
    }

    // Add to joined communities
    user.joinedCommunities.push({
      communityId: communityId,
      joinedAt: new Date()
    });

    await user.save();

    res.json({
      success: true,
      message: 'Successfully joined community',
      data: user.joinedCommunities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   DELETE /api/users/leave-community/:id
// @desc    Leave a community
// @access  Private
router.delete('/leave-community/:id', async (req, res) => {
  try {
    const communityId = req.params.id;
    const userId = req.user.id;

    const user = await User.findById(userId);
    user.joinedCommunities = user.joinedCommunities.filter(
      jc => jc.communityId.toString() !== communityId
    );

    await user.save();

    res.json({
      success: true,
      message: 'Successfully left community'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/users/save-community/:id
// @desc    Save a community
// @access  Private
router.post('/save-community/:id', async (req, res) => {
  try {
    const communityId = req.params.id;
    const userId = req.user.id;

    const user = await User.findById(userId);
    
    if (user.savedCommunities.includes(communityId)) {
      return res.status(400).json({
        success: false,
        message: 'Community already saved'
      });
    }

    user.savedCommunities.push(communityId);
    await user.save();

    res.json({
      success: true,
      message: 'Community saved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   DELETE /api/users/unsave-community/:id
// @desc    Unsave a community
// @access  Private
router.delete('/unsave-community/:id', async (req, res) => {
  try {
    const communityId = req.params.id;
    const userId = req.user.id;

    const user = await User.findById(userId);
    user.savedCommunities = user.savedCommunities.filter(
      id => id.toString() !== communityId
    );

    await user.save();

    res.json({
      success: true,
      message: 'Community unsaved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/users/my-communities
// @desc    Get user's joined and saved communities
// @access  Private
router.get('/my-communities', async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('joinedCommunities.communityId')
      .populate('savedCommunities');

    res.json({
      success: true,
      data: {
        joined: user.joinedCommunities,
        saved: user.savedCommunities
      }
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

