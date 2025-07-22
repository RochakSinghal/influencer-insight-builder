import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CampaignFormData } from '@/types/campaign';
import { CampaignBasicsStep } from './steps/CampaignBasicsStep';
import { KeywordsAndCategoriesStep } from './steps/KeywordsAndCategoriesStep';
import { CampaignResultsStep } from './steps/CampaignResultsStep';

const STEPS = [
  { title: 'Campaign Basics', description: 'Define your campaign parameters' },
  { title: 'Keywords & Categories', description: 'Set keywords and influencer categories' },
  { title: 'Campaign Results', description: 'Review and analyze results' }
];

export function CampaignWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<CampaignFormData>({
    objective: '',
    audienceLocation: { city: '', state: '', country: '' },
    audienceGender: 'All',
    audienceAge: [],
    campaignBudget: { amount: 0, currency: 'INR' },
    influencerGender: 'All',
    influencerLocation: { city: '', state: '', country: '' },
    keywords: [],
    categories: []
  });

  const updateFormData = (updates: Partial<CampaignFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.objective && formData.campaignBudget.amount > 0;
      case 1:
        return formData.keywords.length > 0 && formData.categories.length > 0;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <CampaignBasicsStep formData={formData} updateFormData={updateFormData} />;
      case 1:
        return <KeywordsAndCategoriesStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <CampaignResultsStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Campaign Creator
          </h1>
          <p className="text-muted-foreground">
            Create and optimize your influencer marketing campaigns
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index < STEPS.length - 1 ? 'flex-1' : ''
                }`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      index <= currentStep
                        ? 'bg-primary text-primary-foreground shadow-glow'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {index < STEPS.length - 1 && (
                  <div className="flex-1 h-0.5 bg-muted mx-4 mt-5" />
                )}
              </div>
            ))}
          </div>
          <Progress value={(currentStep + 1) * (100 / STEPS.length)} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="bg-gradient-card border-border/50 shadow-card-custom">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">
              {STEPS[currentStep].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          {currentStep < STEPS.length - 1 ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center gap-2 bg-gradient-primary hover:opacity-90"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              className="bg-gradient-accent hover:opacity-90"
              onClick={() => {
                // Handle campaign submission here
                console.log('Campaign completed:', formData);
              }}
            >
              Complete Campaign
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}