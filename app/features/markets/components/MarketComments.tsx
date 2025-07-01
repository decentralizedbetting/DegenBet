"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/_shared/components/ui/Button';
import Image from 'next/image';
import { 
  HandThumbUpIcon, 
  HandThumbDownIcon, 
  ChatBubbleLeftRightIcon,
  EllipsisVerticalIcon,
  FlagIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

// Types
interface User {
  id: string;
  username: string;
  avatar?: string;
  verified: boolean;
  traderLevel: 'NEWBIE' | 'TRADER' | 'PRO' | 'WHALE' | 'LEGEND';
  winRate: number;
  position?: {
    outcome: string;
    size: number;
    avgPrice: number;
  };
}

interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  isLiked?: boolean;
  isDisliked?: boolean;
  replies: Comment[];
  prediction?: {
    outcome: string;
    confidence: number;
    reasoning: string;
  };
  attachments?: {
    type: 'image' | 'link' | 'chart';
    url: string;
    title?: string;
  }[];
}

interface MarketCommentsProps {
  marketId: string;
}

// Helper functions
const getTraderLevelColor = (level: string) => {
  const colors = {
    'NEWBIE': 'text-gray-400 bg-gray-500/20',
    'TRADER': 'text-blue-400 bg-blue-500/20',
    'PRO': 'text-purple-400 bg-purple-500/20',
    'WHALE': 'text-yellow-400 bg-yellow-500/20',
    'LEGEND': 'text-red-400 bg-red-500/20'
  };
  return colors[level as keyof typeof colors] || 'text-gray-400 bg-gray-500/20';
};

const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
};

// Mock data
const generateMockComments = (): Comment[] => [
  {
    id: '1',
    user: {
      id: 'user1',
      username: 'DiamondHands💎',
      verified: true,
      traderLevel: 'WHALE',
      winRate: 87,
      position: { outcome: 'YES', size: 15000, avgPrice: 0.68 }
    },
    content: 'Been tracking NBA draft patterns for 5 years. This pick order feels WAY too predictable. Smart money is on some surprises in top 5. Cooper Flagg going #1 is overpriced at these odds.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 23,
    dislikes: 3,
    isLiked: true,
    replies: [
      {
        id: '1-1',
        user: {
          id: 'user2',
          username: 'HoopsAnalyst',
          verified: false,
          traderLevel: 'PRO',
          winRate: 72
        },
        content: 'Disagree. Flagg has been consensus #1 all season. What surprises you seeing?',
        timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
        likes: 8,
        dislikes: 1,
        replies: []
      }
    ],
    prediction: {
      outcome: 'YES',
      confidence: 75,
      reasoning: 'Historical data shows top picks rarely go as expected'
    }
  },
  {
    id: '2',
    user: {
      id: 'user3',
      username: 'CryptoDegenBBall',
      verified: false,
      traderLevel: 'TRADER',
      winRate: 54,
      position: { outcome: 'NO', size: 2500, avgPrice: 0.32 }
    },
    content: 'Just saw the latest mock drafts. 4 out of 5 major analysts have same top 5. This feels like easy money on NO.',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    likes: 12,
    dislikes: 8,
    replies: [],
    attachments: [
      {
        type: 'link',
        url: 'https://espn.com/mock-draft-2025',
        title: 'ESPN Mock Draft Update'
      }
    ]
  },
  {
    id: '3',
    user: {
      id: 'user4',
      username: 'rookie_trader',
      verified: false,
      traderLevel: 'NEWBIE',
      winRate: 41
    },
    content: 'New to prediction markets. Can someone explain why this market is so active? Is there some news I missed?',
    timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    likes: 5,
    dislikes: 0,
    replies: [
      {
        id: '3-1',
        user: {
          id: 'user5',
          username: 'WelcomingWhale',
          verified: true,
          traderLevel: 'LEGEND',
          winRate: 91
        },
        content: 'Draft is in 3 weeks. Volume always spikes as we get closer. Welcome to degen betting! 🎰',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        likes: 15,
        dislikes: 0,
        replies: []
      }
    ]
  }
];

// Comment Component
const CommentComponent: React.FC<{ 
  comment: Comment; 
  depth?: number; 
  onReply?: (commentId: string) => void;
}> = ({ comment, depth = 0, onReply }) => {
  const [showActions, setShowActions] = useState(false);
  
  const handleLike = () => console.log('Like comment:', comment.id);
  const handleDislike = () => console.log('Dislike comment:', comment.id);
  const handleReply = () => onReply?.(comment.id);
  
  return (
    <div className={`${depth > 0 ? 'ml-6 mt-3 border-l border-green-500/20 pl-4' : 'mb-6'}`}>
      <div className="terminal-card border border-green-500/30 hover:border-green-500/50 transition-all duration-200">
        <div className="p-4">
          {/* User Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center">
                {comment.user.avatar ? (
                  <Image src={comment.user.avatar} alt={comment.user.username} width={32} height={32} className="rounded-full" />
                ) : (
                  <span className="text-black font-bold text-sm font-mono">
                    {comment.user.username.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 font-mono font-bold">{comment.user.username}</span>
                  {comment.user.verified && (
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  <span className={`px-2 py-0.5 text-xs font-mono font-bold rounded border ${getTraderLevelColor(comment.user.traderLevel)}`}>
                    {comment.user.traderLevel}
                  </span>
                  <span className="text-gray-500 text-xs font-mono">
                    {comment.user.winRate}% WIN
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500 font-mono mt-1">
                  <span>{formatTimeAgo(comment.timestamp)}</span>
                  {comment.user.position && (
                    <span className={`${comment.user.position.outcome === 'YES' ? 'text-green-400' : 'text-red-400'}`}>
                      {comment.user.position.outcome} ${comment.user.position.size.toLocaleString()} @ {comment.user.position.avgPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowActions(!showActions)}
              className="text-gray-500 hover:text-green-400 transition-colors"
            >
              <EllipsisVerticalIcon className="w-4 h-4" />
            </button>
          </div>
          
          {/* Prediction Badge */}
          {comment.prediction && (
            <div className="mb-3 p-3 bg-green-500/10 border border-green-500/30 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-400 font-mono font-bold text-sm">PREDICTION:</span>
                <span className={`px-2 py-1 text-xs font-mono font-bold rounded ${
                  comment.prediction.outcome === 'YES' ? 'text-green-400 bg-green-500/20' : 'text-red-400 bg-red-500/20'
                }`}>
                  {comment.prediction.outcome} - {comment.prediction.confidence}% CONFIDENCE
                </span>
              </div>
              <p className="text-gray-300 text-sm font-mono">{comment.prediction.reasoning}</p>
            </div>
          )}
          
          {/* Content */}
          <div className="mb-3">
            <p className="text-gray-200 leading-relaxed font-mono text-sm">{comment.content}</p>
            
            {/* Attachments */}
            {comment.attachments?.map((attachment, index) => (
              <div key={index} className="mt-3 border border-green-500/30 rounded p-2 bg-green-500/5">
                <a 
                  href={attachment.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 text-sm font-mono underline"
                >
                  {attachment.title || attachment.url}
                </a>
              </div>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 transition-colors ${
                  comment.isLiked ? 'text-green-400' : 'text-gray-500 hover:text-green-400'
                }`}
              >
                <HandThumbUpIcon className="w-4 h-4" />
                <span className="text-sm font-mono">{comment.likes}</span>
              </button>
              <button
                onClick={handleDislike}
                className={`flex items-center space-x-1 transition-colors ${
                  comment.isDisliked ? 'text-red-400' : 'text-gray-500 hover:text-red-400'
                }`}
              >
                <HandThumbDownIcon className="w-4 h-4" />
                <span className="text-sm font-mono">{comment.dislikes}</span>
              </button>
              <button
                onClick={handleReply}
                className="flex items-center space-x-1 text-gray-500 hover:text-purple-400 transition-colors"
              >
                <ChatBubbleLeftRightIcon className="w-4 h-4" />
                <span className="text-sm font-mono">Reply</span>
              </button>
            </div>
            
            {showActions && (
              <div className="flex items-center space-x-2">
                <button className="text-gray-500 hover:text-blue-400 transition-colors">
                  <ShareIcon className="w-4 h-4" />
                </button>
                <button className="text-gray-500 hover:text-red-400 transition-colors">
                  <FlagIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Replies */}
      {comment.replies.map((reply) => (
        <CommentComponent 
          key={reply.id} 
          comment={reply} 
          depth={depth + 1} 
          onReply={onReply}
        />
      ))}
    </div>
  );
};

// Main Component
export function MarketComments({ marketId }: MarketCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'predictions'>('recent');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    setComments(generateMockComments());
  }, [marketId]);
  
  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    
    setIsPosting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        id: 'current-user',
        username: 'YourUsername',
        verified: false,
        traderLevel: 'TRADER',
        winRate: 68
      },
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      replies: []
    };
    
    setComments(prev => [comment, ...prev]);
    setNewComment('');
    setIsPosting(false);
  };
  
  const handleReply = (commentId: string) => {
    setReplyingTo(commentId);
    textareaRef.current?.focus();
  };
  
  const sortedComments = comments.sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.likes - b.dislikes) - (a.likes - a.dislikes);
      case 'predictions':
        return (b.prediction ? 1 : 0) - (a.prediction ? 1 : 0);
      default:
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
  });
  
  return (
    <div className="terminal-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-green-500/20">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="terminal-text text-sm">discussion_board.exe</div>
      </div>
      
      <div className="p-6">
        {/* Title and Sort */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-mono font-bold text-lg text-green-400">DISCUSSION_BOARD.SH</h3>
          <div className="flex space-x-2">
            {(['recent', 'popular', 'predictions'] as const).map((sort) => (
              <button
                key={sort}
                onClick={() => setSortBy(sort)}
                className={`px-3 py-1 text-sm rounded-md font-mono transition-all duration-200 ${
                  sortBy === sort 
                    ? 'btn-degen text-black' 
                    : 'btn-degen-secondary text-green-400'
                }`}
              >
                --{sort}
              </button>
            ))}
          </div>
        </div>
        
        {/* Comment Composer */}
        <div className="mb-8 terminal-card border border-green-500/30 p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center">
              <span className="text-black font-bold text-sm font-mono">YOU</span>
            </div>
            <span className="text-green-400 font-mono font-bold">Share your prediction...</span>
          </div>
          
          <textarea
            ref={textareaRef}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your analysis, prediction, or thoughts about this market..."
            className="w-full bg-black/50 border border-green-500/30 rounded-md p-3 text-gray-200 font-mono text-sm resize-none focus:outline-none focus:border-green-500/50"
            rows={3}
          />
          
          <div className="flex items-center justify-between mt-3">
            <div className="text-xs text-gray-500 font-mono">
              {replyingTo ? `Replying to comment ${replyingTo}` : 'New comment'}
            </div>
            <div className="flex space-x-2">
              {replyingTo && (
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => setReplyingTo(null)}
                  className="font-mono"
                >
                  Cancel
                </Button>
              )}
              <Button 
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || isPosting}
                size="sm"
                className="font-mono btn-degen text-black"
              >
                {isPosting ? 'POSTING...' : 'POST.EXE'}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Comments List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-green-400 font-mono text-sm">
              {comments.length} COMMENTS_LOADED
            </span>
          </div>
          
          {sortedComments.length > 0 ? (
            sortedComments.map((comment) => (
              <CommentComponent 
                key={comment.id} 
                comment={comment} 
                onReply={handleReply}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 font-mono">No comments yet. Be the first to share your prediction!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 