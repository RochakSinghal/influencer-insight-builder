import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { CampaignFormData, INFLUENCER_CATEGORIES, InfluencerData } from '@/types/campaign';
import { Target, Users, Hash, Tag, MapPin, DollarSign, Star, TrendingUp, Eye, Heart, MessageCircle, Share2, Lightbulb } from 'lucide-react';

interface CampaignResultsStepProps {
  formData: CampaignFormData;
}

// Mock influencer data for demonstration
const mockInfluencers: InfluencerData[] = [
  {
    rank: 1,
    name: "Sarah Beauty",
    id: "sarah_beauty_official",
    followers: 125000,
    engagementRate: 4.8,
    category: "Beauty",
    location: "Mumbai, India",
    photoUrl: "https://images.unsplash.com/photo-1494790108755-2616b636b263?w=150&h=150&fit=crop&crop=face",
    postCount: 342,
    avgLikes: 6500,
    avgComments: 125,
    prices: { post: 25000, stories: 8000, video: 45000, cpm: 15, cpe: 5.2 },
    audienceAuthenticity: 92,
    audienceGeo: "India 75%, US 15%, Others 10%",
    finalScore: 8.7,
    contentAffinity: 9.2,
    audienceMatch: 8.5,
    pastPerformance: 8.9,
    engagementScore: 9.1,
    instagramReels: { count: 45, avgViews: 15000 },
    contentIdeas: [
      {
        title: "Morning Skincare Routine",
        description: "A step-by-step morning skincare routine featuring your products",
        hashtags: ["#morningroutine", "#skincare", "#beauty", "#glowup", "#selfcare"],
        cta: ["Shop now", "Link in bio", "Save for later"]
      }
    ]
  },
  {
    rank: 2,
    name: "Alex Fitness",
    id: "alexfitness_pro",
    followers: 98000,
    engagementRate: 5.2,
    category: "Fitness & Bodybuilding",
    location: "Delhi, India",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    postCount: 289,
    avgLikes: 5200,
    avgComments: 98,
    prices: { post: 20000, stories: 6000, video: 35000, cpm: 12, cpe: 4.8 },
    audienceAuthenticity: 88,
    audienceGeo: "India 80%, US 12%, Others 8%",
    finalScore: 8.4,
    contentAffinity: 8.8,
    audienceMatch: 8.2,
    pastPerformance: 8.6,
    engagementScore: 8.9,
    instagramReels: { count: 38, avgViews: 12500 },
    contentIdeas: [
      {
        title: "30-Day Fitness Challenge",
        description: "Create a fitness challenge using your products/services",
        hashtags: ["#fitness", "#challenge", "#workout", "#health", "#motivation"],
        cta: ["Join now", "Get started", "Transform today"]
      }
    ]
  }
];

export function CampaignResultsStep({ formData }: CampaignResultsStepProps) {
  const [selectedInfluencer, setSelectedInfluencer] = useState<InfluencerData | null>(null);

  const getCurrencySymbol = (code: string) => {
    return '$'; // USD default
  };

  const getSelectedCategories = () => {
    return formData.categories.map(id => 
      INFLUENCER_CATEGORIES.find(cat => cat.id === id)?.title
    ).filter(Boolean);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Campaign Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campaign Details */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-campaign-primary" />
              Campaign Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Objective</h4>
              <p className="text-sm mt-1">{formData.objective}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Budget</h4>
                <p className="text-lg font-semibold">
                  {getCurrencySymbol(formData.campaignBudget.currency)} {formData.campaignBudget.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Audience Gender</h4>
                <p className="text-sm">{formData.audienceGender}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Age Groups</h4>
              <div className="flex flex-wrap gap-1">
                {formData.audienceAge.map(age => (
                  <Badge key={age} variant="outline" className="text-xs">
                    {age}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Keywords</h4>
              <div className="flex flex-wrap gap-1">
                {formData.keywords.map(keyword => (
                  <Badge key={keyword} variant="secondary" className="text-xs">
                    #{keyword}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Categories</h4>
              <div className="flex flex-wrap gap-1">
                {getSelectedCategories().map(category => (
                  <Badge key={category} className="text-xs bg-gradient-primary">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Stats */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-campaign-secondary" />
              Projected Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <p className="text-2xl font-bold text-campaign-primary">2.5M</p>
                <p className="text-xs text-muted-foreground">Est. Reach</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <p className="text-2xl font-bold text-campaign-secondary">125K</p>
                <p className="text-xs text-muted-foreground">Est. Engagement</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Audience Match</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Content Relevance</span>
                  <span>88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Campaign Success Score</span>
                  <span>8.6/10</span>
                </div>
                <Progress value={86} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Influencers List */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-campaign-accent" />
            Recommended Influencers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockInfluencers.map((influencer) => (
              <Card key={influencer.id} className="border-border/30 hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Avatar and Basic Info */}
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={influencer.photoUrl} alt={influencer.name} />
                      <AvatarFallback>{influencer.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{influencer.name}</h3>
                            <Badge variant="outline">#{influencer.rank}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">@{influencer.id}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {influencer.location}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-semibold">{influencer.finalScore}</span>
                          </div>
                          <Badge className="bg-gradient-accent">
                            {influencer.category}
                          </Badge>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-2 bg-muted/30 rounded">
                          <p className="text-lg font-bold">{formatNumber(influencer.followers)}</p>
                          <p className="text-xs text-muted-foreground">Followers</p>
                        </div>
                        <div className="text-center p-2 bg-muted/30 rounded">
                          <p className="text-lg font-bold">{influencer.engagementRate}%</p>
                          <p className="text-xs text-muted-foreground">Engagement</p>
                        </div>
                        <div className="text-center p-2 bg-muted/30 rounded">
                          <p className="text-lg font-bold">{formatNumber(influencer.avgLikes)}</p>
                          <p className="text-xs text-muted-foreground">Avg Likes</p>
                        </div>
                        <div className="text-center p-2 bg-muted/30 rounded">
                          <p className="text-lg font-bold">{influencer.postCount}</p>
                          <p className="text-xs text-muted-foreground">Posts</p>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="bg-muted/20 p-3 rounded-lg">
                        <h4 className="font-medium text-sm mb-2">Pricing</h4>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Post:</span>
                            <span className="font-medium ml-1">₹{influencer.prices.post.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Story:</span>
                            <span className="font-medium ml-1">₹{influencer.prices.stories.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Video:</span>
                            <span className="font-medium ml-1">₹{influencer.prices.video.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">CPM:</span>
                            <span className="font-medium ml-1">₹{influencer.prices.cpm}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">CPE:</span>
                            <span className="font-medium ml-1">₹{influencer.prices.cpe}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button
                        variant="outline"
                        onClick={() => setSelectedInfluencer(influencer)}
                        className="w-full"
                      >
                        View Detailed Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Influencer Modal/Panel would go here */}
      {selectedInfluencer && (
        <Card className="border-border/50 bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Detailed Analysis - {selectedInfluencer.name}</span>
              <Button variant="ghost" onClick={() => setSelectedInfluencer(null)}>×</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="analytics" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reels">Instagram Reels</TabsTrigger>
                <TabsTrigger value="content">Content Ideas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="analytics" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-lg font-bold">{selectedInfluencer.audienceAuthenticity}%</p>
                    <p className="text-xs text-muted-foreground">Audience Authenticity</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-lg font-bold">{selectedInfluencer.contentAffinity}</p>
                    <p className="text-xs text-muted-foreground">Content Affinity</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-lg font-bold">{selectedInfluencer.audienceMatch}</p>
                    <p className="text-xs text-muted-foreground">Audience Match</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-lg font-bold">{selectedInfluencer.pastPerformance}</p>
                    <p className="text-xs text-muted-foreground">Past Performance</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Audience Geography</h4>
                  <p className="text-sm text-muted-foreground">{selectedInfluencer.audienceGeo}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="reels" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-2xl font-bold text-campaign-primary">{selectedInfluencer.instagramReels.count}</p>
                    <p className="text-sm text-muted-foreground">Total Reels</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-2xl font-bold text-campaign-secondary">{formatNumber(selectedInfluencer.instagramReels.avgViews)}</p>
                    <p className="text-sm text-muted-foreground">Avg Views per Reel</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="content" className="space-y-4">
                {selectedInfluencer.contentIdeas.map((idea, index) => (
                  <Card key={index} className="border-border/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-campaign-accent" />
                        {idea.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{idea.description}</p>
                      
                      <div>
                        <h5 className="font-medium text-sm mb-2">Suggested Hashtags</h5>
                        <div className="flex flex-wrap gap-1">
                          {idea.hashtags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-sm mb-2">Call-to-Action Options</h5>
                        <div className="flex flex-wrap gap-1">
                          {idea.cta.map(cta => (
                            <Badge key={cta} className="text-xs bg-gradient-accent">
                              {cta}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}