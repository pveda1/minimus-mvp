import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface SurveyData {
  sellerName: string;
  productDescription: string;
  productPrice: string;
  brandDescription: string;
  website: string;
  targetDemographic: string;
  storeType: string;
  linkedinUrl: string;
  similarBrands: string;
}

const Survey = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SurveyData>({
    sellerName: "",
    productDescription: "",
    productPrice: "",
    brandDescription: "",
    website: "",
    targetDemographic: "",
    storeType: "",
    linkedinUrl: "",
    similarBrands: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate minimum required fields
    if (!formData.sellerName || !formData.productDescription || !formData.brandDescription || !formData.storeType) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Store data in sessionStorage for the matching process
    sessionStorage.setItem('surveyData', JSON.stringify(formData));
    
    toast.success("Survey submitted! Finding your matches...");
    navigate("/matching");
  };

  const handleChange = (field: keyof SurveyData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-3">Find Your Perfect Store Match</h1>
          <p className="text-lg text-muted-foreground">Tell us about your brand and products to discover retail partners</p>
        </div>

        <div className="bg-card rounded-2xl shadow-medium p-8 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="sellerName" className="text-sm font-medium">
                Your Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="sellerName"
                placeholder="Jane Smith"
                value={formData.sellerName}
                onChange={(e) => handleChange("sellerName", e.target.value)}
                className="bg-background"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productDescription" className="text-sm font-medium">
                Product Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="productDescription"
                placeholder="Organic cold-pressed juice made from locally sourced fruits..."
                value={formData.productDescription}
                onChange={(e) => handleChange("productDescription", e.target.value)}
                className="bg-background min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productPrice" className="text-sm font-medium">
                Product Price Range
              </Label>
              <Input
                id="productPrice"
                placeholder="$8-12 per bottle"
                value={formData.productPrice}
                onChange={(e) => handleChange("productPrice", e.target.value)}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandDescription" className="text-sm font-medium">
                Brand Values & Mission <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="brandDescription"
                placeholder="We believe in sustainable farming practices and supporting local communities..."
                value={formData.brandDescription}
                onChange={(e) => handleChange("brandDescription", e.target.value)}
                className="bg-background min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-sm font-medium">
                Website or Social Media
              </Label>
              <Input
                id="website"
                type="url"
                placeholder="https://yourwebsite.com or @yourbrand"
                value={formData.website}
                onChange={(e) => handleChange("website", e.target.value)}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetDemographic" className="text-sm font-medium">
                Target Customer Demographic
              </Label>
              <Input
                id="targetDemographic"
                placeholder="Health-conscious millennials, urban professionals"
                value={formData.targetDemographic}
                onChange={(e) => handleChange("targetDemographic", e.target.value)}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="storeType" className="text-sm font-medium">
                Preferred Store Type <span className="text-destructive">*</span>
              </Label>
              <Input
                id="storeType"
                placeholder="Boutique grocery, specialty health stores, farmers markets"
                value={formData.storeType}
                onChange={(e) => handleChange("storeType", e.target.value)}
                className="bg-background"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedinUrl" className="text-sm font-medium">
                LinkedIn Profile (for network matching)
              </Label>
              <Input
                id="linkedinUrl"
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
                value={formData.linkedinUrl}
                onChange={(e) => handleChange("linkedinUrl", e.target.value)}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="similarBrands" className="text-sm font-medium">
                Similar Brands
              </Label>
              <Input
                id="similarBrands"
                placeholder="Pressed Juicery, Suja, Blueprint"
                value={formData.similarBrands}
                onChange={(e) => handleChange("similarBrands", e.target.value)}
                className="bg-background"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity h-12 text-base font-semibold mt-8"
            >
              Find My Matches
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Survey;
