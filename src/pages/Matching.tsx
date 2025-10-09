import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STAGES = [
  { label: "Gathering Data", duration: 2000 },
  { label: "Finding Best Matches", duration: 3000 },
  { label: "Crafting Best Outreach", duration: 2000 },
];

const Matching = () => {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    // Check if survey data exists
    const surveyData = sessionStorage.getItem('surveyData');
    if (!surveyData) {
      navigate('/');
      return;
    }

    let timeoutId: NodeJS.Timeout;
    
    if (currentStage < STAGES.length - 1) {
      timeoutId = setTimeout(() => {
        setCurrentStage(prev => prev + 1);
      }, STAGES[currentStage].duration);
    } else {
      // After all stages complete, navigate to dashboard
      timeoutId = setTimeout(() => {
        navigate('/dashboard');
      }, STAGES[currentStage].duration);
    }

    return () => clearTimeout(timeoutId);
  }, [currentStage, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="animate-scale-in">
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 animate-ping"></div>
              <div className="relative w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {STAGES.map((stage, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  index <= currentStage ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4'
                }`}
              >
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      index < currentStage
                        ? 'bg-accent text-accent-foreground'
                        : index === currentStage
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index < currentStage ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-xs font-bold">{index + 1}</span>
                    )}
                  </div>
                  <h3 className={`text-lg font-semibold ${
                    index === currentStage ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {stage.label}
                  </h3>
                </div>
                
                {index === currentStage && (
                  <div className="flex gap-1 justify-center">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse-dot"></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse-dot [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse-dot [animation-delay:0.4s]"></span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-primary transition-all duration-1000 ease-out"
                style={{
                  width: `${((currentStage + 1) / STAGES.length) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              {Math.round(((currentStage + 1) / STAGES.length) * 100)}% complete
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matching;
