import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface SurveyData {
  // Section 1: About You
  yourName: string;
  yourEmail: string;
  businessName: string;
  
  // Section 2: Product Information
  productName: string;
  productCategory: string;
  productSubCategory: string;
  msrp: string;
  packaging: string;
  storageRequirements: string[];
  certifications: string[];
  brandStory: string;
  
  // Section 3: Digital Presence
  productWebsite: string;
  instagramHandle: string;
  otherLinks: string;
  
  // Section 4: Targeting Preferences
  nycNeighborhoods: string[];
  storeTypes: string[];
  storeTraits: string[];
  
  // Section 5: Confirmation
  agreedToTerms: boolean;
}

const Survey = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SurveyData>({
    yourName: "",
    yourEmail: "",
    businessName: "",
    productName: "",
    productCategory: "",
    productSubCategory: "",
    msrp: "",
    packaging: "",
    storageRequirements: [],
    certifications: [],
    brandStory: "",
    productWebsite: "",
    instagramHandle: "",
    otherLinks: "",
    nycNeighborhoods: [],
    storeTypes: [],
    storeTraits: [],
    agreedToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.yourName || !formData.yourEmail || !formData.businessName || 
        !formData.productName || !formData.productCategory || !formData.brandStory ||
        !formData.agreedToTerms) {
      toast.error("Please fill in all required fields and agree to the terms");
      return;
    }

    // Create location string from neighborhoods
    const location = formData.nycNeighborhoods.length > 0 
      ? `New York, NY (${formData.nycNeighborhoods.join(', ')})` 
      : "New York, NY";

    // Store data in sessionStorage for the matching process
    sessionStorage.setItem('surveyData', JSON.stringify({ ...formData, location }));
    
    toast.success("Survey submitted! Finding your matches...");
    navigate("/matching");
  };

  const handleChange = (field: keyof SurveyData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: keyof SurveyData, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      if (checked) {
        return { ...prev, [field]: [...currentArray, value] };
      } else {
        return { ...prev, [field]: currentArray.filter(item => item !== value) };
      }
    });
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-3">Seller Intake Survey</h1>
          <p className="text-lg text-muted-foreground">Help us find your perfect store matches in NYC</p>
        </div>

        <div className="bg-card rounded-2xl shadow-medium p-8 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Section 1: About You */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">Section 1: About You</h2>
              
              <div className="space-y-2">
                <Label htmlFor="yourName">Your Name <span className="text-destructive">*</span></Label>
                <Input
                  id="yourName"
                  value={formData.yourName}
                  onChange={(e) => handleChange("yourName", e.target.value)}
                  className="bg-background"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="yourEmail">Your Email <span className="text-destructive">*</span></Label>
                <Input
                  id="yourEmail"
                  type="email"
                  value={formData.yourEmail}
                  onChange={(e) => handleChange("yourEmail", e.target.value)}
                  className="bg-background"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessName">Your Business / Brand Name <span className="text-destructive">*</span></Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleChange("businessName", e.target.value)}
                  className="bg-background"
                  required
                />
              </div>
            </div>

            {/* Section 2: Product Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">Section 2: Product Information</h2>
              
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name <span className="text-destructive">*</span></Label>
                <Input
                  id="productName"
                  value={formData.productName}
                  onChange={(e) => handleChange("productName", e.target.value)}
                  className="bg-background"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label>Product Category <span className="text-destructive">*</span></Label>
                <RadioGroup value={formData.productCategory} onValueChange={(value) => handleChange("productCategory", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="snacks" id="snacks" />
                    <Label htmlFor="snacks" className="font-normal cursor-pointer">Snacks (chips, bars, chocolate, cookies)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beverages" id="beverages" />
                    <Label htmlFor="beverages" className="font-normal cursor-pointer">Beverages (sparkling, kombucha, coffee, tea, non-alcoholic aperitif)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="condiments" id="condiments" />
                    <Label htmlFor="condiments" className="font-normal cursor-pointer">Condiments / Sauces</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pantry" id="pantry" />
                    <Label htmlFor="pantry" className="font-normal cursor-pointer">Pantry (pasta, grains, specialty ingredients)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="frozen" id="frozen" />
                    <Label htmlFor="frozen" className="font-normal cursor-pointer">Frozen goods</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="category-other" />
                    <Label htmlFor="category-other" className="font-normal cursor-pointer">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productSubCategory">Product Sub-Category or Use Case</Label>
                <Input
                  id="productSubCategory"
                  placeholder="e.g., dark chocolate mini bar, sparkling water with fruit"
                  value={formData.productSubCategory}
                  onChange={(e) => handleChange("productSubCategory", e.target.value)}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="msrp">MSRP (Price to Consumers)</Label>
                <Input
                  id="msrp"
                  placeholder="e.g., $5.50"
                  value={formData.msrp}
                  onChange={(e) => handleChange("msrp", e.target.value)}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="packaging">Packaging / Size</Label>
                <Input
                  id="packaging"
                  placeholder="e.g., 12oz can, 100g bar, 8oz jar"
                  value={formData.packaging}
                  onChange={(e) => handleChange("packaging", e.target.value)}
                  className="bg-background"
                />
              </div>

              <div className="space-y-3">
                <Label>Storage Requirements</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="shelf-stable"
                      checked={formData.storageRequirements.includes("shelf-stable")}
                      onCheckedChange={(checked) => handleCheckboxChange("storageRequirements", "shelf-stable", checked as boolean)}
                    />
                    <Label htmlFor="shelf-stable" className="font-normal cursor-pointer">Shelf-stable (ambient)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="refrigerated"
                      checked={formData.storageRequirements.includes("refrigerated")}
                      onCheckedChange={(checked) => handleCheckboxChange("storageRequirements", "refrigerated", checked as boolean)}
                    />
                    <Label htmlFor="refrigerated" className="font-normal cursor-pointer">Refrigerated</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="frozen"
                      checked={formData.storageRequirements.includes("frozen")}
                      onCheckedChange={(checked) => handleCheckboxChange("storageRequirements", "frozen", checked as boolean)}
                    />
                    <Label htmlFor="frozen" className="font-normal cursor-pointer">Frozen</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Certifications / Attributes</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="vegan"
                      checked={formData.certifications.includes("vegan")}
                      onCheckedChange={(checked) => handleCheckboxChange("certifications", "vegan", checked as boolean)}
                    />
                    <Label htmlFor="vegan" className="font-normal cursor-pointer">Vegan</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="gluten-free"
                      checked={formData.certifications.includes("gluten-free")}
                      onCheckedChange={(checked) => handleCheckboxChange("certifications", "gluten-free", checked as boolean)}
                    />
                    <Label htmlFor="gluten-free" className="font-normal cursor-pointer">Gluten-Free</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="non-gmo"
                      checked={formData.certifications.includes("non-gmo")}
                      onCheckedChange={(checked) => handleCheckboxChange("certifications", "non-gmo", checked as boolean)}
                    />
                    <Label htmlFor="non-gmo" className="font-normal cursor-pointer">Non-GMO</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="kosher"
                      checked={formData.certifications.includes("kosher")}
                      onCheckedChange={(checked) => handleCheckboxChange("certifications", "kosher", checked as boolean)}
                    />
                    <Label htmlFor="kosher" className="font-normal cursor-pointer">Kosher</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="organic"
                      checked={formData.certifications.includes("organic")}
                      onCheckedChange={(checked) => handleCheckboxChange("certifications", "organic", checked as boolean)}
                    />
                    <Label htmlFor="organic" className="font-normal cursor-pointer">Organic</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brandStory">Short Brand Story (1–2 sentences) <span className="text-destructive">*</span></Label>
                <Textarea
                  id="brandStory"
                  placeholder="Tell us about your brand's mission and values..."
                  value={formData.brandStory}
                  onChange={(e) => handleChange("brandStory", e.target.value)}
                  className="bg-background min-h-[100px]"
                  required
                />
              </div>
            </div>

            {/* Section 3: Digital Presence */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">Section 3: Digital Presence</h2>
              
              <div className="space-y-2">
                <Label htmlFor="productWebsite">Product Website</Label>
                <Input
                  id="productWebsite"
                  type="url"
                  placeholder="https://yourwebsite.com"
                  value={formData.productWebsite}
                  onChange={(e) => handleChange("productWebsite", e.target.value)}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagramHandle">Instagram Handle (or other social media)</Label>
                <Input
                  id="instagramHandle"
                  placeholder="@yourbrand"
                  value={formData.instagramHandle}
                  onChange={(e) => handleChange("instagramHandle", e.target.value)}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherLinks">Other Links (press, TikTok, etc.)</Label>
                <Textarea
                  id="otherLinks"
                  placeholder="Add any other relevant links..."
                  value={formData.otherLinks}
                  onChange={(e) => handleChange("otherLinks", e.target.value)}
                  className="bg-background"
                />
              </div>
            </div>

            {/* Section 4: Targeting Preferences */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">Section 4: Targeting Preferences</h2>
              
              <div className="space-y-3">
                <Label>Preferred NYC Neighborhoods</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="williamsburg"
                      checked={formData.nycNeighborhoods.includes("Williamsburg")}
                      onCheckedChange={(checked) => handleCheckboxChange("nycNeighborhoods", "Williamsburg", checked as boolean)}
                    />
                    <Label htmlFor="williamsburg" className="font-normal cursor-pointer">Williamsburg</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="greenpoint"
                      checked={formData.nycNeighborhoods.includes("Greenpoint")}
                      onCheckedChange={(checked) => handleCheckboxChange("nycNeighborhoods", "Greenpoint", checked as boolean)}
                    />
                    <Label htmlFor="greenpoint" className="font-normal cursor-pointer">Greenpoint</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="les"
                      checked={formData.nycNeighborhoods.includes("Lower East Side")}
                      onCheckedChange={(checked) => handleCheckboxChange("nycNeighborhoods", "Lower East Side", checked as boolean)}
                    />
                    <Label htmlFor="les" className="font-normal cursor-pointer">Lower East Side</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="east-village"
                      checked={formData.nycNeighborhoods.includes("East Village")}
                      onCheckedChange={(checked) => handleCheckboxChange("nycNeighborhoods", "East Village", checked as boolean)}
                    />
                    <Label htmlFor="east-village" className="font-normal cursor-pointer">East Village</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="park-slope"
                      checked={formData.nycNeighborhoods.includes("Park Slope")}
                      onCheckedChange={(checked) => handleCheckboxChange("nycNeighborhoods", "Park Slope", checked as boolean)}
                    />
                    <Label htmlFor="park-slope" className="font-normal cursor-pointer">Park Slope</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bushwick"
                      checked={formData.nycNeighborhoods.includes("Bushwick")}
                      onCheckedChange={(checked) => handleCheckboxChange("nycNeighborhoods", "Bushwick", checked as boolean)}
                    />
                    <Label htmlFor="bushwick" className="font-normal cursor-pointer">Bushwick</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>What Kind of Stores Do You Want to Be In?</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cafes"
                      checked={formData.storeTypes.includes("Cafés with grocery shelves")}
                      onCheckedChange={(checked) => handleCheckboxChange("storeTypes", "Cafés with grocery shelves", checked as boolean)}
                    />
                    <Label htmlFor="cafes" className="font-normal cursor-pointer">Cafés with grocery shelves</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="specialty"
                      checked={formData.storeTypes.includes("Specialty grocers")}
                      onCheckedChange={(checked) => handleCheckboxChange("storeTypes", "Specialty grocers", checked as boolean)}
                    />
                    <Label htmlFor="specialty" className="font-normal cursor-pointer">Specialty grocers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ethnic"
                      checked={formData.storeTypes.includes("Italian/ethnic niche shops")}
                      onCheckedChange={(checked) => handleCheckboxChange("storeTypes", "Italian/ethnic niche shops", checked as boolean)}
                    />
                    <Label htmlFor="ethnic" className="font-normal cursor-pointer">Italian/ethnic niche shops</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="health"
                      checked={formData.storeTypes.includes("Health-oriented stores")}
                      onCheckedChange={(checked) => handleCheckboxChange("storeTypes", "Health-oriented stores", checked as boolean)}
                    />
                    <Label htmlFor="health" className="font-normal cursor-pointer">Health-oriented stores</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bread"
                      checked={formData.storeTypes.includes("Bread/pastry-forward shops")}
                      onCheckedChange={(checked) => handleCheckboxChange("storeTypes", "Bread/pastry-forward shops", checked as boolean)}
                    />
                    <Label htmlFor="bread" className="font-normal cursor-pointer">Bread/pastry-forward shops</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Must-Have Store Traits (select all that matter most to you)</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="local"
                      checked={formData.storeTraits.includes("Local/NYC-focused")}
                      onCheckedChange={(checked) => handleCheckboxChange("storeTraits", "Local/NYC-focused", checked as boolean)}
                    />
                    <Label htmlFor="local" className="font-normal cursor-pointer">Local/NYC-focused</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="imported"
                      checked={formData.storeTraits.includes("Imported specialty focus")}
                      onCheckedChange={(checked) => handleCheckboxChange("storeTraits", "Imported specialty focus", checked as boolean)}
                    />
                    <Label htmlFor="imported" className="font-normal cursor-pointer">Imported specialty focus</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rotation"
                      checked={formData.storeTraits.includes("Frequent rotation of new products")}
                      onCheckedChange={(checked) => handleCheckboxChange("storeTraits", "Frequent rotation of new products", checked as boolean)}
                    />
                    <Label htmlFor="rotation" className="font-normal cursor-pointer">Frequent rotation of new products</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="high-end"
                      checked={formData.storeTraits.includes("High-end/curated pricing")}
                      onCheckedChange={(checked) => handleCheckboxChange("storeTraits", "High-end/curated pricing", checked as boolean)}
                    />
                    <Label htmlFor="high-end" className="font-normal cursor-pointer">High-end/curated pricing</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="risk"
                      checked={formData.storeTraits.includes("Willingness to take risks on new brands")}
                      onCheckedChange={(checked) => handleCheckboxChange("storeTraits", "Willingness to take risks on new brands", checked as boolean)}
                    />
                    <Label htmlFor="risk" className="font-normal cursor-pointer">Willingness to take risks on new brands</Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Confirmation */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">Confirmation</h2>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={formData.agreedToTerms}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreedToTerms: checked as boolean }))}
                  required
                />
                <Label htmlFor="terms" className="font-normal cursor-pointer leading-relaxed">
                  I agree to let StoreMatch use this information to generate store recommendations. <span className="text-destructive">*</span>
                </Label>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity h-12 text-base font-semibold mt-8"
              disabled={!formData.agreedToTerms}
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
