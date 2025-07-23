import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MultiSelect } from '@/components/ui/multi-select';
import { CampaignFormData, AUDIENCE_AGE_OPTIONS, INFLUENCER_TYPES, LANGUAGES } from '@/types/campaign';
import { Target, Users, MapPin, DollarSign, TrendingUp, Globe } from 'lucide-react';

interface CampaignBasicsStepProps {
  formData: CampaignFormData;
  updateFormData: (updates: Partial<CampaignFormData>) => void;
}

export function CampaignBasicsStep({ formData, updateFormData }: CampaignBasicsStepProps) {
  const handleAudienceAgeChange = (age: string, checked: boolean) => {
    const currentAges = formData.audienceAge;
    if (checked) {
      updateFormData({ audienceAge: [...currentAges, age] });
    } else {
      updateFormData({ audienceAge: currentAges.filter(a => a !== age) });
    }
  };

  return (
    <div className="space-y-6">
      {/* Campaign Objective */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="w-5 h-5 text-campaign-primary" />
            Campaign Objective
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="objective" className="text-sm font-medium">
            What is your main campaign goal?
          </Label>
          <Textarea
            id="objective"
            placeholder="e.g., Increase brand awareness for our new skincare line targeting young adults..."
            value={formData.objective}
            onChange={(e) => updateFormData({ objective: e.target.value })}
            className="mt-2 min-h-[100px]"
          />
        </CardContent>
      </Card>

      {/* Audience Configuration */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="w-5 h-5 text-campaign-secondary" />
            Target Audience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Audience Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Cities (Multi-select)</Label>
              <MultiSelect
                values={formData.audienceLocation.cities}
                onValuesChange={(cities) => updateFormData({
                  audienceLocation: { ...formData.audienceLocation, cities }
                })}
                placeholder="Add cities (e.g., Mumbai, Delhi)"
              />
            </div>
            <div>
              <Label>States (Multi-select)</Label>
              <MultiSelect
                values={formData.audienceLocation.states}
                onValuesChange={(states) => updateFormData({
                  audienceLocation: { ...formData.audienceLocation, states }
                })}
                placeholder="Add states (e.g., Maharashtra, Delhi)"
              />
            </div>
            <div>
              <Label htmlFor="audience-country">Country</Label>
              <Input
                id="audience-country"
                placeholder="India"
                value={formData.audienceLocation.country}
                onChange={(e) => updateFormData({
                  audienceLocation: { ...formData.audienceLocation, country: e.target.value }
                })}
              />
            </div>
          </div>

          {/* Audience Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Audience Gender</Label>
              <Select
                value={formData.audienceGender}
                onValueChange={(value: 'Male' | 'Female' | 'All') => 
                  updateFormData({ audienceGender: value })
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Genders</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="audience-gender-percentage">Gender Percentage (%)</Label>
              <Input
                id="audience-gender-percentage"
                type="number"
                min="0"
                max="100"
                placeholder="60"
                value={formData.audienceGenderPercentage || ''}
                onChange={(e) => updateFormData({ 
                  audienceGenderPercentage: Number(e.target.value) 
                })}
              />
            </div>
          </div>

          {/* Audience Age */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Audience Age Groups (Select multiple)
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AUDIENCE_AGE_OPTIONS.map((age) => (
                <div key={age} className="flex items-center space-x-2">
                  <Checkbox
                    id={`age-${age}`}
                    checked={formData.audienceAge.includes(age)}
                    onCheckedChange={(checked) => 
                      handleAudienceAgeChange(age, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`age-${age}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {age}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget and Engagement Configuration */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="w-5 h-5 text-campaign-accent" />
            Campaign Budget & Engagement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget-amount">Budget Amount (USD)</Label>
              <Input
                id="budget-amount"
                type="number"
                placeholder="50000"
                value={formData.campaignBudget.amount || ''}
                onChange={(e) => updateFormData({
                  campaignBudget: { 
                    ...formData.campaignBudget, 
                    amount: Number(e.target.value) 
                  }
                })}
              />
            </div>
            <div>
              <Label htmlFor="engagement-rate">Minimum Engagement Rate (%)</Label>
              <Input
                id="engagement-rate"
                type="number"
                min="0"
                step="0.1"
                placeholder="2.5"
                value={formData.engagementRate || ''}
                onChange={(e) => updateFormData({ 
                  engagementRate: Number(e.target.value) 
                })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Influencer Configuration */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="w-5 h-5 text-campaign-neutral" />
            Influencer Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Influencer Gender */}
          <div>
            <Label className="text-sm font-medium">Influencer Gender</Label>
            <Select
              value={formData.influencerGender}
              onValueChange={(value: 'Male' | 'Female' | 'All') => 
                updateFormData({ influencerGender: value })
              }
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Genders</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Influencer Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Cities (Multi-select)</Label>
              <MultiSelect
                values={formData.influencerLocation.cities}
                onValuesChange={(cities) => updateFormData({
                  influencerLocation: { ...formData.influencerLocation, cities }
                })}
                placeholder="Add cities (e.g., Delhi, Mumbai)"
              />
            </div>
            <div>
              <Label>States (Multi-select)</Label>
              <MultiSelect
                values={formData.influencerLocation.states}
                onValuesChange={(states) => updateFormData({
                  influencerLocation: { ...formData.influencerLocation, states }
                })}
                placeholder="Add states (e.g., Delhi, Maharashtra)"
              />
            </div>
            <div>
              <Label htmlFor="influencer-country">Country</Label>
              <Input
                id="influencer-country"
                placeholder="India"
                value={formData.influencerLocation.country}
                onChange={(e) => updateFormData({
                  influencerLocation: { ...formData.influencerLocation, country: e.target.value }
                })}
              />
            </div>
          </div>

          {/* Influencer Type */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Influencer Type (Select multiple)
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {INFLUENCER_TYPES.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={formData.influencerType?.includes(type) || false}
                    onCheckedChange={(checked) => {
                      const currentTypes = formData.influencerType || [];
                      if (checked) {
                        updateFormData({ influencerType: [...currentTypes, type] });
                      } else {
                        updateFormData({ influencerType: currentTypes.filter(t => t !== type) });
                      }
                    }}
                  />
                  <Label
                    htmlFor={`type-${type}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Configuration */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Globe className="w-5 h-5 text-campaign-primary" />
            Language Preference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label className="text-sm font-medium">Language</Label>
            <Select
              value={formData.language}
              onValueChange={(language) => updateFormData({ language })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}