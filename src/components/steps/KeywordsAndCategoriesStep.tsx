import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { CampaignFormData, INFLUENCER_CATEGORIES } from '@/types/campaign';
import { Hash, Tag, Plus, X, Search } from 'lucide-react';

interface KeywordsAndCategoriesStepProps {
  formData: CampaignFormData;
  updateFormData: (updates: Partial<CampaignFormData>) => void;
}

export function KeywordsAndCategoriesStep({ formData, updateFormData }: KeywordsAndCategoriesStepProps) {
  const [newKeyword, setNewKeyword] = useState('');
  const [categorySearch, setCategorySearch] = useState('');

  const addKeyword = () => {
    if (newKeyword.trim() && formData.keywords.length < 10 && !formData.keywords.includes(newKeyword.trim())) {
      updateFormData({ keywords: [...formData.keywords, newKeyword.trim()] });
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    updateFormData({ keywords: formData.keywords.filter(k => k !== keyword) });
  };

  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    const currentCategories = formData.categories;
    if (checked && currentCategories.length < 5) {
      updateFormData({ categories: [...currentCategories, categoryId] });
    } else if (!checked) {
      updateFormData({ categories: currentCategories.filter(id => id !== categoryId) });
    }
  };

  const filteredCategories = INFLUENCER_CATEGORIES.filter(category =>
    category.title.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const selectedCategories = INFLUENCER_CATEGORIES.filter(category =>
    formData.categories.includes(category.id)
  );

  return (
    <div className="space-y-6">
      {/* Keywords Section */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Hash className="w-5 h-5 text-campaign-primary" />
            Campaign Keywords
            <Badge variant="secondary" className="ml-2">
              {formData.keywords.length}/10
            </Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Add up to 10 keywords related to your campaign
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Keyword Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Enter a keyword..."
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
              className="flex-1"
            />
            <Button
              onClick={addKeyword}
              disabled={!newKeyword.trim() || formData.keywords.length >= 10 || formData.keywords.includes(newKeyword.trim())}
              size="icon"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Keywords Display */}
          {formData.keywords.length > 0 && (
            <div>
              <Label className="text-sm font-medium mb-3 block">Selected Keywords</Label>
              <div className="flex flex-wrap gap-2">
                {formData.keywords.map((keyword) => (
                  <Badge
                    key={keyword}
                    variant="outline"
                    className="flex items-center gap-1 px-3 py-1"
                  >
                    {keyword}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 hover:bg-transparent"
                      onClick={() => removeKeyword(keyword)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Categories Selection */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Tag className="w-5 h-5 text-campaign-secondary" />
            Influencer Categories
            <Badge variant="secondary" className="ml-2">
              {formData.categories.length}/5
            </Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Select up to 5 categories that best match your campaign
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Category Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Selected Categories */}
          {selectedCategories.length > 0 && (
            <div>
              <Label className="text-sm font-medium mb-3 block">Selected Categories</Label>
              <div className="flex flex-wrap gap-2 mb-4 p-4 bg-muted/30 rounded-lg">
                {selectedCategories.map((category) => (
                  <Badge
                    key={category.id}
                    className="bg-gradient-primary text-primary-foreground px-3 py-1"
                  >
                    {category.title}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Categories Grid */}
          <div className="max-h-96 overflow-y-auto">
            <Label className="text-sm font-medium mb-3 block">
              Available Categories
            </Label>
            <div className="space-y-2">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={formData.categories.includes(category.id)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category.id, checked as boolean)
                    }
                    disabled={!formData.categories.includes(category.id) && formData.categories.length >= 5}
                  />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-normal cursor-pointer flex-1"
                  >
                    {category.title}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}