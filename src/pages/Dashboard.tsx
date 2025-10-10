import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Users, Package, DollarSign, Award, TrendingUp, ExternalLink, MapPin } from "lucide-react";
import store1 from "@/assets/store-1.png";
import store2 from "@/assets/store-2.png";
import store3 from "@/assets/store-3.png";
import store4 from "@/assets/store-4.png";

interface StoreMatch {
  id: string;
  name: string;
  logo: string;
  matchScore: number;
  storeType: string;
  location: string;
  transparency: {
    newProductFrequency: string;
    customerAlignment: number;
    priceAlignment: number;
    similarProducts: string[];
    certifications: string[];
  };
}

// Mock data for demonstration
const MOCK_MATCHES: StoreMatch[] = [
  {
    id: "1",
    name: "Green Valley Market",
    logo: store1,
    matchScore: 95,
    storeType: "Boutique Grocery",
    location: "Portland, OR",
    transparency: {
      newProductFrequency: "Weekly",
      customerAlignment: 92,
      priceAlignment: 88,
      similarProducts: ["Pressed Juicery", "Suja Organic", "Blueprint"],
      certifications: ["Organic", "Non-GMO", "Local-First"]
    }
  },
  {
    id: "2",
    name: "Wellness & Co",
    logo: store2,
    matchScore: 89,
    storeType: "Specialty Health Store",
    location: "Seattle, WA",
    transparency: {
      newProductFrequency: "Bi-weekly",
      customerAlignment: 87,
      priceAlignment: 91,
      similarProducts: ["Health-Ade", "GT's", "Kevita"],
      certifications: ["Organic", "Vegan", "Sustainable"]
    }
  },
  {
    id: "3",
    name: "Urban Harvest",
    logo: store3,
    matchScore: 85,
    storeType: "Farmers Market Collective",
    location: "San Francisco, CA",
    transparency: {
      newProductFrequency: "Monthly",
      customerAlignment: 90,
      priceAlignment: 82,
      similarProducts: ["Local Juicery", "Farm Fresh", "Pure Green"],
      certifications: ["Organic", "Local", "Fair Trade"]
    }
  },
  {
    id: "4",
    name: "Nourish Market",
    logo: store4,
    matchScore: 82,
    storeType: "Health Food Store",
    location: "Austin, TX",
    transparency: {
      newProductFrequency: "Weekly",
      customerAlignment: 85,
      priceAlignment: 86,
      similarProducts: ["Evolution Fresh", "Naked Juice", "Odwalla"],
      certifications: ["Organic", "Gluten-Free", "Non-GMO"]
    }
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [surveyData, setSurveyData] = useState<any>(null);
  const [matches, setMatches] = useState<StoreMatch[]>([]);

  useEffect(() => {
    const data = sessionStorage.getItem('surveyData');
    if (!data) {
      navigate('/');
      return;
    }
    const parsedData = JSON.parse(data);
    setSurveyData(parsedData);
    
    // Update mock matches with the survey location
    const updatedMatches = MOCK_MATCHES.map(match => ({
      ...match,
      location: parsedData.location || match.location
    }));
    setMatches(updatedMatches);
  }, [navigate]);

  if (!surveyData) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card shadow-soft">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="hover:bg-secondary"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Your Store Matches</h1>
                <p className="text-sm text-muted-foreground">Based on {surveyData.sellerName}'s profile</p>
              </div>
            </div>
            <Badge className="bg-accent text-accent-foreground px-4 py-2 text-sm font-semibold">
              {matches.length} Perfect Matches
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6">
          {matches.map((match, index) => (
            <Card 
              key={match.id} 
              className="p-6 bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 animate-fade-in border-border"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Store Header */}
                <div className="flex-shrink-0 flex items-start gap-4">
                  <img 
                    src={match.logo} 
                    alt={match.name}
                    className="w-20 h-20 rounded-xl object-cover shadow-soft"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-foreground">{match.name}</h3>
                      <Badge variant="secondary" className="font-semibold">
                        {match.matchScore}% Match
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{match.storeType}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {match.location}
                    </p>
                  </div>
                </div>

                {/* Transparency Metrics */}
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Award className="h-4 w-4 text-accent" />
                    Why This Match?
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">New Products</p>
                        <p className="text-sm font-semibold text-foreground">{match.transparency.newProductFrequency}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Users className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Customer Alignment</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-accent transition-all" 
                              style={{ width: `${match.transparency.customerAlignment}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-foreground">{match.transparency.customerAlignment}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <DollarSign className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Price Alignment</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-accent transition-all" 
                              style={{ width: `${match.transparency.priceAlignment}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-foreground">{match.transparency.priceAlignment}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Package className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Similar Products Carried</p>
                        <p className="text-sm font-semibold text-foreground">{match.transparency.similarProducts.length} brands</p>
                      </div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mt-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Store Certifications</p>
                    <div className="flex flex-wrap gap-2">
                      {match.transparency.certifications.map((cert) => (
                        <Badge key={cert} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex-shrink-0 flex flex-col gap-2 lg:w-48">
                  <Button className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Outreach
                  </Button>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="secondary" className="w-full">
                    <Package className="h-4 w-4 mr-2" />
                    Offer Samples
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Actions Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-card shadow-soft border-border">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Custom Outreach Email</h3>
                <p className="text-sm text-muted-foreground">Auto-generated drafts tailored to each store</p>
              </div>
            </div>
            <Button className="w-full" variant="outline">Generate Emails</Button>
          </Card>

          <Card className="p-6 bg-card shadow-soft border-border">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">LinkedIn Connections</h3>
                <p className="text-sm text-muted-foreground">Leverage your existing network</p>
              </div>
            </div>
            <Button className="w-full" variant="outline">View Network</Button>
          </Card>

          <Card className="p-6 bg-card shadow-soft border-border">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">What to Offer</h3>
                <p className="text-sm text-muted-foreground">Recommended approach for each store</p>
              </div>
            </div>
            <Button className="w-full" variant="outline">Get Recommendations</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
