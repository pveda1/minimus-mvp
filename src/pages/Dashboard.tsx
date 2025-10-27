import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Users, Package, ExternalLink, MapPin, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Store {
  id: string;
  name: string;
  website: string | null;
  address_text: string;
  niche_estimate: string | null;
  signals: string[] | null;
  evidence_urls: string[] | null;
  cpq_score: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [surveyData, setSurveyData] = useState<any>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = sessionStorage.getItem('surveyData');
    if (!data) {
      navigate('/');
      return;
    }
    const parsedData = JSON.parse(data);
    setSurveyData(parsedData);
    
    fetchStores(parsedData);
  }, [navigate]);

  const fetchStores = async (surveyData: any) => {
    try {
      setLoading(true);
      const { data: storesData, error } = await supabase
        .from('stores')
        .select('*')
        .order('cpq_score', { ascending: false });

      if (error) throw error;

      // Filter stores based on neighborhoods from survey
      const neighborhoods = surveyData.nycNeighborhoods || [];
      const filteredStores = storesData?.filter(store => {
        if (neighborhoods.length === 0) return true;
        
        // Check if store address matches any selected neighborhood
        return neighborhoods.some((neighborhood: string) => 
          store.address_text.toLowerCase().includes(neighborhood.toLowerCase())
        );
      }) || [];

      setStores(filteredStores);
    } catch (error) {
      console.error('Error fetching stores:', error);
      toast({
        title: "Error loading stores",
        description: "There was a problem loading store matches. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!surveyData || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your matches...</p>
        </div>
      </div>
    );
  }

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
              {stores.length} Store Matches
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {stores.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No stores found matching your selected neighborhoods.</p>
            <Button onClick={() => navigate('/survey')}>Update Survey</Button>
          </Card>
        ) : (
          <div className="grid gap-6">
            {stores.map((store, index) => (
              <Card 
                key={store.id} 
                className="p-6 bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 animate-fade-in border-border"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Store Header */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-foreground">{store.name}</h3>
                          <Badge variant="secondary" className="font-semibold flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current" />
                            CPG Score: {(store.cpq_score * 100).toFixed(0)}%
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                          <MapPin className="h-3 w-3" />
                          {store.address_text}
                        </p>
                        {store.website && (
                          <a 
                            href={store.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Visit Website
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Store Details */}
                    {store.niche_estimate && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Store Profile</h4>
                        <p className="text-sm text-muted-foreground">{store.niche_estimate}</p>
                      </div>
                    )}

                    {/* Signals */}
                    {store.signals && store.signals.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Why This Match?</h4>
                        <ul className="space-y-1">
                          {store.signals.map((signal, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-accent mt-1">•</span>
                              <span>{signal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Evidence URLs */}
                    {store.evidence_urls && store.evidence_urls.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">Research Links</h4>
                        <div className="flex flex-wrap gap-2">
                          {store.evidence_urls.slice(0, 3).map((url, idx) => (
                            <a
                              key={idx}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline"
                            >
                              Source {idx + 1}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0 flex flex-col gap-2 lg:w-48">
                    <Button className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Outreach
                    </Button>
                    {store.website && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.open(store.website!, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Website
                      </Button>
                    )}
                    <Button variant="secondary" className="w-full">
                      <Package className="h-4 w-4 mr-2" />
                      Offer Samples
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

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
