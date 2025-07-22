import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { CampaignFormData, AUDIENCE_AGE_OPTIONS, CURRENCY_OPTIONS } from '@/types/campaign';
import { Target, Users, MapPin, DollarSign } from 'lucide-react';

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
              <Label htmlFor="audience-city">City</Label>
              <Input
                id="audience-city"
                placeholder="Mumbai"
                value={formData.audienceLocation.city}
                onChange={(e) => updateFormData({
                  audienceLocation: { ...formData.audienceLocation, city: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="audience-state">State</Label>
              <Input
                id="audience-state"
                placeholder="Maharashtra"
                value={formData.audienceLocation.state}
                onChange={(e) => updateFormData({
                  audienceLocation: { ...formData.audienceLocation, state: e.target.value }
                })}
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

      {/* Budget Configuration */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="w-5 h-5 text-campaign-accent" />
            Campaign Budget
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget-amount">Budget Amount</Label>
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
              <Label htmlFor="budget-currency">Currency</Label>
              <Select
                value={formData.campaignBudget.currency}
                onValueChange={(currency) => updateFormData({
                  campaignBudget: { ...formData.campaignBudget, currency }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCY_OPTIONS.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <Label htmlFor="influencer-city">City</Label>
              <Input
                id="influencer-city"
                placeholder="Delhi"
                value={formData.influencerLocation.city}
                onChange={(e) => updateFormData({
                  influencerLocation: { ...formData.influencerLocation, city: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="influencer-state">State</Label>
              <Input
                id="influencer-state"
                placeholder="Delhi"
                value={formData.influencerLocation.state}
                onChange={(e) => updateFormData({
                  influencerLocation: { ...formData.influencerLocation, state: e.target.value }
                })}
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
        </CardContent>
      </Card>
    </div>
  );
}